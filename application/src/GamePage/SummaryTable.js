import React, { useEffect, useRef, useState } from 'react'
import './styles/summary-table.css'
import axios from 'axios'

import { useTable } from 'react-table'

export default function SummaryTable(props) {

    const [summaryStatsWrapper, setSummaryStatsWrapper] = useState(false)
    const [insideOfSummaryStatsWrapper, setInsideOfSummaryStatsWrapper] = useState("View Statistics!")

    useEffect(async () => {
        // console.log({difficulty: props.difficulty}) 
        // const getInfo = {difficulty: props.difficulty}
        // const tableData = await axios.get('https://asuguesser.com:5001/api/v1/games/single-player/leaderboard/' + props.difficulty)      
        // console.log(tableData)
        // Unmount
        if(props.tableData[0] != undefined){
        }
        else {
        }
        return () => {


        }
        
        
    }, [])

    const data = React.useMemo(
      () => 
      props.tableData,
      []
    )

    const columns = React.useMemo(
      () => [
        {
          Header: 'Rank',
          accessor: 'rank', // accessor is the "key" in the data
        },
        {
          Header: 'Name',
          accessor: 'playername', // accessor is the "key" in the data
        },
        {
          Header: 'Total Distance',
          accessor: 'totaldistance'
        }
        
      ],
      []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })

    function viewStatsClick(){
        if(summaryStatsWrapper == false){
            document.getElementById('summary-bottom-half-wrapper').style.justifyContent = 'space-between'
            const summaryStatsWrapper = document.getElementById('view-summary-stats-wrapper')
            // summaryStatsWrapper.style.width = "100%"
            // summaryStatsWrapper.style.height = "40%"
            // summaryStatsWrapper.style.borderLeft = '0px'
            // summaryStatsWrapper.style.borderRight = '0px'
            // summaryStatsWrapper.style.borderBottom = '0px'
            // summaryStatsWrapper.style.borderBottomLeftRadius = '0px'
            // summaryStatsWrapper.style.borderBottomRightRadius = '0px'
        }
        

        setSummaryStatsWrapper(true)
        
    }

  return ( /**  #ffc729   #8e0c3a */
    <table {...getTableProps()} style={{ border: '', backgroundColor: 'black', color: '#ffc729' }}>
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th
              {...column.getHeaderProps()}
              style={{
                background: '#570622',
                fontSize: '22px',
                padding: '5px',
                fontFamily: 'Damion',
                display: 'visible'
              }}
            >
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
              return (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '5px',
                    border: 'solid 0px white',
                    background: '#8e0c3a',
                    fontSize: '20px',
                    fontFamily: 'Sriracha'

                  }}
                >
                  {cell.render('Cell')}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
    
  )

}

