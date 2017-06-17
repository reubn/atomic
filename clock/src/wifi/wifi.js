import run from './run'

/*
 * Determine whether we have a wifi connection with the `wpa_cli
 * status` command. This function returns a Promise that resolves to a
 * string.  On my Rasberry Pi, the string is 'DISCONNECTED' or
 * 'INACTIVE' when there is no connection and is 'COMPLETED' when
 * there is a connection. There are other possible string values when
 * a connection is being established
 */
export const getStatus = () => run("sudo wpa_cli -iwlan0 status | sed -n -e '/^wpa_state=/{s/wpa_state=//;p;q}'")

/*
 * Determine the ssid of the wifi network we are connected to.
 * This function returns a Promise that resolves to a string.
 * The string will be empty if not connected.
 */
export const getConnectedNetwork = () => run("sudo wpa_cli -iwlan0 status | sed -n -e '/^ssid=/{s/ssid=//;p;q}'")

/*
 * Scan for available wifi networks using `iwlist wlan0 scan`.
 * Returns a Promise that resolves to an array of strings. Each string
 * is the ssid of a wifi network. They are sorted by signal strength from
 * strongest to weakest. On a Raspberry Pi, a scan seems to require root
 * privileges.
 *
 * On a Raspberry Pi 3, this function works when the device is in AP mode.
 * The Intel Edison, however, cannot scan while in AP mode: iwlist fails
 * with an error. iwlist sometimes also fails with an error when the
 * hardware is busy, so this function will try multiple times if you
 * pass a number. If all attempts fail, the promise is resolved to
 * an empty array.
 */
const scanCommand = `iwlist wlan0 scan |\
sed -n -e '
export const /Quality=/,/ESSID =/H
export const /ESSID =/{
  g
export const   s/^.*Quality=\\([0-9]\\+\\).*ESSID ="\\([^"]*\\)".*$/\\1\t\\2/
  p
  s/.*//
  x
}' |\
sort -nr |\
cut -f 2 |\
sed -e '/^$/d;/\\x00/d'`

export const scan = (numAttempts=1) =>
  new Promise(resolve => {
    let attempts = 0

    const tryScan = () => {
      attempts++

      run(scanCommand)
      .then(out => resolve(out.length ? out.split('\n') : []))
      .catch(err => {
        console.error('Scan attempt', attempts, 'failed:', err.message || err)

        if(attempts >= numAttempts){
          console.error('Giving up. No scan results available.')
          resolve([])
          return
        }

        console.error('Will try again in 3 seconds.')
        setTimeout(tryScan, 3000)
      })
    }

    tryScan()
  })

/*
 * Enable an access point that users can connect to to configure the device.
 *
 * This command runs different commands on Raspbery Pi Rasbian and Edison Yocto.
 *
 * It requires that hostapd and udhcpd are installed on the system but not
 * enabled, so that they do not automatically run when the device boots up.
 * It also requires that hostapd and udhcpd have appropriate config files
 * that define the ssid for the wifi network to be created, for example.
 * Also, the udhcpd config file should be set up to work with 10.0.0.1 as
 * the IP address of the device.
 *
 * XXX
 * It would probably be better if the IP address, SSID and password were
 * options to this function rather than being hardcoded in system config
 * files. (Each device ought to be able to add a random number to its
 * SSID, for example, so that when you've got multiple devices they don't
 * all try to create the same network).
 *
 * This function returns a Promise that resolves when the necessary
 * commands have been run.  This does not necessarily mean that the AP
 * will be functional, however. The setup process might take a few
 * seconds to complete before the user will be able to see and connect
 * to the network.
 */
export const startAP = () => run('sudo ifconfig wlan0 down; sudo wpa_cli terminate; sudo ifconfig wlan0 10.0.0.1; sudo systemctl start hostapd; sudo systemctl start udhcpd')

/*
 * Like startAP(), but take the access point down, using platform-dependent
 * commands.
 *
 * Returns a promise that resolves when the commands have been run. At
 * this point, the AP should be in the process of stopping but may not
 * yet be completely down.
 */
export const stopAP = () => run('sudo ifconfig wlan0 down; sudo wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant.conf; sudo systemctl stop udhcpd; sudo systemctl stop hostapd; sudo ifconfig wlan0 0.0.0.0; sudo wpa_cli reconfigure')

/*
 * This function uses wpa_cli to add the specified network ssid and password
 * to the wpa_supplicant.conf file. This assumes that wpa_supplicant is
 * configured to run automatically at boot time and is configured to work
 * with wpa_cli.
 *
 * If the system is not connected to a wifi network, calling this
 * command with a valid ssid and password should cause it to connect.
 */
const closed = 'ID=`sudo wpa_cli -iwlan0 add_network` && sudo wpa_cli -iwlan0 set_network $ID ssid \\"$SSID\\" && sudo wpa_cli -iwlan0 set_network $ID psk \\"$PSK\\" && sudo wpa_cli -iwlan0 enable_network $ID && sudo wpa_cli -iwlan0 save_config'
const open = 'ID=`sudo wpa_cli -iwlan0 add_network` && sudo wpa_cli -iwlan0 set_network $ID ssid \\"$SSID\\" && sudo wpa_cli -iwlan0 set_network $ID key_mgmt NONE && sudo wpa_cli -iwlan0 enable_network $ID && sudo wpa_cli -iwlan0 save_config'

export const defineNetwork = (ssid, password) =>
  run(password ? closed : open, {
    SSID: ssid,
    PSK: password
  })

/*
 * Return a Promise that resolves to an array of known wifi network names
 */
export const getKnownNetworks = () =>
  run("wpa_cli -iwlan0 list_networks | sed -e '1d' | cut -f 2")
  .then(out => (out.length ? out.split('\n') : []))

export const waitForWifi = async (attemptsLeft, interval) => {
  console.log('Attempts Left', attemptsLeft)
  if(!attemptsLeft) return false

  const retry = () => new Promise(resolve => setTimeout(() => resolve(waitForWifi(attemptsLeft - 1, interval)), interval))
  const status = await getStatus().catch(() => 'ERROR')

  console.log(status)
  if(status === 'COMPLETED'){
    console.log('Wifi connection found')
    return true
  }

  if(status === 'ERROR'){
    console.log('Attempt Error, retrying')
    return retry()
  }

  console.log('No wifi connection on attempt')
  return retry()
}
