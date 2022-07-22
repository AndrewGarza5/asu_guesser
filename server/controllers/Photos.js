const pool = require('../db/connect')
const csv = require('csv-parser');
const fs = require('fs');
const { promisify } = require('util')

const GetPhoto = async (req, res) => {
    try{
        const photoPath = 'F:/asu_guesser_photos_F/' + req.params['photoName']
        // console.log('photo requested')

        res.status(200).download(photoPath)
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
}

const AddPhotoData = async (req, res) => {
    try{
        const PhotosData = req.body
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

        res.status(200).json({msg: 'success'})
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
}

const Donations = async (req, res) => {
    try{

        let donation = 'Kenna donated $5'
    
        const readFileAsync = promisify(fs.readFile)
        donation = await readFileAsync('./donations.txt')
        donation = donation.toString()
        
        res.status(200).json({msg: donation})

    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
}

module.exports = {
    GetPhoto,
    AddPhotoData,
    Donations
}

