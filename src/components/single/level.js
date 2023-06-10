import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";


function Level(props) {
  const [index,setIndex] = useState([]);
  const options = {
      titlePosition: 'none',
      backgroundColor:"#161625",
     
      legend:{
        position:'none'
      },

      hAxis: {
          textStyle:{
              color:'white'
          }
        },
        vAxis: {
          textStyle:{
              color:'white'
          }
        }
  };

  useEffect(()=>{
    var aa = props.level;
    aa.sort((a,b)=>(a>b)?1:-1);
    setIndex([['index','count']])
    for(const x in aa){
      setIndex((cur)=>[...cur,[aa[x][0],aa[x][1]]]);
    }
  },[])

  return (
    <div>
         <Chart
            height="400px"
            width="1000px"
            chartType="ColumnChart"
            data={index}
            options={options}
        />
    </div>
  )
}

export default Level;