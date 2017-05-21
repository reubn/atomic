import Datastore from 'nedb'
import {scheduleJob} from 'node-schedule'

import storeDir from '../store'

import routine from './routine'

const store = new Datastore({filename: `${storeDir}/alarms`, autoload: true})

class Alarm {
  constructor({_id, name='Alarm', scheduleDescriptor, lastRun}){
    this.id = _id
    this.name = name
    this.scheduleDescriptor = scheduleDescriptor
    this.lastRun = lastRun
  }

  get isInDB(){return !!this._id}
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
    if(!this.isScheduled) this.scheduledJob = scheduleJob(this.scheduleDescriptor, () => handler || routine(this))

    return this
  }

  dehydrate(){
    return {
      _id: this.id,
      name: this.name,
      scheduleDescriptor: this.scheduleDescriptor
    }
  }

  addId(document){
    this.id = document._id
  }
}

Alarm.fromDB = () => new Promise((resolve, reject) => store.find({}, (err, documents) => (err ? reject(err) : resolve(documents.map(document => new Alarm(document))))))
Alarm.clearAll = () => new Promise((resolve, reject) => store.remove({}, {multi: true}, err => (err ? reject(err) : resolve())))


export default Alarm
