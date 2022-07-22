const gameUtils = require('../lib/game_utils/GamesHelper')
const pool = require('../db/connect')

const GetAllGames = async (req, res) => {
    try{
        const query = await pool.query(
            "SELECT * FROM multiplayergames"
        )

        res.status(200).json(query.rows)
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
    
}

const GetGame = async (req, res) => {
    try{
        const gameId = (req.params['gameId']).toUpperCase()

        const query = await pool.query(
            "SELECT * FROM multiplayergames WHERE gameId = ($1)",
            [gameId]
        )

        if(query.rowCount == 0){
            res.status(404).json({msg: `No session with id: ${gameId}`})
            return
        }

        res.status(200).json(query.rows)
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
}

// Requires 1 body element
// amountOfPlayers
const CreateGame = async (req, res) => {

    try{
        const difficulty = (req.body['difficulty']).toLowerCase()

        let isValidDifficulty = false
        if(difficulty != 'easy' && difficulty != 'medium' && difficulty != 'hard' && difficulty != 'impossible'){
            res.status(400).json({msg: 'invalid difficulty'})
            return
        }

        const amountOfPlayers = '1'
        var currentDate = new Date()
        const gameCreationDate = currentDate.toISOString()
        const gameId = await gameUtils.CreateNewGameID()

        await pool.query(
            "INSERT INTO multiplayergames VALUES($1, $2, $3, $4)",
            [gameId, amountOfPlayers, gameCreationDate, difficulty]
        )
        res.status(200).json({msg: 'success'})
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
    
}

const UpdateAmountOfPlayers = async (req, res) => {
    try{
        const gameId = req.params['gameId']
        const changeInPlayers = req.body['changeInPlayers']
        let numberToAdd = 0

        if(changeInPlayers == 1){
            numberToAdd = 1
        }
        else if(changeInPlayers == -1){
            numberToAdd = -1
        }
        else{
            res.status(400).json({msg: 'Input must be a 1 or -1 int value to specify the change, your request did not contain either'})
            return
        }

        const query = await pool.query(
            "SELECT amountofplayers FROM multiplayergames WHERE gameid = ($1)",
            [gameId]
        )
        if(query.rowCount == 0){
            res.status(400).json({msg: `No session with id: ${gameId}`})
            return
        }
        const currentAmountOfPlayers = query.rows[0]['amountofplayers']

        const newAmountOfPlayers = currentAmountOfPlayers + numberToAdd

        const updateQuery = await pool.query(
            "UPDATE multiplayergames SET amountofplayers = ($1) WHERE gameid = ($2)",
            [newAmountOfPlayers, gameId]
        )

        if(updateQuery.rowCount == 0){
            res.status(500).json({msg: `There was an error when making the update to the database`})
            return
        }
        
        res.status(200).json( {msg:`Success. New amount of players is ${newAmountOfPlayers}`} )
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
}

const DeleteGameAndPlayers = async (req, res) => {
    try{
        const gameId = (req.params['gameId']).toUpperCase()

        const query = await pool.query(
            "DELETE FROM multiplayergames WHERE gameId = ($1)",
            [gameId]
        )

        if(query.rowCount == 0){
            res.status(404).json({msg: `No session with id: ${gameId}`})
            return
        }
        
        // ************************* FINISH THIS IN UTILS
        // if(await gameUtils.DeleteAllPlayersInGameSession(gameId) == false){
        //     res.status(500).json({msg: 'There was an issue with removing players from game session, the deletion of this session has been aborted'})
        //     return
        // }

        res.status(200).json({msg: 'success'})
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
}

module.exports = {
    GetAllGames,
    GetGame,
    CreateGame,
    UpdateAmountOfPlayers,
    DeleteGameAndPlayers
}
