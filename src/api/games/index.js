import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index } from './controller'
export Games, { schema } from './model'

const router = new Router()

/**
 * @api {get} /games Retrieve games
 * @apiName RetrieveGames
 * @apiGroup Games
 * @apiUse listParams
 * @apiSuccess {Object[]} games List of games.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

export default router
