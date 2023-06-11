import React from 'react'
import { Chart } from "react-google-charts";


function Tag(props) {
    
  const options = {
    titlePosition: 'none',
    pieHole: 0.4,
    is3D: false,
    backgroundColor:"#161625",
    pieSliceTextStyle: {
      color: 'white',
    },
    legend:{
      textStyle: {
        color: 'white', 
        fontSize: 13
      },
      position:'right',
      alignment:'center',
    },
    chartArea:{
        left:0,
        top:0,
        height:'100%',
        width:'100%'
    }
  };

  return (
    <div>
         <Chart
            height="400px"
            width="700px"
            chartType="PieChart"
            data={props.tag}
            options={options}
        />
    </div>
  )
}

export default Tag