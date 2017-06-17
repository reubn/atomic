**System**
- Expand filesystem
- Change root password

**Node**
- `curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -`
- `sudo apt-get update`
- `sudo apt install nodejs`

**Yarn**
- `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
- `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
- `sudo apt-get update`
- `sudo apt-get install yarn`

**Directory Structure**
- `mkdir atomic_dev`
- `cd atomic_dev`
- Transfer start script to `atomic_dev`
- `mkdir repo`
- `mkdir app`

**Git Deployment**
- `sudo apt-get install git`
- `cd repo`
- `git init --bare`
- Transfer `post-receive` hook to `atomic_dev/repo/hooks`
- `cd hooks`
- `chmod +x post-receive`

**Wifi and Network**
- `sudo apt-get install hostapd`
- `sudo apt-get install udhcpd`
- `sudo systemctl disable hostapd`
- `sudo systemctl disable udhcpd`
- `sudo systemctl stop dnsmasq`
- `sudo systemctl disable dnsmasq`

- Add `DAEMON_CONF="/etc/hostapd/hostapd.conf"` to `/etc/default/hostapd`
- Transfer `hostapd.conf` to `/etc/hostapd/hostapd.conf`
- Add `DHCPD_ENABLED="no"` to `/etc/default/udhcpd`
- Transfer `udhcpd.conf` to `/etc/udhcpd.conf`
- Add ```ctrl_interface=/var/run/wpa_supplicant
update_config=1``` to `/etc/wpa_supplicant/wpa_supplicant.conf`
