import {getStatus} from './wifi'

export default (maxAttempts, interval) =>
  new Promise(function(resolve, reject){
    let attempts = 0

    function retryOrGiveUp(){
      if(attempts >= maxAttempts){
        console.error('Giving up. No wifi available.')
        reject()
      } else {
        setTimeout(check, interval)
      }
    }

    function check(){
      attempts++
      console.log('check', attempts)
      getStatus()
        .then(status => {
          console.log(status)
          if(status === 'COMPLETED'){
            console.log('Wifi connection found')
            resolve()
          } else {
            console.log('No wifi connection on attempt', attempts)
            retryOrGiveUp()
          }
        })
        .catch(err => {
          console.error('Error checking wifi on attempt', attempts, ':', err)
          retryOrGiveUp()
        })
    }
    check()
  })
