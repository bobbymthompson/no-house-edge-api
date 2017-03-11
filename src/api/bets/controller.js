import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Bets } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Bets.create(body)
    .then((bets) => bets.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Bets.find(query, select, cursor)
    .then((bets) => bets.map((bets) => bets.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Bets.findById(params.id)
    .then(notFound(res))
    .then((bets) => bets ? bets.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Bets.findById(params.id)
    .then(notFound(res))
    .then((bets) => bets ? _.merge(bets, body).save() : null)
    .then((bets) => bets ? bets.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Bets.findById(params.id)
    .then(notFound(res))
    .then((bets) => bets ? bets.remove() : null)
    .then(success(res, 204))
    .catch(next)
