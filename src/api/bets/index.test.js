import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Bets } from '.'

const app = () => express(routes)

let bets

beforeEach(async () => {
  bets = await Bets.create({})
})

test('POST /bets 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ proposer: 'test', acceptor: 'test', home: 'test', away: 'test', favorite: 'test', line: 'test', units: 'test', proposerPick: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.proposer).toEqual('test')
  expect(body.acceptor).toEqual('test')
  expect(body.home).toEqual('test')
  expect(body.away).toEqual('test')
  expect(body.favorite).toEqual('test')
  expect(body.line).toEqual('test')
  expect(body.units).toEqual('test')
  expect(body.proposerPick).toEqual('test')
})

test('GET /bets 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /bets/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${bets.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bets.id)
})

test('GET /bets/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /bets/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${bets.id}`)
    .send({ proposer: 'test', acceptor: 'test', home: 'test', away: 'test', favorite: 'test', line: 'test', units: 'test', proposerPick: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bets.id)
  expect(body.proposer).toEqual('test')
  expect(body.acceptor).toEqual('test')
  expect(body.home).toEqual('test')
  expect(body.away).toEqual('test')
  expect(body.favorite).toEqual('test')
  expect(body.line).toEqual('test')
  expect(body.units).toEqual('test')
  expect(body.proposerPick).toEqual('test')
})

test('PUT /bets/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ proposer: 'test', acceptor: 'test', home: 'test', away: 'test', favorite: 'test', line: 'test', units: 'test', proposerPick: 'test' })
  expect(status).toBe(404)
})

test('DELETE /bets/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${bets.id}`)
  expect(status).toBe(204)
})

test('DELETE /bets/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
