import {randomBytes} from 'crypto'

import Datastore from 'nedb'
import moment from 'moment'

import storeDir from '../store'

import generatePatterns from './generatePatterns'

const store = new Datastore({filename: `${storeDir}/auth`, autoload: true})

export default class Auth {
  constructor(){
    this.patterns = []
    this.generatePatterns()
  }

  generatePatterns(...args){
    this.patterns = generatePatterns(...args)
  }

  checkPatterns(patterns){
    return this.patterns.every(({number}, index) => number === patterns[index])
  }

  async exchangePatterns(patterns){
    const correct = this.checkPatterns(patterns)
    this.generatePatterns()

    if(correct) return this.createToken()

    return false
  }

  async getTokens(){
    return new Promise((resolve, reject) => store.find({}, (err, documents) => (err ? reject(err) : resolve(documents))))
  }

  async createToken(){
    const token = {
      key: await new Promise((resolve, reject) => randomBytes(256, (err, buffer) => (err ? reject(err) : resolve(buffer.toString('hex'))))),
      expires: moment().add(4, 'w').unix()
    }

    return new Promise((resolve, reject) => (store.insert(token, (err, document) => (err ? reject(err) : resolve(document)))))
  }

  async extendToken(key){
    return new Promise((resolve, reject) => store.update({key}, {expires: moment().add(4, 'w').unix()}, (err, document) => (err ? reject(err) : resolve(document))))
  }

  async revokeToken(key){
    return new Promise((resolve, reject) => store.remove({key}, err => (err ? reject(err) : resolve())))
  }

  async revokeAllTokens(){
    return new Promise((resolve, reject) => store.remove({}, err => (err ? reject(err) : resolve())))
  }

  async tokenIsValid(key){
    const token = await new Promise((resolve, reject) => store.findOne({key, expires: {$gte: moment().unix()}}, (err, documents) => (err ? reject(err) : resolve(documents))))

    return !!token
  }

  async validTokenExists(){
    return new Promise((resolve, reject) => store.find({expires: {$gte: moment().unix()}}, (err, documents) => (err || !documents.length ? reject(err || false) : resolve())))
  }

  requestMiddleware(){
    return async (ctx, next) => {
      const apiKey = ctx.query.key

      if(!apiKey) return ctx.throw(401, 'no api key provided')

      const validToken = await this.tokenIsValid(apiKey)

      if(!validToken) return ctx.throw(401, 'api key error')

      return next()
    }
  }
}
