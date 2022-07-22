import React, { useEffect, useState } from 'react'
import './styles/leaderboards.css'
import './HomePage/styles/home-page.css'
import LeaderboardTables from './LeaderboardTables';
import axios from 'axios'

import { useNavigate } from "react-router-dom";

export default function About(){

    const [photoToGuess, setPhotoToGuess] = useState(null)
    const [photoNumber, setPhotoNumber] = useState(null)
    const [leaderboardTableState, setLeaderboardTableState] = useState(null)
    const [previousSelectedDifficulty, setPreviouslySelectedDifficulty] = useState(null)
    const [currentlySelectedDifficulty, setCurrentlySelectedDifficulty] = useState('impossible')

    let navigate = useNavigate();


    useEffect(async () => {

        const goodPhotos = [17, 19, 23, 44, 48, 54, 65, 71, 91, 98, 101, 102, 116, 117, 427, 570, 610, 734, 608, 601, 216]
        const randomNumber = Math.floor(Math.random() * 21)

        setPhotoNumber(goodPhotos[randomNumber])
        setPhotoToGuess('https://asuguesser.com:5001/api/v1/photos/tempe_' + goodPhotos[randomNumber] + '.jpg')

        const impossibleTableData = await axios.get('https://asuguesser.com:5001/api/v1/games/single-player/leaderboard/impossible')
        setLeaderboardTableState(<LeaderboardTables tableData={impossibleTableData.data} />)
        const impossibleSelector = document.getElementById('leaderboards-impossible-inner-circle')
        impossibleSelector.style.backgroundColor = 'rgb(255, 235, 204)'
        impossibleSelector.style.boxShadow = '0 0 10px rgb(255, 211, 140), 0 0 10px rgb(255, 211, 140), 0 0 20px rgb(255, 211, 140), 0 0 50px rgb(255, 211, 140),' + 
          '0 0 50px rgb(255, 211, 140), 0 0 20px rgb(255, 211, 140), 0 0 60px rgb(255, 211, 140), 0 0 70px rgb(255, 211, 140)'
      }, [])

      async function selectDifficulty(difficultySelection){
        const previousSelectedDifficulty = document.getElementById('leaderboards-' + currentlySelectedDifficulty + '-inner-circle')
        previousSelectedDifficulty.style.backgroundColor = '#3d0303'
        previousSelectedDifficulty.style.boxShadow = ''

        const innerCircle = document.getElementById('leaderboards-' + difficultySelection + '-inner-circle')
        innerCircle.style.backgroundColor = 'rgb(255, 235, 204)'
        innerCircle.style.boxShadow = '0 0 10px rgb(255, 211, 140), 0 0 10px rgb(255, 211, 140), 0 0 20px rgb(255, 211, 140), 0 0 50px rgb(255, 211, 140),' + 
          '0 0 50px rgb(255, 211, 140), 0 0 20px rgb(255, 211, 140), 0 0 60px rgb(255, 211, 140), 0 0 70px rgb(255, 211, 140)'
          
        setCurrentlySelectedDifficulty(difficultySelection)

        const tableData = await axios.get('https://asuguesser.com:5001/api/v1/games/single-player/leaderboard/' + difficultySelection)
        setLeaderboardTableState(null)
        setLeaderboardTableState(<LeaderboardTables tableData={tableData.data} />)
          
      }

    return(
        <div className='leaderboards-actual-wrapper'>
            <div className='leaderboards-back-button' onClick={() => {
                    navigate('/')
                }}>
                Back!
            </div>
            <div className='leaderboards-photo-details'>
                Photo #{photoNumber}
            </div>
                    
            <div className='leaderboards-photo-to-guess-wrapper'>
                <img src={photoToGuess} className='leaderboards-photo-to-guess'/>
            </div>
            
            <div className='leaderboards-wrapper'>
                <div className='leaderboards-difficulty-selection-wrapper'>
                    <div className='home-screen-difficulty-easy' onClick={() => selectDifficulty('easy')}>
                        <div className='home-screen-difficulty-outer-circle'>
                            <div className='home-screen-difficulty-circle-cover'>
                                <div id='leaderboards-easy-inner-circle' className='home-screen-difficulty-inner-circle'>
                                
                                </div>
                            </div>
                        </div>
                        <div className='home-screen-difficulty-description-wrapper'>
                            Easy
                        </div>
                    </div>
                    <div className='home-screen-difficulty-medium' onClick={() => selectDifficulty('medium')}>
                        <div className='home-screen-difficulty-outer-circle'>
                            <div className='home-screen-difficulty-circle-cover'>
                                <div id='leaderboards-medium-inner-circle' className='home-screen-difficulty-inner-circle'>
                            
                                </div>
                            </div>
                        </div>
                        <div className='home-screen-difficulty-description-wrapper'>
                            Medium
                        </div>
                    </div>
                    <div className='home-screen-difficulty-hard' onClick={() => selectDifficulty('hard')}>
                        <div className='home-screen-difficulty-outer-circle'>
                            <div className='home-screen-difficulty-circle-cover'>
                                <div id='leaderboards-hard-inner-circle' className='home-screen-difficulty-inner-circle'>
                                
                                </div>
                            </div>
                        </div>
                        <div className='home-screen-difficulty-description-wrapper'>
                            Hard
                        </div>
                    </div>
                    <div className='home-screen-difficulty-impossible' onClick={() => selectDifficulty('impossible')}>
                        <div className='home-screen-difficulty-outer-circle'>
                            <div className='home-screen-difficulty-circle-cover'>
                                <div id='leaderboards-impossible-inner-circle' className='home-screen-difficulty-inner-circle'>

                                </div>
                            </div>
                        </div>
                        <div className='home-screen-difficulty-description-wrapper'>
                            Impossible
                        </div>
                    </div>
                </div>
                
                <div className='leaderboards-table-wrapper'>
                   {leaderboardTableState} 
                </div>
                
            </div>
        </div>
    )
}

