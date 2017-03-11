import { Games } from '.'

let games

beforeEach(async () => {
  games = await Games.create({ title: 'test', time: 'test', homeTeam: 'test', awayTeam: 'test', line: 'test', overUnder: 'test', favorite: 'test', underdog: 'test', underdogLinee: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = games.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(games.id)
    expect(view.title).toBe(games.title)
    expect(view.time).toBe(games.time)
    expect(view.homeTeam).toBe(games.homeTeam)
    expect(view.awayTeam).toBe(games.awayTeam)
    expect(view.line).toBe(games.line)
    expect(view.overUnder).toBe(games.overUnder)
    expect(view.favorite).toBe(games.favorite)
    expect(view.underdog).toBe(games.underdog)
    expect(view.underdogLinee).toBe(games.underdogLinee)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = games.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(games.id)
    expect(view.title).toBe(games.title)
    expect(view.time).toBe(games.time)
    expect(view.homeTeam).toBe(games.homeTeam)
    expect(view.awayTeam).toBe(games.awayTeam)
    expect(view.line).toBe(games.line)
    expect(view.overUnder).toBe(games.overUnder)
    expect(view.favorite).toBe(games.favorite)
    expect(view.underdog).toBe(games.underdog)
    expect(view.underdogLinee).toBe(games.underdogLinee)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
