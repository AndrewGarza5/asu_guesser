import React, { useEffect, useRef, useState } from 'react'
import './styles/summary.css'
import './styles/summary-panel.css'
import './styles/summary-stats.css'
import { useNavigate } from "react-router-dom";
import $ from 'jquery'
import FancyText from '../HomePage/FancyText'

import axios from 'axios'
import SummaryStats from './SummaryStats';

export default function Summary(props) {

    const [firstRoundInfo, setFirstRoundInfo] = useState({
        photo: null,
        number: null,
        difficulty: null,
        score: 0,
        average: null
    })

    const [secondRoundInfo, setSecondRoundInfo] = useState({
        photo: null,
        number: null,
        difficulty: null,
        score: 0,
        average: null
    })

    const [thirdRoundInfo, setThirdRoundInfo] = useState({
        photo: null,
        number: null,
        difficulty: null,
        score: 0,
        average: null
    })

    const [fourthRoundInfo, setFourthRoundInfo] = useState({
        photo: null,
        number: null,
        difficulty: null,
        score: 0,
        average: null
    })

    const [fifthRoundInfo, setFifthRoundInfo] = useState({
        photo: null,
        number: null,
        difficulty: null,
        score: 0,
        average: null
    })
    
    const playerName = useRef('')
    const totalScore = useRef(0)
    const viewHeightOnFancyText = useRef(null)
    const currentMatchDifficultySelection = localStorage.getItem('currentGameDifficulty')
    const completedRoundEntryKey = useRef('')


    let navigate = useNavigate();


    useEffect(async () => {
        if (localStorage && localStorage.getItem('singlePlayerGameSettings')){

            let gameSettings = JSON.parse(localStorage.getItem('singlePlayerGameSettings'))
            let photoNumbersAndTheirDifficulty = []

            for(let i = 0; i < 5; i++){
                let roundAverage
                if(gameSettings[i].amountoftimesplayed != 0){
                    roundAverage =  Math.floor((gameSettings[i].totalscore / gameSettings[i].amountoftimesplayed)).toLocaleString()   
                }
                else{
                    roundAverage =  '0'
                }
    
                let photoNumber = ""
                for(let j = 6; j < 12; j++){
                    if(gameSettings[i].photoname[j] >= '0' && gameSettings[i].photoname[j] <= '9'){
                        photoNumber += gameSettings[i].photoname[j]
                    }
                    else{ 
                        photoNumbersAndTheirDifficulty.push({
                            number: photoNumber,
                            difficulty: (gameSettings[i].difficulty).toLowerCase()
                        })
                        break 
                    }
                }
    
                const roundInformation = {
                    photo: 'https://www.asuguesser.com:5001/api/v1/photos/' + gameSettings[i].photoname,
                    number: photoNumber,
                    difficulty: gameSettings[i].difficulty,
                    score: localStorage.getItem('round' + (i+1)),
                    average: roundAverage
                }

                switch (i){
                    case 0:
                        setFirstRoundInfo(roundInformation)
                    break;
                    case 1:
                        setSecondRoundInfo(roundInformation)
                    break;
                    case 2:
                        setThirdRoundInfo(roundInformation)
                    break;
                    case 3:
                        setFourthRoundInfo(roundInformation)
                    break;
                    case 4:
                        setFifthRoundInfo(roundInformation)
                    break;
                    
                }
            }


            totalScore.current = parseInt(localStorage.getItem('round1')) + parseInt(localStorage.getItem('round2'))
             + parseInt(localStorage.getItem('round3')) + parseInt(localStorage.getItem('round4')) + parseInt(localStorage.getItem('round5'))

            for(let i = 0; i < photoNumbersAndTheirDifficulty.length; i++){
                if(localStorage.getItem(photoNumbersAndTheirDifficulty[i].difficulty + 'Photos') != null){
                    let photoArray = (localStorage.getItem(photoNumbersAndTheirDifficulty[i].difficulty + 'Photos')).split(',')
                    
                    if(!photoArray.includes(photoNumbersAndTheirDifficulty[i].number)){
                        photoArray.push(photoNumbersAndTheirDifficulty[i].number)
                    }
                    localStorage.setItem(photoNumbersAndTheirDifficulty[i].difficulty + 'Photos', photoArray)
                }
                else{
                    localStorage.setItem(photoNumbersAndTheirDifficulty[i].difficulty + 'Photos', photoNumbersAndTheirDifficulty[i].number)
                }
            }

            
            try{
                const PhotosData = [
                    {
                        photoname: gameSettings[0].photoname,
                        score: localStorage.getItem('round1'),
                        distance: localStorage.getItem('round1distance')
                    },
                    {
                        photoname: gameSettings[1].photoname,
                        score: localStorage.getItem('round2'),
                        distance: localStorage.getItem('round2distance')
                    },
                    {
                        photoname: gameSettings[2].photoname,
                        score: localStorage.getItem('round3'),
                        distance: localStorage.getItem('round3distance')
                    },
                    {
                        photoname: gameSettings[3].photoname,
                        score: localStorage.getItem('round4'),
                        distance: localStorage.getItem('round4distance')
                    },
                    {
                        photoname: gameSettings[4].photoname,
                        score: localStorage.getItem('round5'),
                        distance: localStorage.getItem('round5distance')
                    }
                ]
                let playerLeaderboardName = ''
                if(localStorage.getItem('leaderboardName') != null){
                    playerLeaderboardName = localStorage.getItem('leaderboardName')
                }

                const matchSubmission = {
                    playerName: playerLeaderboardName,
                    difficulty: currentMatchDifficultySelection,
                    PhotosData: PhotosData
                }
                const responseMatchSubmission = await axios.post('https://www.asuguesser.com:5001/api/v1/games/single-player/submit', matchSubmission)
                completedRoundEntryKey.current = responseMatchSubmission.data['entryKey']
            }
            catch(e){

            }

            // console.log('Easy: ' + localStorage.getItem('easyPhotos'))
            // console.log('Medium: ' + localStorage.getItem('mediumPhotos'))
            // console.log('Hard: ' + localStorage.getItem('hardPhotos'))
            // console.log('Imp: ' + localStorage.getItem('impossiblePhotos'))

            
            
        }
        else{
            console.log('cant find game information for summary page')
            navigate('/')
        }

        window.addEventListener('resize', windowResize)

        const currentHeight = window.innerHeight

        if(currentHeight > 776){
            if(viewHeightOnFancyText.current != 776){
              const summaryPanelScore = document.getElementById('summary-panel-score')
              const summaryPanelScoreChildren = summaryPanelScore.childNodes

            //   const summaryPanelDistance = document.getElementById('summary-panel-distance')
            //   const summaryPanelDistanceChildren = summaryPanelDistance.childNodes
              for(let i = 0; i < 20; i++){
                  summaryPanelScoreChildren[i].style.top = ''
                //   summaryPanelDistanceChildren[i].style.top = ''
              }

              viewHeightOnFancyText.current = 776
            }
          }
          else if(currentHeight < 775 && currentHeight > 600){
            if(viewHeightOnFancyText.current != 576){
                const summaryPanelScore = document.getElementById('summary-panel-score')
                const summaryPanelScoreChildren = summaryPanelScore.childNodes

                // const summaryPanelDistance = document.getElementById('summary-panel-distance')
                // const summaryPanelDistanceChildren = summaryPanelDistance.childNodes
                for(let i = 0; i < 20; i++){
                    summaryPanelScoreChildren[i].style.top = "10px"
                    // summaryPanelDistanceChildren[i].style.top = '8px'
                }

                viewHeightOnFancyText.current = 600
            }
          }
          else if(currentHeight <= 600){
            if(viewHeightOnFancyText.current != 0){
                const summaryPanelScore = document.getElementById('summary-panel-score')
                const summaryPanelScoreChildren = summaryPanelScore.childNodes

                // const summaryPanelDistance = document.getElementById('summary-panel-distance')
                // const summaryPanelDistanceChildren = summaryPanelDistance.childNodes
                for(let i = 0; i < 20; i++){
                    summaryPanelScoreChildren[i].style.top = "15px"
                    // summaryPanelDistanceChildren[i].style.top = ''
                }
                viewHeightOnFancyText.current = 0
            }
          }

        // Unmount
        return async () => {
            let gameSettings = JSON.parse(localStorage.getItem('singlePlayerGameSettings'))

            window.removeEventListener('resize', windowResize)
            localStorage.removeItem('round1')
            localStorage.removeItem('round2')
            localStorage.removeItem('round3')
            localStorage.removeItem('round4')
            localStorage.removeItem('round5')
            

            try{
                const PhotosData = [
                    {
                        photoname: gameSettings[0].photoname,
                        score: localStorage.getItem('round1'),
                        distance: localStorage.getItem('round1distance')
                    },
                    {
                        photoname: gameSettings[1].photoname,
                        score: localStorage.getItem('round2'),
                        distance: localStorage.getItem('round2distance')
                    },
                    {
                        photoname: gameSettings[2].photoname,
                        score: localStorage.getItem('round3'),
                        distance: localStorage.getItem('round3distance')
                    },
                    {
                        photoname: gameSettings[3].photoname,
                        score: localStorage.getItem('round4'),
                        distance: localStorage.getItem('round4distance')
                    },
                    {
                        photoname: gameSettings[4].photoname,
                        score: localStorage.getItem('round5'),
                        distance: localStorage.getItem('round5distance')
                    }
                ]
                
                const matchSubmission = {
                    playerName: playerName.current,
                    difficulty: currentMatchDifficultySelection,
                    PhotosData: PhotosData
                }
                //await axios.post('https://www.asuguesser.com:5001/api/v1/games/single-player/submit', matchSubmission)
            }
            catch(e){

            }
        }
        
        
    }, [])


    function windowResize(){
        const currentHeight = window.innerHeight

        if(currentHeight > 776){
            if(viewHeightOnFancyText.current != 776){
              const summaryPanelScore = document.getElementById('summary-panel-score')
              const summaryPanelScoreChildren = summaryPanelScore.childNodes

            //   const summaryPanelDistance = document.getElementById('summary-panel-distance')
            //   const summaryPanelDistanceChildren = summaryPanelDistance.childNodes
              for(let i = 0; i < 20; i++){
                  summaryPanelScoreChildren[i].style.top = ''
                //   summaryPanelDistanceChildren[i].style.top = ''
              }

              viewHeightOnFancyText.current = 776
            }
          }
          else if(currentHeight < 775 && currentHeight > 600){
            if(viewHeightOnFancyText.current != 576){
                const summaryPanelScore = document.getElementById('summary-panel-score')
                const summaryPanelScoreChildren = summaryPanelScore.childNodes

                // const summaryPanelDistance = document.getElementById('summary-panel-distance')
                // const summaryPanelDistanceChildren = summaryPanelDistance.childNodes
                for(let i = 0; i < 20; i++){
                    summaryPanelScoreChildren[i].style.top = "10px"
                    // summaryPanelDistanceChildren[i].style.top = '8px'
                }

                viewHeightOnFancyText.current = 600
            }
          }
          else if(currentHeight <= 600){
            if(viewHeightOnFancyText.current != 0){
                const summaryPanelScore = document.getElementById('summary-panel-score')
                const summaryPanelScoreChildren = summaryPanelScore.childNodes

                // const summaryPanelDistance = document.getElementById('summary-panel-distance')
                // const summaryPanelDistanceChildren = summaryPanelDistance.childNodes
                for(let i = 0; i < 20; i++){
                    summaryPanelScoreChildren[i].style.top = "15px"
                    // summaryPanelDistanceChildren[i].style.top = ''
                }
                viewHeightOnFancyText.current = 0
            }
          }
    }

    async function homeClick(){
        window.removeEventListener('resize', windowResize)
        localStorage.removeItem('completedRounds')
        localStorage.removeItem('round1')
        localStorage.removeItem('round2')
        localStorage.removeItem('round3')
        localStorage.removeItem('round4')
        localStorage.removeItem('round5')
        
        navigate('/')

    }

    async function replayClick(){
        window.removeEventListener('resize', windowResize)
        localStorage.removeItem('completedRounds')
        localStorage.removeItem('round1')
        localStorage.removeItem('round2')
        localStorage.removeItem('round3')
        localStorage.removeItem('round4')
        localStorage.removeItem('round5')

        //create new round and begin
        let gameSettings
        switch (currentMatchDifficultySelection){
          case 'easy':
    
            gameSettings = {
              difficulty: currentMatchDifficultySelection,
              easyPhotos: '',
              mediumPhotos: ''
            }
    
            if(localStorage.getItem('easyPhotos') != null){
              gameSettings.easyPhotos = localStorage.getItem('easyPhotos').split(',')
            }
            if(localStorage.getItem('mediumPhotos') != null){
              gameSettings.mediumPhotos = localStorage.getItem('mediumPhotos').split(',')
            }
    
          break;
          case 'medium':
            gameSettings = {
              difficulty: currentMatchDifficultySelection,
              easyPhotos: '',
              mediumPhotos: '',
              hardPhotos: ''
            }
    
            if(localStorage.getItem('easyPhotos') != null){
              gameSettings.easyPhotos = localStorage.getItem('easyPhotos').split(',')
            }
            if(localStorage.getItem('mediumPhotos') != null){
              gameSettings.mediumPhotos = localStorage.getItem('mediumPhotos').split(',')
              
            }
            if(localStorage.getItem('hardPhotos') != null){
              gameSettings.hardPhotos = localStorage.getItem('hardPhotos').split(',')          
            }
    
          break;
    
          case 'hard':
            gameSettings = {
              difficulty: currentMatchDifficultySelection,
              mediumPhotos: '',
              hardPhotos: '',
              impossiblePhotos: ''
            }
    
            if(localStorage.getItem('mediumPhotos') != null){
              gameSettings.mediumPhotos = localStorage.getItem('mediumPhotos').split(',')
              
            }
            if(localStorage.getItem('hardPhotos') != null){
              gameSettings.hardPhotos = localStorage.getItem('hardPhotos').split(',')          
            }
            if(localStorage.getItem('impossiblePhotos') != null){
              gameSettings.impossiblePhotos = localStorage.getItem('impossiblePhotos').split(',')          
    
            }
            
          break;
    
          case 'impossible':
            gameSettings = {
              difficulty: currentMatchDifficultySelection,
              hardPhotos: '',
              impossiblePhotos: ''
            }
    
            if(localStorage.getItem('hardPhotos') != null){
              gameSettings.hardPhotos = localStorage.getItem('hardPhotos').split(',')          
    
            }
            if(localStorage.getItem('impossiblePhotos') != null){
              gameSettings.impossiblePhotos = localStorage.getItem('impossiblePhotos').split(',')          
            }
          break;
        }
        await axios.post('https://www.asuguesser.com:5001/api/v1/games/single-player', gameSettings)
            .then(response => {
                localStorage.setItem('singlePlayerGameSettings', JSON.stringify(response.data))
                localStorage.setItem('currentGameDifficulty', currentMatchDifficultySelection)
                window.location.reload()

            })
            .catch(function (error) {
              alert('Server is struggling - I cannot start a game right now. Try again. This sometimes happens.')
    
                // if (error.response) {
                // // Request made and server responded
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                // } else if (error.request) {
                // // The request was made but no response was received
                // console.log(error.request);
                // } else {
                // // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);
                // }
            
            });
    }
    
    return (
        <div className='summary-wrapper'>
            <div className='summary-five-images-wrapper'>
                <div className='summary-image-wrapper'>
                    <img src={firstRoundInfo.photo} className='summary-image' />
                </div>
                <div className='summary-image-wrapper'>
                    <img src={secondRoundInfo.photo} className='summary-image' />
                </div>
                <div className='summary-image-wrapper'>
                    <img src={thirdRoundInfo.photo} className='summary-image' />
                </div>
                <div className='summary-image-wrapper'>
                    <img src={fourthRoundInfo.photo} className='summary-image' />
                </div>
                <div className='summary-image-wrapper'>
                    <img src={fifthRoundInfo.photo} className='summary-image' />
                </div>
            </div>

            <div className='summary-top-half-wrapper'>
                <div className='summary-panels-wrapper'>
                    <div onClick={homeClick} className='summary-panel-home-wrapper'>
                        
                        <div className='summary-panel-home-triangle-outer'>
                            <div className='summary-panel-home-triangle-inner'>

                            </div>
                        </div>
                        <div className='summary-panel-home-square'>
                            <FancyText InnerTextID={'summary-home'}/>
                        </div>
                    </div>

                    <div className='summary-results-panel-score'>
                        <FancyText InnerTextID={'summary-panel-score'}/>
                        
                        <div className='summary-results-panel-score-score'>
                            {(totalScore.current).toLocaleString()}
                        </div>
                        <div className='summary-results-panel-score-mg'>
                            M&G
                        </div>
                    </div>

                    <div onClick={replayClick} className='summary-panel-retry-wrapper'>
                        <div className='summary-panel-retry-square'>
                        <FancyText InnerTextID={'summary-retry'}/>
                        </div>
                        <div className='summary-panel-retry-triangle-outer'>
                            <div className='summary-panel-retry-triangle-inner'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id='summary-bottom-half-wrapper' className='summary-bottom-half-wrapper'>
                <div className='summary-bottom-half-results-wrapper'>
                    <div className='summary-results-wrapper-yours'>
                        <div className='summary-results-individual-round-yours'>
                            <div className='summary-results-individual-round-top-yours'>
                                Photo #{firstRoundInfo.number}
                            </div>
                            <div className='summary-results-individual-round-middle-yours'>
                                {firstRoundInfo.difficulty}
                            </div>
                            
                            <div className='summary-results-individual-round-bottom-yours'>
                                {(firstRoundInfo.score).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                            </div> 
                        </div>
                        <div className='summary-results-individual-round-yours'>
                            <div className='summary-results-individual-round-top-yours'>
                                Photo #{secondRoundInfo.number}
                            </div>
                            <div className='summary-results-individual-round-middle-yours'>
                                {secondRoundInfo.difficulty}
                            </div>
                            <div className='summary-results-individual-round-bottom-yours'>
                                {(secondRoundInfo.score).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                            </div>
                                
                        </div>
                        <div className='summary-results-individual-round-yours'>
                            <div className='summary-results-individual-round-top-yours'>
                                Photo #{thirdRoundInfo.number}
                            </div>
                            <div className='summary-results-individual-round-middle-yours'>
                                {thirdRoundInfo.difficulty}
                            </div>
                            <div className='summary-results-individual-round-bottom-yours'>
                                {(thirdRoundInfo.score).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                            </div>
                                
                        </div>
                        <div className='summary-results-individual-round-yours'>
                            <div className='summary-results-individual-round-top-yours'>
                                Photo #{fourthRoundInfo.number}
                            </div>
                            <div className='summary-results-individual-round-middle-yours'>
                                {fourthRoundInfo.difficulty}
                            </div>
                            <div className='summary-results-individual-round-bottom-yours'>
                                {(fourthRoundInfo.score).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                            </div>
                                
                        </div>
                        <div className='summary-results-individual-round-yours'>
                            <div className='summary-results-individual-round-top-yours'>
                                Photo #{fifthRoundInfo.number}
                            </div>
                            <div className='summary-results-individual-round-middle-yours'>
                                {fifthRoundInfo.difficulty}
                            </div>
                            <div className='summary-results-individual-round-bottom-yours'>
                                {(fifthRoundInfo.score).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                            </div>
                                
                        </div>
                    </div>
                    <div id='summary-results-wrapper-average' className='summary-results-wrapper-average'>
                        <div className='summary-results-top-half-average'>
                            ~ You vs average photo scores ~
                        </div>
                        <div className='summary-results-bottom-half-average'>
                            <div className='summary-results-individual-score-average'>
                                {firstRoundInfo.average} 
                            </div>
                            <div className='summary-results-individual-score-average'>
                                {secondRoundInfo.average}
                            </div>
                            <div className='summary-results-individual-score-average'>
                                {thirdRoundInfo.average}
                            </div>
                            <div className='summary-results-individual-score-average'>
                                {fourthRoundInfo.average} 
                            </div>
                            <div className='summary-results-individual-score-average'>
                                {fifthRoundInfo.average}
                            </div>
                        </div>
                    </div> 
                </div>
                <SummaryStats 
                    difficulty={currentMatchDifficultySelection}
                    completedRoundEntryKey={completedRoundEntryKey}
                />

            </div>
        </div> 
        
    )

}

