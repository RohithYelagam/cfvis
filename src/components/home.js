import React, { useEffect, useState } from 'react';
import "../css/home.css";
import github from "../github-mark-white.png";
import Single from "./single/single";
import Compare from "./compare/compare";

function Home() {

  const [idx,setIdx] = useState(0);
  const [text,setText] = useState("");
  const [flg,setFlg] = useState(1);
  const fulltext = "A customised tool to analyse codeforces user statitics..!";
  
  useEffect(()=>{
    if(idx < fulltext.length){
      setTimeout(()=>{
        setText(text + fulltext[idx]);
        setIdx(idx + 1);
      },20)
    }
  });

  const single=()=>{
    setFlg(1);
  }

  const compare=()=>{
    setFlg(2);
  }

  return (
    <div className='home'>
      <div className="header">
        <div className="title">CodeProbe</div>
        <div className="main">
        <div className="choose" id='single' onClick={single}>Single</div>
        <div className="choose" id='compare' onClick={compare}>Compare</div>
      </div>
      </div>
      
      <div className="description" id='description'>{text}</div>
      
      <div className="subject">
          {(flg===1)?(
            <Single/>
          ):(
            <Compare/>
          )}
      </div>
      <div className="footer"><div>Made with 💙 by Rohith Yelagam </div><a href='https://github.com/rohithyelagam' target='blank'><div><img src={github} alt="github" style={{ width: 20, height: 20 }}/></div></a></div>
    </div>
  )
}

export default Home;