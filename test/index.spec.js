'use strict'

const { expect } = require('chai')
const Xbit = require('..')

describe('xbit', () => {
  let xbit

  before(() => {
    xbit = new Xbit()
  })

  function testOutputAttributes (output) {
    expect(output).to.be.an('array')

    const random = Math.floor(Math.random() * output.length)
    const toTest = output[random]

    expect(toTest.SIZE).to.be.a('string')
    expect(toTest.NAME).to.be.a('string')
    expect(toTest.MAGNET).to.be.a('string')
  }

  it('should search for torrents', done => {
    xbit.search({
      search: 'star wars',
      limit: 10
    }).then(res => {
      testOutputAttributes(res)
      done()
    }).catch(done)
  })

  it('should not find any torrents', done => {
    xbit.search({
      search: 'asdfasdfasdfasdfasdfasdfasdf'
    }).then(results => {
      expect(results).to.have.lengthOf(0)
      done()
    }).catch(done)
  })

  it('should throw an error when the search param is missing', done => {
    xbit.search({
      seach: 'star wars'
    }).then(done)
      .catch(err => {
        expect(err).to.be.an('Error')
        expect(err.message).to.equal(`The search parameter is required`)

        done()
      })
  })

  it('should throw an error when the search param is not a string', done => {
    xbit.search({
      search: { a: 10 }
    }).then(done)
      .catch(err => {
        expect(err).to.be.an('Error')
        expect(err.message).to.equal(`The search parameter must be a string`)

        done()
      })
  })

  it('should throw an error when the limit param is not a number', done => {
    xbit.search({
      search: 'star wars',
      limit: 'ten'
    }).then(done)
      .catch(err => {
        expect(err).to.be.an('Error')
        expect(err.message).to.equal(`The limit parameter must be a number`)

        done()
      })
  })

  it('should list the recent torrent', done => {
    xbit.recent().then(res => {
      testOutputAttributes(res)
      done()
    }).catch(done)
  })

  it('should throw an error when a request is not valid', done => {
    const temp = xbit.config
    xbit.config = {
      host: 'somefaultyhost.com',
      path: '/somefaultypath.php?'
    }

    xbit.search({
      search: 'star wars'
    }).then(done)
      .catch(err => {
        expect(err).to.be.an('Error')

        xbit.config = temp
        done()
      })
  })
})
