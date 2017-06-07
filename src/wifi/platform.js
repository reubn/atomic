export default {
  // A shell command that outputs the string "COMPLETED" if we are
  // connected to a wifi network and outputs something else otherwise
  getStatus: "sudo wpa_cli -iwlan0 status | sed -n -e '/^wpa_state=/{s/wpa_state=//;p;q}'",

  // A shell command that outputs the SSID of the current wifi network
  // or outputs nothing if we are not connected to wifi
  getConnectedNetwork: "sudo wpa_cli -iwlan0 status | sed -n -e '/^ssid=/{s/ssid=//;p;q}'",

  // A shell command that scans for wifi networks and outputs the ssids in
  // order from best signal to worst signal, omitting hidden networks
  scan: `iwlist wlan0 scan |\
sed -n -e '
  /Quality=/,/ESSID:/H
  /ESSID:/{
    g
    s/^.*Quality=\\([0-9]\\+\\).*ESSID:"\\([^"]*\\)".*$/\\1\t\\2/
    p
    s/.*//
    x
  }' |\
sort -nr |\
cut -f 2 |\
sed -e '/^$/d;/\\x00/d'`,

  // A shell command that lists the names of known wifi networks, one
  // to a line.
  getKnownNetworks: "wpa_cli -iwlan0 list_networks | sed -e '1d' | cut -f 2",

  // Start broadcasting an access point.
  // The name of the AP is defined in a config file elsewhere
  // Note that we use different commands on Yocto systems than
  // we do on Raspbian systems
  startAP: 'sudo ifconfig wlan0 down; sudo wpa_cli terminate; sudo ifconfig wlan0 10.0.0.1; sudo systemctl start hostapd; sudo systemctl start udhcpd',

  // Stop broadcasting an AP and attempt to reconnect to local wifi
  stopAP: 'sudo ifconfig wlan0 down; sudo wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant.conf; sudo systemctl stop udhcpd; sudo systemctl stop hostapd; sudo ifconfig wlan0 0.0.0.0; sudo wpa_cli reconfigure',

  // Define a new wifi network. Expects the network name and password
  // in the environment variables SSID and PSK.
  defineNetwork: 'ID=`sudo wpa_cli -iwlan0 add_network` && sudo wpa_cli -iwlan0 set_network $ID ssid \\"$SSID\\" && sudo wpa_cli -iwlan0 set_network $ID psk \\"$PSK\\" && sudo wpa_cli -iwlan0 enable_network $ID && sudo wpa_cli -iwlan0 save_config',

  // Define a new open wifi network. Expects the network name
  // in the environment variable SSID.
  defineOpenNetwork: 'ID=`sudo wpa_cli -iwlan0 add_network` && sudo wpa_cli -iwlan0 set_network $ID ssid \\"$SSID\\" && sudo wpa_cli -iwlan0 set_network $ID key_mgmt NONE && sudo wpa_cli -iwlan0 enable_network $ID && sudo wpa_cli -iwlan0 save_config'
}
