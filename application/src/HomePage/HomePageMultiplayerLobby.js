import React, { useRef, useEffect, useState } from 'react'
import './styles/home-page-multiplayer-lobby.css'
import '../styles/fancy-text.css'
import './styles/home-page-buttons.css'
import FancyText from './FancyText'

import axios from 'axios'
import { useNavigate } from "react-router-dom";

const { io } = require("socket.io-client")


export default function HomePageMultiplayerLobby({ handleClick }){
    
    const [currentDifficultySelection, setCurrentDifficultySelection] = useState(null)

    let navigate = useNavigate();

    const socket = io('http://localhost:5000')


    useEffect(() => {
        setTimeout(()=>{
          document.getElementById('home-page-multiplayer-lobby-wrapper').style.transform = 'translateY(0)'
        }, 10)
    }, [])

    function easyClick(){
        console.log(8923)
        socket.emit('randomTest')
    }

    function mediumClick(){
        console.log(23)
    }

    
    
    return(
        <div id='home-page-multiplayer-lobby-wrapper' className='home-page-multiplayer-lobby-wrapper'>
            <div className='home-page-multiplayer-lobby-players-wrapper'>
                <div className='home-page-multiplayer-lobby-player-tag'>
                    Andrew
                </div>
                <div className='home-page-multiplayer-lobby-player-tag'>
                    John
                </div>
                <div className='home-page-multiplayer-lobby-player-tag'>
                    Xavi
                </div>
            </div>
            

            <div className='home-page-multiplayer-lobby-settings-wrapper'>
                <select name='difficulty' className='home-page-multiplayer-lobby-settings-difficulty'  onClick={easyClick} onSelect={mediumClick}>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='medium'>Hard</option>
                    <option value='medium'>Impossible</option>
                </select>
            </div>
            <div className='home-screen-game-start-button'>
                <FancyText InnerTextID={'start-game'}/>
            </div>
        </div>
    )
}

