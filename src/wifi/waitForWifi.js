import {getStatus} from './wifi'

const waitForWifi = async (attemptsLeft, interval) => {
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

export default waitForWifi
