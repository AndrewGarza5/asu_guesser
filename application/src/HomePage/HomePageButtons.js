import React, { useRef, useEffect, useState } from 'react'
import './styles/home-page.css'
import '../styles/fancy-text.css'
import FancyText from './FancyText'

import './styles/button.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function HomePageButtons({ handleClick }){
    
    const [currentDifficultySelection, setCurrentDifficultySelection] = useState(null)

    let navigate = useNavigate();

    async function startSinglePlayerGame(){

        let gameSettings
        switch (currentDifficultySelection){
          case 'easy':
    
            gameSettings = {
              difficulty: currentDifficultySelection,
              easyPhotos: [],
              mediumPhotos: []
            }
    
    
            if(localStorage.getItem('easyPhotos') != null){
              gameSettings.easyPhotos = localStorage.getItem('easyPhotos').split(',')
              console.log(99)
            }
    
            if(localStorage.getItem('mediumPhotos') != null){
              gameSettings.mediumPhotos = localStorage.getItem('mediumPhotos').split(',')
            }
    
          break;
          case 'medium':
            gameSettings = {
              difficulty: currentDifficultySelection,
              easyPhotos: [],
              mediumPhotos: [],
              hardPhotos: []
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
              difficulty: currentDifficultySelection,
              mediumPhotos: [],
              hardPhotos: [],
              impossiblePhotos: []
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
              difficulty: currentDifficultySelection,
              hardPhotos: [],
              impossiblePhotos: []
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
                localStorage.setItem('currentGameDifficulty', currentDifficultySelection)
                navigate('/game')
            })
            .catch(function (error) {
              alert('Server is struggling - I cannot start a game right now. Try again I guess? This sometimes happens.')
    
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

    function selectDifficulty(difficultySelection){

        if(currentDifficultySelection == null){
          setCurrentDifficultySelection(difficultySelection)
          const innerCircle = document.getElementById(difficultySelection + '-inner-circle')
          innerCircle.style.backgroundColor = 'rgb(255, 235, 204)'
          innerCircle.style.boxShadow = '0 0 10px rgb(255, 211, 140), 0 0 10px rgb(255, 211, 140), 0 0 20px rgb(255, 211, 140), 0 0 50px rgb(255, 211, 140),' + 
            '0 0 50px rgb(255, 211, 140), 0 0 20px rgb(255, 211, 140), 0 0 60px rgb(255, 211, 140), 0 0 70px rgb(255, 211, 140)'
  
          const startButton = document.getElementById('home-screen-game-start-button')
          startButton.style.opacity = '1'
          startButton.style.pointerEvents = 'all'
          // startButton.style.border = '2px solid #ffc729'
  
        }
        else{
          const previousSelectedDifficulty = document.getElementById(currentDifficultySelection + '-inner-circle')
          previousSelectedDifficulty.style.backgroundColor = '#3d0303'
          previousSelectedDifficulty.style.boxShadow = ''
  
          const innerCircle = document.getElementById(difficultySelection + '-inner-circle')
          innerCircle.style.backgroundColor = 'rgb(255, 235, 204)'
          innerCircle.style.boxShadow = '0 0 10px rgb(255, 211, 140), 0 0 10px rgb(255, 211, 140), 0 0 20px rgb(255, 211, 140), 0 0 50px rgb(255, 211, 140),' + 
            '0 0 50px rgb(255, 211, 140), 0 0 20px rgb(255, 211, 140), 0 0 60px rgb(255, 211, 140), 0 0 70px rgb(255, 211, 140)'
            
          setCurrentDifficultySelection(difficultySelection)
        }
        
    }

    return(
        <div className='home-screen-game-selection-wrapper'>
            <div className='home-screen-difficulty-selection-wrapper'>
              <div className='home-screen-difficulty-easy' onClick={() => selectDifficulty('easy')}>
                <div className='home-screen-difficulty-outer-circle'>
                  <div className='home-screen-difficulty-circle-cover'>
                    <div id='easy-inner-circle' className='home-screen-difficulty-inner-circle'>
                    
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
                    <div id='medium-inner-circle' className='home-screen-difficulty-inner-circle'>
                    
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
                    <div id='hard-inner-circle' className='home-screen-difficulty-inner-circle'>
                    
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
                    <div id='impossible-inner-circle' className='home-screen-difficulty-inner-circle'>

                    </div>
                  </div>
                </div>
                <div className='home-screen-difficulty-description-wrapper'>
                  Impossible
                </div>
              </div>
            </div>
            <button id='home-screen-game-start-button' className='home-screen-game-start-button' onClick={startSinglePlayerGame}>
                <FancyText InnerTextID={'single-player-fancy-text-id'}/>
            </button>
          </div>
    )
}

