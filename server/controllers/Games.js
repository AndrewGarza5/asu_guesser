const gameUtils = require('../lib/game_utils/GamesHelper')
const singlePlayerGameUtils = require('../lib/game_utils/SinglePlayerGamesHelper')
const pool = require('../db/connect')
const crypto = require("crypto");



const CreateSinglePlayerGame = async (req, res) => {

    try{
        const difficulty = req.body['difficulty'].toLowerCase()
        let finalizedGameSettings

        switch (difficulty){
            case 'easy':
                finalizedGameSettings =  await singlePlayerGameUtils.GetRandomPhotosBasedOnGameDifficulty(
                    'easy', 
                    req.body['easyPhotos'], 
                    req.body['mediumPhotos'],
                    null,
                    null
                )
            break;
            case 'medium':
                finalizedGameSettings =  await singlePlayerGameUtils.GetRandomPhotosBasedOnGameDifficulty(
                    'medium', 
                    req.body['easyPhotos'], 
                    req.body['mediumPhotos'],
                    req.body['hardPhotos'],
                    null
                )

                
            break;
      
            case 'hard':
                finalizedGameSettings =  await singlePlayerGameUtils.GetRandomPhotosBasedOnGameDifficulty(
                    'hard', 
                    null, 
                    req.body['mediumPhotos'],
                    req.body['hardPhotos'],
                    req.body['impossiblePhotos']
                )
            break;
      
            case 'impossible':
                finalizedGameSettings =  await singlePlayerGameUtils.GetRandomPhotosBasedOnGameDifficulty(
                    'impossible', 
                    null, 
                    null,
                    req.body['hardPhotos'],
                    req.body['impossiblePhotos']
                )
            break;
          }
        if(finalizedGameSettings == false){
            console.log('error here')
            res.status(500).json( {msg: `There was an error in SinglePlayerGamesHelper.js`} )
            return
        }

        res.status(200).json(finalizedGameSettings)
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
    
}


const GetTodaysLeaderboard = async (req, res) => {
    try{

        const leaderboardDifficulty = req.params['difficulty'].toLowerCase() + 'leaderboard'

        let query
        switch(leaderboardDifficulty){
            case 'easyleaderboard':
                query = await pool.query(
                    "SELECT *, ROW_NUMBER() OVER() AS rank FROM (SELECT playername, totaldistance, distance1, distance2, distance3, distance4, distance5, photo1, photo2, photo3, photo4, photo5 FROM easyleaderboard ORDER BY totaldistance ASC) AS easyordered;"
                    
                )

            break;

            case 'mediumleaderboard':
                query = await pool.query(
                    "SELECT *, ROW_NUMBER() OVER() AS rank FROM (SELECT playername, totaldistance, distance1, distance2, distance3, distance4, distance5, photo1, photo2, photo3, photo4, photo5 FROM mediumleaderboard ORDER BY totaldistance ASC) AS mediumordered;"
      
                )

            break;

            case 'hardleaderboard':
                query = await pool.query(
                    "SELECT *, ROW_NUMBER() OVER() AS rank FROM (SELECT playername, totaldistance, distance1, distance2, distance3, distance4, distance5, photo1, photo2, photo3, photo4, photo5 FROM hardleaderboard ORDER BY totaldistance ASC) AS hardordered;"

                )

            break;

            case 'impossibleleaderboard':
                query = await pool.query(
                    "SELECT *, ROW_NUMBER() OVER() AS rank FROM (SELECT playername, totaldistance, distance1, distance2, distance3, distance4, distance5, photo1, photo2, photo3, photo4, photo5 FROM impossibleleaderboard ORDER BY totaldistance ASC) AS impossibleordered;"

                )

            break;
        }
        for(let i = 0; i < query.rowCount; i++){
            query.rows[i]['totaldistance'] = query.rows[i]['totaldistance'] + 'm'
        }
        res.status(200).json(query.rows)
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
    
}

const GetTodaysLeaderboardWithEntryKey = async (req, res) => {
    try{
        const entryKey = req.params['entryKey']
        const leaderboardDifficulty = req.params['difficulty'].toLowerCase() + 'leaderboard'

        let query
        switch(leaderboardDifficulty){
            case 'easyleaderboard':
                query = await pool.query(
                    "SELECT *, ROW_NUMBER() OVER() AS rank FROM (SELECT playername, totaldistance, photo1, photo2, photo3, photo4, photo5, entrykey FROM easyleaderboard ORDER BY totaldistance ASC) AS easyordered;"
                    
                )

            break;

            case 'mediumleaderboard':
                query = await pool.query(
                    "SELECT *, ROW_NUMBER() OVER() AS rank FROM (SELECT playername, totaldistance, photo1, photo2, photo3, photo4, photo5, entrykey FROM mediumleaderboard ORDER BY totaldistance ASC) AS mediumordered;"
      
                )

            break;

            case 'hardleaderboard':
                query = await pool.query(
                    "SELECT *, ROW_NUMBER() OVER() AS rank FROM (SELECT playername, totaldistance, photo1, photo2, photo3, photo4, photo5, entrykey FROM hardleaderboard ORDER BY totaldistance ASC) AS hardordered;"

                )
            break;

            case 'impossibleleaderboard':
                query = await pool.query(
                    "SELECT *, ROW_NUMBER() OVER() AS rank FROM (SELECT playername, totaldistance, photo1, photo2, photo3, photo4, photo5, entrykey FROM impossibleleaderboard ORDER BY totaldistance ASC) AS impossibleordered;"

                )
            break;
        }
        
        let gameRow = ''
        for(let i = 0; i < query.rowCount; i++){
            query.rows[i]['totaldistance'] = query.rows[i]['totaldistance'] + 'm'
            if(query.rows[i]['entrykey'] == entryKey){
                gameRow = query.rows[i]
                break
            }  
        }

        res.status(200).json({gameRow: gameRow, tableData: query.rows})
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
}

// const PostToLeaderboard = async (req, res) => {
//     try{
//         const difficulty = req.params['difficulty']

//         const playername = req.params['playername']

//         const entryKey = crypto.randomBytes(16).toString("hex");

//         const distance1 = parseInt(req.body['distance1'])
//         const distance2 = parseInt(req.body['distance2'])
//         const distance3 = parseInt(req.body['distance3'])
//         const distance4 = parseInt(req.body['distance4'])
//         const distance5 = parseInt(req.body['distance5'])

//         const totaldistance = distance1 + distance2 + distance3 + distance4 + distance5

//         const photo1 = req.body['photo1']
//         const photo2 = req.body['photo2']
//         const photo3 = req.body['photo3']
//         const photo4 = req.body['photo4']
//         const photo5 = req.body['photo5']

//         let query
//         switch(difficulty){
//             case 'easy':
//                 query = await pool.query(
//                     "INSERT INTO easyleaderboard ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
//                     [playername, distance1, distance2, distance3, distance4, distance5, entryKey, photo1, photo2, photo3, photo4, photo5, totalScore]
//                 )
//             break;

//             case 'medium':
//                 query = await pool.query(
//                     "SELECT playername, distance1, distance2, distance3, distance4, distance5, photo1, photo2, photo3, photo4, photo5 FROM mediumleaderboard"
      
//                 )
//             break;

//             case 'hard':
//                 query = await pool.query(
//                     "SELECT playername, distance1, distance2, distance3, distance4, distance5, photo1, photo2, photo3, photo4, photo5 FROM hardleaderboard"
//                 )
//             break;

//             case 'impossible':
//                 query = await pool.query(
//                     "SELECT playername, distance1, distance2, distance3, distance4, distance5, photo1, photo2, photo3, photo4, photo5 FROM impossibleleaderboard"

//                 )
//             break;
//         }

//         res.status(200).json(query.rows)
//     }
//     catch(error){
//         res.status(500).json({msg: error.toString()})
//     }
    
// }

const SubmitGame = async (req, res) => {
    try{
        const PhotosData = req.body['PhotosData']
        const difficulty = req.body['difficulty']
        // Updating Photos 
        for(let i = 0; i < Object.keys(PhotosData).length; i++){
            const photoname = PhotosData[i]['photoname']
            const score = parseInt(PhotosData[i]['score'])

            const selectQuery = await pool.query(
                "SELECT amountoftimesplayed, totalscore FROM photos WHERE photoname = ($1);",
                [photoname]
            )

            const newAmountOfTimesPlayed = parseInt(selectQuery.rows[0]['amountoftimesplayed']) + 1
            const newTotalScore = parseInt(selectQuery.rows[0]['totalscore']) + score

            const updateQuery = await pool.query(
                "UPDATE photos SET amountoftimesplayed = ($1), totalscore = ($2) WHERE photoname = ($3);",
                [newAmountOfTimesPlayed, newTotalScore, photoname]
            )
        }

        // adding to leadeerboard
        const playername = req.body['playerName']
        const entryKey = crypto.randomBytes(16).toString("hex");
        let totalDistance = +(parseFloat(PhotosData[0]['distance']) + parseFloat(PhotosData[1]['distance']) + parseFloat(PhotosData[2]['distance']) + 
        parseFloat(PhotosData[3]['distance']) + parseFloat(PhotosData[4]['distance'])).toFixed(1)

        totalDistance = totalDistance

        let query
        switch(difficulty){
            case 'easy':
                query = await pool.query(
                    "INSERT INTO easyleaderboard VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
                    [playername, PhotosData[0]['distance'] + 'm', PhotosData[1]['distance'] + 'm', PhotosData[2]['distance'] + 'm', PhotosData[3]['distance'] + 'm', PhotosData[4]['distance'] + 'm', 
                    entryKey, PhotosData[0]['photoname'], PhotosData[1]['photoname'], PhotosData[2]['photoname'], PhotosData[3]['photoname'], PhotosData[4]['photoname'], 
                    totalDistance]
                )
            break;

            case 'medium':
                query = await pool.query(
                    "INSERT INTO mediumleaderboard VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
                    [playername, PhotosData[0]['distance'] + 'm', PhotosData[1]['distance'] + 'm', PhotosData[2]['distance'] + 'm', PhotosData[3]['distance'] + 'm', PhotosData[4]['distance'] + 'm', 
                    entryKey, PhotosData[0]['photoname'], PhotosData[1]['photoname'], PhotosData[2]['photoname'], PhotosData[3]['photoname'], PhotosData[4]['photoname'], 
                    totalDistance]
                )
            break;

            case 'hard':
                query = await pool.query(
                    "INSERT INTO hardleaderboard VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
                    [playername, PhotosData[0]['distance'] + 'm', PhotosData[1]['distance'] + 'm', PhotosData[2]['distance'] + 'm', PhotosData[3]['distance'] + 'm', PhotosData[4]['distance'] + 'm', 
                    entryKey, PhotosData[0]['photoname'], PhotosData[1]['photoname'], PhotosData[2]['photoname'], PhotosData[3]['photoname'], PhotosData[4]['photoname'], 
                    totalDistance]
                )
            break;

            case 'impossible':
                query = await pool.query(
                    "INSERT INTO impossibleleaderboard VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
                    [playername, PhotosData[0]['distance'] + 'm', PhotosData[1]['distance'] + 'm', PhotosData[2]['distance'] + 'm', PhotosData[3]['distance'] + 'm', PhotosData[4]['distance'] + 'm', 
                    entryKey, PhotosData[0]['photoname'], PhotosData[1]['photoname'], PhotosData[2]['photoname'], PhotosData[3]['photoname'], PhotosData[4]['photoname'], 
                    totalDistance]
                )
            break;
        }

        const timecompleted = new Date().toLocaleString("en-US", {timeZone: "America/Phoenix"})
        pool.query(
            "INSERT INTO completedgames VALUES ($1, $2, $3, $4)",
            [playername, req.socket.remoteAddress, timecompleted, difficulty,]
        )

        res.status(200).json({entryKey: entryKey})
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
}


module.exports = {
    CreateSinglePlayerGame,
    GetTodaysLeaderboard,
    //PostToLeaderboard,
    SubmitGame,
    GetTodaysLeaderboardWithEntryKey
}

