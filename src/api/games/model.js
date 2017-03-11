import mongoose, { Schema } from 'mongoose'

const gamesSchema = new Schema({
  date: {
    type: Date
  },
  time: {
    type: String
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
  underdog: {
    type: String
  },
  overUnder: {
    type: String
  },
  line: {
    type: String
  },
  underdogLine: {
    type: String
  }
}, {
  timestamps: true
})

gamesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      time: this.time,
      homeTeam: this.homeTeam,
      awayTeam: this.awayTeam,
      line: this.line,
      overUnder: this.overUnder,
      favorite: this.favorite,
      underdog: this.underdog,
      underdogLine: this.underdogLine,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Games', gamesSchema)

export const schema = model.schema
export default model
