import React, { useRef, useEffect, useState } from 'react'
import './styles/home-page-game-selection-buttons.css'
import './styles/home-page-buttons.css'
import '../styles/fancy-text.css'
import FancyText from './FancyText'

import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function HomePageGameSelectionButtons(props){
    
    const [currentDifficultySelection, setCurrentDifficultySelection] = useState(null)

    let navigate = useNavigate();

    useEffect(() => {
        if(props.isFirstLoad == true){
            document.getElementById('home-screen-game-selection-wrapper').style.transition = 'none'
            
        }
        
        setTimeout(()=>{
            document.getElementById('home-screen-game-selection-wrapper').style.transform = 'translateX(0)'
        }, 50)
    }, [])

    return(
        <div id='home-screen-game-selection-wrapper' className='home-screen-game-selection-wrapper'>
            <button id='home-screen-single-player-start-button' className='home-screen-game-start-button' onClick={props.selectSinglePlayerGame}>
                <FancyText InnerTextID={'single-player-fancy-text-id'}/>
            </button>
            <button id='home-screen-multiplayer-start-button' className='home-screen-game-start-button' onClick={props.selectMultiplayerGame}>
                <FancyText InnerTextID={'multiplayer-fancy-text-id'}/>
            </button>
        </div>
    )
}

