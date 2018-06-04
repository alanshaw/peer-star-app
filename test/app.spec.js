/* eslint-env mocha */
'use strict'

const hat = require('hat')
const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const PeerStar = require('../')
const Repo = require('./utils/repo')
const Rendezvous = require('./utils/rendezvous')

describe('app', function () {
  this.timeout(10000)
  let rendezvous
  let repo
  let app

  before(() => {
    repo = Repo()
  })

  after((done) => repo.teardown(done))

  before(() => {
    rendezvous = Rendezvous()
    return rendezvous.start()
  })

  after(() => rendezvous.stop())

  it('can be created', () => {
    app = PeerStar('peer star test app', {
      ipfs: {
        repo,
        swarm: [ '/ip4/127.0.0.1/tcp/9090/ws/p2p-websocket-star' ]
      }
    })
  })

  it('can be started', () => app.start())

  it('can be stopped', () => app.stop())
})