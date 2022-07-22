import React, { useRef, useEffect, useState } from 'react'
import './styles/multiplayer-new-game-join-game.css'
import '../styles/fancy-text.css'
import FancyText from './FancyText'

import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function MultiplayerNewGameJoinGame(props){
    
    const [currentDifficultySelection, setCurrentDifficultySelection] = useState(null)

    let navigate = useNavigate();

    useEffect(() => {
        setTimeout(()=>{
          document.getElementById('multiplayer-new-game-join-game-wrapper').style.transform = 'translateX(0)'
        }, 10)
    }, [])

    function joinGameCodeChange(){
        if ((document.getElementById('multiplayer-join-game-code-input').value).length == 4){
            const multiplayerJoinGameButton = document.getElementById('multiplayer-join-game-button')
            multiplayerJoinGameButton.style.opacity = '1'
            multiplayerJoinGameButton.style.pointerEvents = 'all'
        }
        else{
            const multiplayerJoinGameButton = document.getElementById('multiplayer-join-game-button')
            multiplayerJoinGameButton.style.opacity = ''
            multiplayerJoinGameButton.style.pointerEvents = ''
        }
    }

    return(
        <div id='multiplayer-new-game-join-game-wrapper' className='multiplayer-new-game-join-game-wrapper'>
            <div id='multiplayer-new-game-wrapper' className='multiplayer-new-game-wrapper'>
                <div className='multiplayer-new-game-button' onClick={props.multiplayerNewGameClick}>
                    <FancyText InnerTextID={'new-game'}/>
                </div>
            </div>
            
            <div id='multiplayer-join-game-wrapper' className='multiplayer-join-game-wrapper'>
                <input id='multiplayer-join-game-code-input' className='multiplayer-join-game-code-input' onChange={joinGameCodeChange} type='text' placeholder='Enter 4 letter code' maxLength='4' autoCorrect='off' autoComplete='off' autoCapitalize="off" spellCheck="false"></input>
                <div id='multiplayer-join-game-button' className='multiplayer-join-game-button' onClick={props.multiplayerJoinGameClick}>
                    <FancyText InnerTextID={'join-game'}/>
                </div>
            </div>
            
        </div>
    )
}

