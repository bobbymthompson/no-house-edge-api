// import _ from 'lodash'
// import Game from './model'
import stringify from 'node-stringify'
import Xray from 'x-ray'
import fs from 'fs'
var xray = new Xray()

export const index = (req, res) => {
  console.log("Fetching games for '" + req.query.date + "'")

  console.log('Params: ' + stringify(req.params))
  console.log('Body: ' + stringify(req.body))
  console.log('Query: ' + stringify(req.query))

  loadGames(req.query.date, function (games) {

    var cleanupData = (data) => {
      var clean = data.replace(/\t/g, '')
        .replace(/\n/g, '')
        .replace(/«/g, '')
      clean = clean.trim()
      return clean
    }

    for (var i = 0; i < games.length; i++) {
      var game = games[i]

      game.date = req.query.date
      game.title = cleanupData(game.title)
      game.time = cleanupData(game.time).replace(' Game Time', '')
      game.homeTeam = cleanupData(game.homeTeam).substring(4)
      game.awayTeam = cleanupData(game.awayTeam).substring(4)
      game.line1 = cleanupData(game.line1)
      game.line2 = cleanupData(game.line2)

      console.log('Line 1: ' + game.line1)
      console.log('Line 2: ' + game.line2)

      /* Normalize on the line as it could be either line 1 or 2. */
      if (game.line1.startsWith('-')) {
        game.line = game.line1
        game.overUnder = game.line2
        game.favorite = game.homeTeam
        game.underdog = game.awayTeam
        game.underdogLine = game.line.replace('-', '+')
      } else if (game.line2.startsWith('-')) {
        game.line = game.line2
        game.overUnder = game.line1
        game.favorite = game.awayTeam
        game.underdog = game.homeTeam
        game.underdogLine = game.line.replace('-', '+')
      } else {
        if (!game.line1 && !game.line2) {
          game.line = ''
        } else if (game.line1 === game.line2) {
          game.line = 'Pick'
        } else {
          game.line = ''
        }

        game.favorite = game.homeTeam
        game.underdog = game.awayTeam
        game.overUnder = game.line2
      }

      game.proposedByPick = 'Favorite'
      game.units = 1

      console.log("'" + game.time + "'")
      console.log("'" + game.homeTeam + "'")
      console.log("'" + game.awayTeam + "'")
      console.log("'" + game.line + "'")
      console.log("'" + game.overUnder + "'")
    }

    res.json(games)
  })
}


var loadGames = function (date, callback) {

  if (date) {

    var url = 'http://www.vegasinsider.com/college-basketball/matchups/matchups.cfm/date/' + date

    xray(url, '.SLTables1', [{
      title: '.viHeaderNorm',
      time: '.viBodyBorderNorm table tr:nth-child(1) td:nth-child(1)',
      homeTeam: '.viBodyBorderNorm table tr:nth-child(3) td:nth-child(1)',
      awayTeam: '.viBodyBorderNorm table tr:nth-child(4) td:nth-child(1)',

      line1: '.viBodyBorderNorm table tr:nth-child(3) td:nth-child(6)',
      line2: '.viBodyBorderNorm table tr:nth-child(4) td:nth-child(6)'
    }])(function (err, games) {
      callback(games)
    })

  } else {
    fs.readFile('C:\\temp\\test.html', 'utf8', (err, html) => {
      if (err) {
        throw err
      }

      xray(html, '.SLTables1', [{
        title: '.viHeaderNorm',
        time: '.viBodyBorderNorm table tr:nth-child(1) td:nth-child(1)',
        homeTeam: '.viBodyBorderNorm table tr:nth-child(3) td:nth-child(1)',
        awayTeam: '.viBodyBorderNorm table tr:nth-child(4) td:nth-child(1)',

        line1: '.viBodyBorderNorm table tr:nth-child(3) td:nth-child(6)',
        line2: '.viBodyBorderNorm table tr:nth-child(4) td:nth-child(6)'
      }])(function (err, games) {
        callback(games)
      })
    })
  }
}
