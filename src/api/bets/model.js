import mongoose, { Schema } from 'mongoose'

const betsSchema = new Schema({
  proposer: {
    type: Schema.ObjectId, ref: 'User'
  },
  acceptor: {
    type: Schema.ObjectId, ref: 'User'
  },
  homeTeam: {
    type: String
  },
  awayTeam: {
    type: String
  },
  favorite: {
    type: String
  },
  line: {
    type: String
  },
  units: {
    type: String
  },
  proposerPick: {
    type: String
  }
}, {
  timestamps: true
})

betsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      proposer: this.proposer,
      acceptor: this.acceptor,
      homeTeam: this.homeTeam,
      awayTeam: this.awayTeam,
      favorite: this.favorite,
      line: this.line,
      units: this.units,
      proposerPick: this.proposerPick,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Bets', betsSchema)

export const schema = model.schema
export default model
