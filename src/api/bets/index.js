import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Bets, { schema } from './model'

const router = new Router()
const { proposer, acceptor, home, away, favorite, line, units, proposerPick } = schema.tree

/**
 * @api {post} /bets Create bets
 * @apiName CreateBets
 * @apiGroup Bets
 * @apiParam proposer Bets's proposer.
 * @apiParam acceptor Bets's acceptor.
 * @apiParam home Bets's home.
 * @apiParam away Bets's away.
 * @apiParam favorite Bets's favorite.
 * @apiParam line Bets's line.
 * @apiParam units Bets's units.
 * @apiParam proposerPick Bets's proposerPick.
 * @apiSuccess {Object} bets Bets's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bets not found.
 */
router.post('/',
  body({ proposer, acceptor, home, away, favorite, line, units, proposerPick }),
  create)

/**
 * @api {get} /bets Retrieve bets
 * @apiName RetrieveBets
 * @apiGroup Bets
 * @apiUse listParams
 * @apiSuccess {Object[]} bets List of bets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /bets/:id Retrieve bets
 * @apiName RetrieveBets
 * @apiGroup Bets
 * @apiSuccess {Object} bets Bets's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bets not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /bets/:id Update bets
 * @apiName UpdateBets
 * @apiGroup Bets
 * @apiParam proposer Bets's proposer.
 * @apiParam acceptor Bets's acceptor.
 * @apiParam home Bets's home.
 * @apiParam away Bets's away.
 * @apiParam favorite Bets's favorite.
 * @apiParam line Bets's line.
 * @apiParam units Bets's units.
 * @apiParam proposerPick Bets's proposerPick.
 * @apiSuccess {Object} bets Bets's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bets not found.
 */
router.put('/:id',
  body({ proposer, acceptor, home, away, favorite, line, units, proposerPick }),
  update)

/**
 * @api {delete} /bets/:id Delete bets
 * @apiName DeleteBets
 * @apiGroup Bets
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Bets not found.
 */
router.delete('/:id',
  destroy)

export default router
