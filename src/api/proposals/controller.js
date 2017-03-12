import _ from 'lodash'
import {
  success,
  notFound
} from '../../services/response/'
import {
  Proposals
} from '.'
import {
  client
} from '../../config'
import url from 'url'
import nodemailer from 'nodemailer'
import stringify from 'node-stringify'
import {
  User
} from '../user/.'

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreply.no.house.edge@gmail.com',
    pass: 'gv028MxiF4df'
  }
})

export const create = (req, res, next) => {

  console.log('Body: %s', stringify(req.body))

  Proposals.create(req.body)
    .then((proposal) => {

      User.findById(req.body.proposedTo).then((proposedTo) => {

        User.findById(req.body.proposedBy).then((proposedBy) => {

          let pick = ''
          let line = ''
          let home = proposal.game.homeTeam
          let away = proposal.game.awayTeam
          let time = proposal.game.time

          if (proposal.proposedByPick === 'Favorite') {
            pick = proposal.game.favorite
            line = proposal.game.line
          } else if (proposal.proposedByPick === 'Underdog') {
            pick = proposal.game.underdog
            line = proposal.game.underdogLine
          } else if (proposal.proposedByPick === 'OverUnder') {
            pick = `O/U`
            line = proposal.game.overUnder
          } else {
            console.log('No proposed pick')
          }

          let path = url.format({
            protocol: client.protocol,
            hostname: client.host,
            port: client.port
          })

          path = path + '/#/proposal/' + proposal.id
          console.log('Path for accepting proposal: %s', path)

          let body = proposedBy.name + ` is looking for action on: ${pick} ${line} (${away} @ ${home} ${time}) ${path}`

          let proposedToEmail = proposedTo.sms()
          if (!proposedToEmail) {
            console.log('No email provided')
          } else {

            console.log(`Sending email to ${proposedToEmail} - ${body}`)

            let mailOptions = {
              from: '"No House Edge" <noreply.no.house.edge@gmail.com>',
              to: proposedToEmail,
              text: body
            }

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error)
              }
              console.log('Message %s sent: %s', info.messageId, info.response)
            })
          }

          // get and return all the proposals after you create another
          Proposals.find(function (err, proposals) {
            if (err) {
              res.send(err)
            }

            res.json(proposals)
          })
        })
      })
    })
    .catch((err) => {
      if (err) {
        res.send(err)
      }
    })
}

export const index = ({
  querymen: {
    query,
    select,
    cursor
  }
}, res, next) => {

  Proposals.find(query, select, cursor)
    .then((proposals) => proposals.map((proposal) => proposal.view()))
    .then(success(res))
    .catch(next)
}

export const show = ({
    params
  }, res, next) =>
  Proposals.findById(params.id)
  .populate('proposedBy', '_id name')
  .populate('proposedTo', '_id name')
  .then(notFound(res))
  .then((proposal) => proposal ? proposal.view() : null)
  .then(success(res))
  .catch(next)

export const update = ({
    bodymen: {
      body
    },
    params
  }, res, next) =>
  Proposals.findById(params.id)
  .then(notFound(res))
  .then((proposal) => proposal ? _.merge(proposal, body).save() : null)
  .then((proposal) => proposal ? proposal.view(true) : null)
  .then(success(res))
  .catch(next)

export const destroy = ({
    params
  }, res, next) =>
  Proposals.findById(params.id)
  .then(notFound(res))
  .then((proposal) => proposal ? proposal.remove() : null)
  .then(success(res, 204))
  .catch(next)
