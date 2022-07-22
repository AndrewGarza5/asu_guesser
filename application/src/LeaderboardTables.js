import React, { useEffect, useRef, useState } from 'react'
import './styles/leaderboard-tables.css'

import { useTable } from 'react-table'

export default function LeaderboardTables(props) {

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
            Header: ' ',
            columns:[
                {
                    Header: 'Rank',
                    accessor: 'rank', // accessor is the "key" in the data
                },
                {
                  Header: 'Name',
                  accessor: 'playername', // accessor is the "key" in the data
                }
            ]
          },
          {
              Header: 'Distance',
              columns: [
                  {
                    Header: 'Round 1',
                    accessor: 'distance1'
                  },
                  {
                    Header: 'Round 2',
                    accessor: 'distance2'
                  },
                  {
                    Header: 'Round 3',
                    accessor: 'distance3'
                  },
                  {
                    Header: 'Round 4',
                    accessor: 'distance4'
                  },
                  {
                    Header: 'Round 5',
                    accessor: 'distance5'
                  },
                  {
                    Header: 'Total',
                    accessor: 'totaldistance'
                  }
              ]
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
                fontSize: '20px',
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
                    fontSize: '18px',
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

