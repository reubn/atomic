import moment from 'moment'

import Alarm from './Alarm'

import DisplayManager from './DisplayManager'
import ClockView from './ClockView'
import AlarmView from './AlarmView'

const manager = new DisplayManager(4)
const clockView = new ClockView()
const alarmView = new AlarmView(clockView)

manager.connect(clockView)

Alarm.clearAll()
.then(() => {
  const {hours: hour, minutes: minute, seconds: second} = moment().add(10, 's').toObject()

  const testAlarm = new Alarm({
    name: 'Test 1',
    scheduleDescriptor: {hour, minute, second}
  })

  return testAlarm.save()
})
.then(Alarm.fromDB)
.then(alarms => alarms.map(alarm => alarm.schedule(() => manager.connect(alarmView))))
.then(scheduledAlarms => console.log('ALL', scheduledAlarms))
