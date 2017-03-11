import mongoose, {
  Schema
} from 'mongoose'
import {
  schema as gameSchema
} from '../games/model'

const proposalsSchema = new Schema({
  game: gameSchema,
  proposedBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  proposedTo: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  proposedByPick: {
    type: String
  },
  units: {
    type: Number
  }
}, {
  timestamps: true
})

proposalsSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      proposedBy: this.proposedBy,
      proposedByPick: this.proposedByPick,
      proposedTo: this.proposedTo,
      units: this.units,
      game: this.game,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

proposalsSchema.statics = {

}

const model = mongoose.model('Proposals', proposalsSchema)

export const schema = model.schema
export default model
