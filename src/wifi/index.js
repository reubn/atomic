import {waitForWifi, startAP, stopAP} from './wifi'

export default async () => {
  await stopAP().catch(() => false)
  const connected = await waitForWifi(5, 5000)

  if(connected) console.log('We have Wifi!')
  else {
    console.log('We do NOT have Wifi, starting AP')
    startAP()
  }
}
