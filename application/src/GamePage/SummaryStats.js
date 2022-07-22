import React, { useEffect, useRef, useState } from 'react'
import './styles/summary-stats.css'
import SummaryTable from './SummaryTable'
import axios from 'axios'
import SummaryStatsPanel from './SummaryStatsPanel'


export default function SummaryStats(props) {

    const [summaryStatsPanel, setSummaryStatsPanel] = useState(null)

    async function viewStatsClick(){
 

        setSummaryStatsPanel(<SummaryStatsPanel 
            completedRoundEntryKey={props.completedRoundEntryKey}
            difficulty={props.difficulty}
        />) 
        setTimeout(() => {
            document.getElementById('view-summary-stats-wrapper').style.transition = '0ms'
        }, 800)
        
        
    }

  return (
        <>
            <div id='view-summary-stats-wrapper' className='view-summary-stats-wrapper' onClick={viewStatsClick}>
                Analyze game
            </div>
            {summaryStatsPanel}
        </>
  )

}

