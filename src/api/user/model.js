import crypto from 'crypto'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

const roles = ['user', 'admin']

const userSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    index: true,
    trim: true
  },
  services: {
    facebook: String
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },
  picture: {
    type: String,
    trim: true
  },
  phone: {
    type: String
  },
  provider: {
    type: String
  }
}, {
  timestamps: true
})

userSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex')
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1')
  }

  return email
})

// userSchema.pre('save', function (next) {
  
// })

userSchema.methods = {
  view (full) {
    let view = {}
    let fields = ['id', 'name', 'picture']

    if (full) {
      fields = [...fields, 'email', 'createdAt']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  },
  sms () {
    if (this.provider === 'Verizon') {
      return this.phone + '@vtext.com'
    } else if (this.provider === 'Sprint') {
      return this.phone + '@messaging.sprintpcs.com'
    }
  }
}

userSchema.statics = {
  roles,

  createFromService ({ service, id, email, name, picture }) {
    return this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] }).then((user) => {
      if (user) {
        user.services[service] = id
        user.name = name
        user.picture = picture
        return user.save()
      }
    })
  }
}

userSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] })

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model
