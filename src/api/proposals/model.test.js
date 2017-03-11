import { Proposal } from '.'

let proposal

beforeEach(async () => {
  proposal = await Proposal.create({ id: 'test', proposedBy: 'test', homeTeam: 'test', awayTeam: 'test', favorite: 'test', underDog: 'test', line: 'test', underDogLine: 'test', overUnder: 'test', time: 'test', proposedByPick: 'test', proposePeople: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = proposal.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(proposal.id)
    expect(view.id).toBe(proposal.id)
    expect(view.proposedBy).toBe(proposal.proposedBy)
    expect(view.homeTeam).toBe(proposal.homeTeam)
    expect(view.awayTeam).toBe(proposal.awayTeam)
    expect(view.favorite).toBe(proposal.favorite)
    expect(view.underDog).toBe(proposal.underDog)
    expect(view.line).toBe(proposal.line)
    expect(view.underDogLine).toBe(proposal.underDogLine)
    expect(view.overUnder).toBe(proposal.overUnder)
    expect(view.time).toBe(proposal.time)
    expect(view.proposedByPick).toBe(proposal.proposedByPick)
    expect(view.proposePeople).toBe(proposal.proposePeople)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = proposal.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(proposal.id)
    expect(view.id).toBe(proposal.id)
    expect(view.proposedBy).toBe(proposal.proposedBy)
    expect(view.homeTeam).toBe(proposal.homeTeam)
    expect(view.awayTeam).toBe(proposal.awayTeam)
    expect(view.favorite).toBe(proposal.favorite)
    expect(view.underDog).toBe(proposal.underDog)
    expect(view.line).toBe(proposal.line)
    expect(view.underDogLine).toBe(proposal.underDogLine)
    expect(view.overUnder).toBe(proposal.overUnder)
    expect(view.time).toBe(proposal.time)
    expect(view.proposedByPick).toBe(proposal.proposedByPick)
    expect(view.proposePeople).toBe(proposal.proposePeople)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
