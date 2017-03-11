import { Bets } from '.'

let bets

beforeEach(async () => {
  bets = await Bets.create({ proposer: 'test', acceptor: 'test', home: 'test', away: 'test', favorite: 'test', line: 'test', units: 'test', proposerPick: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = bets.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bets.id)
    expect(view.proposer).toBe(bets.proposer)
    expect(view.acceptor).toBe(bets.acceptor)
    expect(view.home).toBe(bets.home)
    expect(view.away).toBe(bets.away)
    expect(view.favorite).toBe(bets.favorite)
    expect(view.line).toBe(bets.line)
    expect(view.units).toBe(bets.units)
    expect(view.proposerPick).toBe(bets.proposerPick)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = bets.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bets.id)
    expect(view.proposer).toBe(bets.proposer)
    expect(view.acceptor).toBe(bets.acceptor)
    expect(view.home).toBe(bets.home)
    expect(view.away).toBe(bets.away)
    expect(view.favorite).toBe(bets.favorite)
    expect(view.line).toBe(bets.line)
    expect(view.units).toBe(bets.units)
    expect(view.proposerPick).toBe(bets.proposerPick)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
