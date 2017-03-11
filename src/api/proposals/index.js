import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Proposals, { schema } from './model'

const router = new Router()
const { id, game, proposedBy, proposedByPick, proposedTo, units } = schema.tree

/**
 * @api {post} /proposals Create proposal
 * @apiName CreateProposal
 * @apiGroup Proposal
 * @apiParam id Proposal's id.
 * @apiParam proposedBy Proposal's proposedBy.
 * @apiParam homeTeam Proposal's homeTeam.
 * @apiParam awayTeam Proposal's awayTeam.
 * @apiParam favorite Proposal's favorite.
 * @apiParam underDog Proposal's underDog.
 * @apiParam line Proposal's line.
 * @apiParam underDogLine Proposal's underDogLine.
 * @apiParam overUnder Proposal's overUnder.
 * @apiParam time Proposal's time.
 * @apiParam proposedByPick Proposal's proposedByPick.
 * @apiParam proposePeople Proposal's proposePeople.
 * @apiSuccess {Object} proposal Proposal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Proposal not found.
 */
router.post('/',
  body({ game, proposedBy, proposedByPick, proposedTo, units }),
  create)

/**
 * @api {get} /proposals Retrieve proposals
 * @apiName RetrieveProposals
 * @apiGroup Proposal
 * @apiUse listParams
 * @apiSuccess {Object[]} proposals List of proposals.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /proposals/:id Retrieve proposal
 * @apiName RetrieveProposal
 * @apiGroup Proposal
 * @apiSuccess {Object} proposal Proposal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Proposal not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /proposals/:id Update proposal
 * @apiName UpdateProposal
 * @apiGroup Proposal
 * @apiParam id Proposal's id.
 * @apiParam proposedBy Proposal's proposedBy.
 * @apiParam homeTeam Proposal's homeTeam.
 * @apiParam awayTeam Proposal's awayTeam.
 * @apiParam favorite Proposal's favorite.
 * @apiParam underDog Proposal's underDog.
 * @apiParam line Proposal's line.
 * @apiParam underDogLine Proposal's underDogLine.
 * @apiParam overUnder Proposal's overUnder.
 * @apiParam time Proposal's time.
 * @apiParam proposedByPick Proposal's proposedByPick.
 * @apiParam proposePeople Proposal's proposePeople.
 * @apiSuccess {Object} proposal Proposal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Proposal not found.
 */
router.put('/:id',
  body({ id, game, proposedBy, proposedByPick, proposedTo, units }),
  update)

/**
 * @api {delete} /proposals/:id Delete proposal
 * @apiName DeleteProposal
 * @apiGroup Proposal
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Proposal not found.
 */
router.delete('/:id',
  destroy)

export default router
