import React, { useEffect } from 'react'
import '../styles/fancy-text.css'
import $ from 'jquery'

export default function FancyText({InnerTextID}){
    
    useEffect(() => {
        var FancyTextClass = ''
        switch(InnerTextID){
            case 'asu-guesser-fancy-text-id': 
                FancyTextClass = 'asu-guesser'
            break;

            case 'asu-guesser-fancy-text-id-675': 
                FancyTextClass = 'asu-guesser-675'
            break;

            case 'asu-guesser-fancy-text-id-375': 
                FancyTextClass = 'asu-guesser-375'
            break;

            case 'single-player-fancy-text-id': 
                FancyTextClass = 'single-player' 
            break;

            case 'multiplayer-fancy-text-id': 
                FancyTextClass = 'multiplayer' 
            break;

            // case 'single-player-menu-fancy-text-id': 
            //     FancyTextClass = 'single-player-menu'
            //     document.getElementById(InnerTextID).className = 'single-player-menu-stage'
            // break;

            case 'results-panel-score': 
               FancyTextClass = 'score'
            break;

            case 'results-panel-distance': 
                FancyTextClass = 'distance'
            break;

            case 'results-panel-round': 
                FancyTextClass = 'round'
            
            break;

            case 'results-panel-continue':
                FancyTextClass = 'continue'
            break;

            case 'submit-guess-button':
                FancyTextClass = 'good-luck'
            break;

            case 'easy-difficulty-option':
                FancyTextClass = 'easy-difficulty-fancy-text'
            break

            case 'medium-difficulty-option':
                FancyTextClass = 'medium-difficulty-fancy-text'
            break

            case 'hard-difficulty-option':
                FancyTextClass = 'hard-difficulty-fancy-text'
            break

            case 'impossible-difficulty-option':
                FancyTextClass = 'impossible-difficulty-fancy-text'
            break

            case 'select-difficulty':
                FancyTextClass = 'select-difficulty'
            break;

            case 'summary-retry':
                FancyTextClass ='summary-retry-css'
            break;

            case 'summary-home':
                FancyTextClass = 'summary-home-css'
            break;
            case 'summary-panel-score':
                FancyTextClass = 'summary-score'
            break;
            case 'start-game':
                FancyTextClass = 'start-game'
            break;

            case 'new-game':
                FancyTextClass = 'new-game'
            break;

            case 'join-game':
                FancyTextClass = 'join-game'
            break;
        }

        const pp = document.getElementById(InnerTextID)
        const elementspp = pp.childNodes
        $(elementspp).toggleClass(FancyTextClass);

        if(InnerTextID !== 'asu-guesser-fancy-text-id'){
            for(let i = 0; i < 20; i++){
                elementspp[i].style.animation = "none"
            }

        }
        
    }, [])

    return(
        
        <div id={InnerTextID} className="stage">
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            
        </div>
        
    )
}

