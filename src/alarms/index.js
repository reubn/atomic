import moment from 'moment'

import manager from '../manager'
import AlarmAct from '../AlarmAct'


import Alarm from './Alarm'

const init = () => {
  Alarm.clearAll()
  .then(() => {
    const {hours: hour, minutes: minute, seconds: second} = moment().add(5, 's').toObject()
    // const [hour, minute, second] = [7, 30, 0]

    const testAlarm = new Alarm({
      name: 'Test 1',
      scheduleDescriptor: {hour, minute, second}
    })

    return testAlarm.save()
  })
  .then(Alarm.fromDB)
  .then(alarms => alarms.map(alarm => alarm.schedule(() => manager.connect(new AlarmAct(alarm)))))
  .then(scheduledAlarms => console.log('Alarms will trigger at', scheduledAlarms.map(alarm => alarm.scheduleDescriptor)))
}

export default init
export {Alarm}
