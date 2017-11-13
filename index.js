'use strict'

const https = require('https')
const { stringify } = require('querystring')

module.exports = class RarbgApi {
  constructor () {
    this.config = {
      host: 'xbit.pw',
      path: '/api?'
    }
  }

  search (query) {
    return this.validateParams(query).then(sanitizedQuery => this.apiRequest(sanitizedQuery))
  }

  recent () {
    return this.apiRequest()
  }

  validateParams (query) {
    return new Promise((resolve, reject) => {
      const sanitizedQuery = {}

      if (!query.search) {
        return reject(new Error(`The search parameter is required`))
      }

      if (typeof query.search !== 'string') {
        return reject(new Error(`The search parameter must be a string`))
      }

      sanitizedQuery.search = query.search

      if (query.limit) {
        if (isNaN(parseFloat(query.limit))) {
          return reject(new Error(`The limit parameter must be a number`))
        }

        sanitizedQuery.limit = query.limit
      }

      resolve(sanitizedQuery)
    })
  }

  apiRequest (query) {
    return new Promise((resolve, reject) => {
      this.sendRequest(query).then(({ dht_results: results }) => { // eslint-disable-line camelcase
        // It always returns an extra empty entry at the end
        // Do a desk pop and get rid of it
        if (!results[results.length - 1].ID) {
          results.pop()
        }

        resolve(results)
      }).catch(err => reject(err))
    })
  }

  sendRequest (query) {
    return new Promise((resolve, reject) => {
      const req = {
        host: this.config.host,
        path: this.config.path + stringify(query)
      }

      https.get(req, res => {
        let body = ''

        res.setEncoding('utf8')
        res.on('data', d => {
          body += d
        })
        res.on('end', () => resolve(JSON.parse(body)))
      }).on('error', err => reject(err))
    })
  }
}
