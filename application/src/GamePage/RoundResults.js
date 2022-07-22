import React, { useEffect, useState, useRef } from 'react'
import './styles/round-results.css'
import FancyText from '../HomePage/FancyText'

import GoogleMapResults from './GoogleMapResults'

export default function RoundResults(props) {

    
    const [distance, setDistance] = useState(0)
    const [score, setScore] = useState(0)
    const viewHeightOnFancyText = useRef(null)

    useEffect( () => {
        document.getElementById('round-results-top-wrapper').style.transform = 'translateX(0vw)'
        document.getElementById('round-results-bottom-wrapper').style.transform = 'translateX(0vw)'
        
        setDistance(props.distance)
        setScore((props.score).toLocaleString())

        let barLength = 0
        if(props.score == 5000){
            barLength = 100
        }
        else{
            barLength = (1 - (props.distance / 1000)) * 100  
        }
        setTimeout(() => {
            document.getElementById('results-bar-inner').style.width = barLength + '%'
        }, 600)

        setTimeout(() => {
            document.getElementById('round-results-top-wrapper').style.transition = '0ms'
            document.getElementById('round-results-bottom-wrapper').style.transition = '0ms'
        }, 800)

        window.addEventListener('resize', windowResize)

        const currentHeight = window.innerHeight
        
        if(currentHeight > 776){
            if(viewHeightOnFancyText.current != 776){
                const resultsPanelScore = document.getElementById('results-panel-score')
                const resultsPanelScoreChildren = resultsPanelScore.childNodes
                for(let i = 0; i < 20; i++){
                    resultsPanelScoreChildren[i].style.top = "0px"
                }
            }
        }
        else if(currentHeight < 775 && currentHeight > 376){
            if(viewHeightOnFancyText.current != 776){
                const resultsPanelScore = document.getElementById('results-panel-score')
                const resultsPanelScoreChildren = resultsPanelScore.childNodes
                for(let i = 0; i < 20; i++){
                    resultsPanelScoreChildren[i].style.top = "10px"
                }
            }
        }
        else if(currentHeight < 375){
            if(viewHeightOnFancyText.current != 776){
                const resultsPanelScore = document.getElementById('results-panel-score')
                const resultsPanelScoreChildren = resultsPanelScore.childNodes
                for(let i = 0; i < 20; i++){
                    resultsPanelScoreChildren[i].style.top = "10px"
                }
            }
        }

        // Unmount
        return () => {
            window.removeEventListener('resize', windowResize)
        }
        
    }, [])

    function windowResize(){
        const currentHeight = window.innerHeight

        if(currentHeight > 776){
            if(viewHeightOnFancyText.current != 776){
              const resultsPanelScore = document.getElementById('results-panel-score')
              const resultsPanelScoreChildren = resultsPanelScore.childNodes

              const resultsPanelDistance = document.getElementById('results-panel-distance')
              const resultsPanelDistanceChildren = resultsPanelDistance.childNodes
              for(let i = 0; i < 20; i++){
                  resultsPanelScoreChildren[i].style.top = ''
                  resultsPanelDistanceChildren[i].style.top = ''
              }

              viewHeightOnFancyText.current = 776
            }
          }
          else if(currentHeight < 775 && currentHeight >= 576){
            if(viewHeightOnFancyText.current != 576){
                const resultsPanelScore = document.getElementById('results-panel-score')
                const resultsPanelScoreChildren = resultsPanelScore.childNodes

                const resultsPanelDistance = document.getElementById('results-panel-distance')
                const resultsPanelDistanceChildren = resultsPanelDistance.childNodes
                for(let i = 0; i < 20; i++){
                    resultsPanelScoreChildren[i].style.top = "10px"
                    resultsPanelDistanceChildren[i].style.top = '8px'
                }

                viewHeightOnFancyText.current = 576
            }
          }
          else if(currentHeight < 575){
            // if(viewHeightOnFancyText.current != 0){
            //     console.log('sdgfagsd')
            //     const resultsPanelScore = document.getElementById('results-panel-score')
            //     const resultsPanelScoreChildren = resultsPanelScore.childNodes

            //     const resultsPanelDistance = document.getElementById('results-panel-distance')
            //     const resultsPanelDistanceChildren = resultsPanelDistance.childNodes
            //     for(let i = 0; i < 20; i++){
            //         resultsPanelScoreChildren[i].style.top = "30px"
            //         resultsPanelDistanceChildren[i].style.top = ''
            //     }
            //     viewHeightOnFancyText.current = 0
            // }
          }
    }

    
    return (
        <>
            <div id='round-results-top-wrapper' className='round-results-top-wrapper'>
                <div className='panels-wrapper'>
                    <button className='results-panel-distance'>
                        <FancyText InnerTextID={'results-panel-distance'}/>
                        {distance}m
                    </button>
                    <button className='results-panel-score'>
                        <FancyText InnerTextID={'results-panel-score'}/>
                        <div className='results-panel-score-score'>
                           {score} 
                        </div>
                        <div className='results-panel-score-mg'>
                            M&G
                        </div>
                        
                    </button>

                    <div className='results-panel-continue-wrapper' onClick={props.nextRoundClick}>
                        <div className='results-panel-continue-square'>
                        <FancyText InnerTextID={'results-panel-continue'}/>
                        </div>
                        <div className='results-panel-continue-triangle-outer'>
                            <div className='results-panel-continue-triangle-inner'>

                            </div>
                        </div>
                        
                        
                    </div>
                </div>

                <div className='results-bar-outer'>
                    <div id='results-bar-inner' className='results-bar-inner'>

                    </div>
                </div>
            </div>
            <div id='round-results-bottom-wrapper' className='round-results-bottom-wrapper'>
                <GoogleMapResults 
                    guessCoordinates={props.guessCoordinates}
                    answerCoordinates={props.answerCoordinates}
                    difficulty={props.difficulty}
                />
            </div>
        </>
        
    )

}

