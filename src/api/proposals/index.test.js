import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Proposal } from '.'

const app = () => express(routes)

let proposal

beforeEach(async () => {
  proposal = await Proposal.create({})
})

test('POST /proposals 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ id: 'test', proposedBy: 'test', homeTeam: 'test', awayTeam: 'test', favorite: 'test', underDog: 'test', line: 'test', underDogLine: 'test', overUnder: 'test', time: 'test', proposedByPick: 'test', proposePeople: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual('test')
  expect(body.proposedBy).toEqual('test')
  expect(body.homeTeam).toEqual('test')
  expect(body.awayTeam).toEqual('test')
  expect(body.favorite).toEqual('test')
  expect(body.underDog).toEqual('test')
  expect(body.line).toEqual('test')
  expect(body.underDogLine).toEqual('test')
  expect(body.overUnder).toEqual('test')
  expect(body.time).toEqual('test')
  expect(body.proposedByPick).toEqual('test')
  expect(body.proposePeople).toEqual('test')
})

test('GET /proposals 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /proposals/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${proposal.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(proposal.id)
})

test('GET /proposals/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /proposals/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${proposal.id}`)
    .send({ id: 'test', proposedBy: 'test', homeTeam: 'test', awayTeam: 'test', favorite: 'test', underDog: 'test', line: 'test', underDogLine: 'test', overUnder: 'test', time: 'test', proposedByPick: 'test', proposePeople: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(proposal.id)
  expect(body.id).toEqual('test')
  expect(body.proposedBy).toEqual('test')
  expect(body.homeTeam).toEqual('test')
  expect(body.awayTeam).toEqual('test')
  expect(body.favorite).toEqual('test')
  expect(body.underDog).toEqual('test')
  expect(body.line).toEqual('test')
  expect(body.underDogLine).toEqual('test')
  expect(body.overUnder).toEqual('test')
  expect(body.time).toEqual('test')
  expect(body.proposedByPick).toEqual('test')
  expect(body.proposePeople).toEqual('test')
})

test('PUT /proposals/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ id: 'test', proposedBy: 'test', homeTeam: 'test', awayTeam: 'test', favorite: 'test', underDog: 'test', line: 'test', underDogLine: 'test', overUnder: 'test', time: 'test', proposedByPick: 'test', proposePeople: 'test' })
  expect(status).toBe(404)
})

test('DELETE /proposals/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${proposal.id}`)
  expect(status).toBe(204)
})

test('DELETE /proposals/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
