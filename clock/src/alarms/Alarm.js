import Datastore from 'nedb'
import moment from 'moment'
import {scheduleJob} from 'node-schedule'

import storeDir from '../store'

const store = new Datastore({filename: `${storeDir}/alarms`, autoload: true})

class Alarm {
  constructor({_id, name='Alarm', scheduleDescriptor, summary=false, lastRun=null}){
    this.id = _id
    this.name = name
    this.scheduleDescriptor = scheduleDescriptor
    this.summary = summary
    this.lastRun = lastRun
  }

  get isInDB(){return !!this.id}
  get isScheduled(){return !!this.scheduleJob}

  insert(){
    return new Promise(
      (resolve, reject) => (
        this.isInDB
        ? resolve(this)
        : store.insert(this.dehydrate(), (err, document) => (err ? reject(err) : resolve(this.addId(document))))
      )
    )
  }

  save(){
    return new Promise(
      (resolve, reject) => (
        this.isInDB
        ? store.update({_id: this.id}, this.dehydrate(), (err, document) => (err ? reject(err) : resolve(this.addId(document))))
        : resolve(this.insert())
      )
    )
  }

  schedule(handler){
    if(!this.isScheduled){
      this.scheduledJob = scheduleJob(this.scheduleDescriptor, () => {
        // Update lastRun
        this.lastRun = moment()
        this.save()

        // Run handler
        handler(this)
      })

      return this
    }
  }

  dehydrate(){
    return {
      _id: this.id,
      name: this.name,
      scheduleDescriptor: this.scheduleDescriptor,
      summary: this.summary,
      lastRun: this.lastRun ? this.lastRun.unix() : null
    }
  }

  addId(document){
    this.id = document._id
  }
}

Alarm.fromDB = () => new Promise((resolve, reject) => store.find({}, (err, documents) => (err ? reject(err) : resolve(documents.map(document => new Alarm(document))))))
Alarm.clearAll = () => new Promise((resolve, reject) => store.remove({}, {multi: true}, err => (err ? reject(err) : resolve())))


export default Alarm
