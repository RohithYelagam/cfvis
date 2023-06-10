import React from 'react'
import { Chart } from "react-google-charts";


function Graph(props) {
    
  const options = {
    titlePosition: 'none',
    backgroundColor:"#161625",
  
    legend:{
      textStyle: {
        color: 'white', 
        fontSize: 13
      },
      position:'right',
      alignment:'top',
    },
   
    hAxis: {
        title: "Timeline",
        textStyle:{
            color:'white'
        },
        titleTextStyle: {
            color: '#5151FF'
          },
        gridlines: {
            color: 'transparent'
        }
      },
      vAxis: {
        title: "Rating",
        textStyle:{
            color:'white'
        },
        titleTextStyle: {
            color: '#5151FF'
          },
      },
      series: {
        1: { curveType: "function" },
      },
      pointsVisible:true,
  };

  return (
    <div>
         <Chart
            height="500px"
            width="1200px"
            chartType="LineChart"
            data={props.ratings}
            options={options}
        />
    </div>
  )
}

export default Graph;