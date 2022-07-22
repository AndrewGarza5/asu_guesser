import React, { useEffect, useRef, useState } from 'react'
import './styles/summary-stats-panel.css'
import SummaryTable from './SummaryTable'
import axios from 'axios'


export default function SummaryStatsPanel(props) {

    const [summaryTableVariable, setSummaryTableVariable] = useState(null)
    const currentDate = useRef('<no data>')
    const yourTotalDistance = useRef('<no data>')
    const yourRank = useRef('<no data>')
    const yourPercentile = useRef('<no data>')
    const [submitNameMessage, setSubmitNameMessage] = useState('')

    useEffect(async () => {
        document.getElementById('summary-stats-panel-wrapper').style.transform = 'translateX(0vw)'
        document.getElementById('view-summary-stats-wrapper').style.transform = 'translateX(100vw)'
        document.getElementById('summary-results-wrapper-average').style.visibility = 'visible'
        document.getElementById('summary-bottom-half-wrapper').style.justifyContent = 'space-between'

        const dateTime = new Date().toLocaleString("en-US", {timeZone: "America/Phoenix"})
        let officialDate = ''
        for(let j = 0; j < dateTime.length; j++){
            if(dateTime[j] == ','){
                break
            }
            officialDate += dateTime[j]
        }
        currentDate.current = officialDate
        
        yourTotalDistance.current = +(parseFloat(localStorage.getItem('round1distance')) + parseFloat(localStorage.getItem('round2distance'))
            + parseFloat(localStorage.getItem('round3distance')) + parseFloat(localStorage.getItem('round4distance')) +parseFloat(localStorage.getItem('round5distance'))).toFixed(1)

        let tableData
        let gameRow
        if(props.completedRoundEntryKey.current != null && props.completedRoundEntryKey.current != undefined){
            const response = await axios.get('https://www.asuguesser.com:5001/api/v1/games/single-player/leaderboard/' + props.difficulty + '/' + props.completedRoundEntryKey.current)  
            gameRow = response.data['gameRow']
            tableData = response.data['tableData']

            if(gameRow['rank'] != 1){
                yourRank.current = gameRow['rank'] + ' / ' + tableData.length
                yourPercentile.current = ((100 - ((gameRow['rank'] / tableData[tableData.length - 1]['rank'] ) * 100))).toFixed(1) + '%'
            }
            else{
                yourRank.current = '#1 WOO YEAH BABY!!!' 
                yourPercentile.current = '#1 WOO YEAH BABY!!!'
            }

            
            //setSummaryStatsYouPlaced('You ranked #' + gameRow['rank'] + ', top ' + percentile + '% in the easy category for 4/22/22!')
            
        }
        else{
            tableData = await axios.get('https://www.asuguesser.com:5001/api/v1/games/single-player/leaderboard/' + props.difficulty, {entryKey: props.completedRoundEntryKey.current})  
            tableData = tableData.data
        }
        setSummaryTableVariable(<SummaryTable 
            tableData={tableData}
        />)

        if(localStorage.getItem('leaderboardName') != null){
            document.getElementById('summary-stats-panel-enter-name-input').value = localStorage.getItem('leaderboardName')
        }
    }, [])

    function submitName(){
        setSubmitNameMessage('*This name will apply to all future leaderboard entries')
        localStorage.setItem('leaderboardName', document.getElementById('summary-stats-panel-enter-name-input').value)
    }

  return (
        <>
            <div id='summary-stats-panel-wrapper' className='summary-stats-panel-wrapper'>
                <div className='summary-stats-panel-divs-top-row'>
                    <u>{props.difficulty} leaderboard</u>
                </div>
                <div className='summary-stats-panel-divs-bottom-row'>
                    <div className='summary-stats-panel-enter-name-wrapper'>
                    Enter a 4 letter name:
                    <div className='summary-stats-panel-enter-name-input-button-wrapper'>
                        <input id='summary-stats-panel-enter-name-input' className='summary-stats-panel-enter-name-input' type='text' placeholder='Leaderboard name tag' maxLength='4' autoCorrect='off' autoComplete='off' autoCapitalize="off" spellCheck="false"></input>
                        <button className='summary-stats-panel-enter-name-button' onClick={submitName}>Submit</button>
                    </div>
                    
                    <p id='summary-stats-panel-enter-name-message' style={{fontSize: '18px'}}>{submitNameMessage}</p>
                   </div>
                   <div className='summary-stats-panel-description'>
                       <u>Your results:</u> <br></br>
                       Rank: {yourRank.current}<br></br>
                       Percentile: {yourPercentile.current}<br></br>
                       Total Distance: {yourTotalDistance.current}m<br></br>
   
                   </div>
                   
                   <div className='summary-stats-panel-table-wrapper'>
                       
                       <div className='summary-stats-panel-table'>
                           {summaryTableVariable}
                       </div>
                       
                   </div>
                </div>
                
            </div>
        </>
  )

}

