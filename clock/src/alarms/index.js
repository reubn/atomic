import moment from 'moment'

import manager from '../manager'
import auth, {authComplete} from '../auth'
import AlarmAct from '../acts/Alarm'

import Alarm from './Alarm'

const init = async () => {
  await Alarm.clearAll()

  const {hours: hour, minutes: minute, seconds: second} = moment().add(2, 's').toObject()
  // const [hour, minute, second] = [7, 30, 0]

  const testAlarm = new Alarm({
    name: 'Test 1',
    scheduleDescriptor: {hour, minute, second}
  })
  await testAlarm.save()

  const alarms = await Alarm.fromDB()
  const scheduledAlarms = alarms.map(alarm => alarm.schedule(() => manager.connect(new AlarmAct(alarm))))

  console.log('Alarms will trigger at', scheduledAlarms.map(alarm => alarm.scheduleDescriptor))
}

// If auth was blocking, init alarms once complete
auth.once(authComplete, init())

export default init
export {Alarm}
