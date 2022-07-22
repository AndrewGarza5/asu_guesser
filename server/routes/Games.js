const express = require('express')
const router = express.Router()

const {
    CreateSinglePlayerGame,
    GetTodaysLeaderboard,
    SubmitGame,
    GetTodaysLeaderboardWithEntryKey
} = require('../controllers/Games.js')


router.route('/single-player').post(CreateSinglePlayerGame)
router.route('/single-player/submit').post(SubmitGame)
router.route('/single-player/leaderboard/:difficulty').get(GetTodaysLeaderboard)//.post(PostToLeaderboard)
router.route('/single-player/leaderboard/:difficulty/:entryKey').get(GetTodaysLeaderboardWithEntryKey)//.post(PostToLeaderboard)


module.exports = router