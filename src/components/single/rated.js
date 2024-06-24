import React,{useState,useEffect} from 'react'
import { Chart } from "react-google-charts";


function Rated(props) {
  const [levels,setLevels] = useState([]);
  const options = {
      titlePosition: 'none',
      backgroundColor:"#161625",
    
      legend:{
        position:'none'
      },
     
      hAxis: {
          textStyle:{
              color:'white'
          },
          direction:1,
          slantedText:true,
          slantedTextAngle:90,
        },
        vAxis: {
          textStyle:{
              color:'white'
          }
        },
  };

  useEffect(()=>{
    var aa = props.rated;
    aa.sort((a,b)=>(a.length>b.length)?1:-1);
    setLevels([['levels','count']])
    for(const x in aa){
      setLevels((cur)=>[...cur,[aa[x][0],aa[x][1]]]);
    }
  },[])

  return (
    <div>
         <Chart
            height="400px"
            width="1000px"
            chartType="ColumnChart"
            data={levels}
            options={options}
        />
    </div>
  )
}

export default Rated