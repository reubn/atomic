import {Alarm} from '../../../../alarms'

export default async ({response}) => {
  response.body = await Alarm.fromDB()
}
