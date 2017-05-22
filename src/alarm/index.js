import moment from 'moment'

import Alarm from './Alarm'

const init = () => {
  Alarm.clearAll()
  .then(() => {
    const {hours: hour, minutes: minute, seconds: second} = moment().add(5, 's').toObject()
    // const [hour, minute, second] = [8, 0, 0]

    const testAlarm = new Alarm({
      name: 'Test 1',
      scheduleDescriptor: {hour, minute, second}
    })

    return testAlarm.save()
  })
  .then(Alarm.fromDB)
  .then(alarms => alarms.map(alarm => alarm.schedule()))
  .then(scheduledAlarms => console.log('Alarms will trigger at', scheduledAlarms.map(alarm => alarm.scheduleDescriptor)))
}

export default init
export {Alarm}
