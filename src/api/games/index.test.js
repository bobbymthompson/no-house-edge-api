import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Games } from '.'

const app = () => express(routes)

let games

beforeEach(async () => {
  games = await Games.create({})
})

test('GET /games 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /games/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${games.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(games.id)
})

test('GET /games/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})
