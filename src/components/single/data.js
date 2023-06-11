import React, { useState, useEffect } from "react";
import Verdict from "./verdict";
import Lang from "./lang";
import Tag from "./tag";
import Level from "./level";
import Rated from "./rated";
import Graph from "./graph";
import "../../css/data.css";


function Data(props) {

  const [user,setUser] = useState(props.user);
  const [ratings, setRatings] = useState([['time',props.handle],[new Date(props.user.registrationTimeSeconds*1000),props.ratings[0].oldRating]]);
  const [sub, setSub] = useState(props.submissions);

  const [verd,setVerd] =useState([['Verdict','Count']]);
  const [lang,setLang] =useState([['Language','Count']]);
  const [tag,setTag] =useState([['Tags','Count']]);
  const [level,setLevel] =useState([]);
  const [rated,setRated] =useState([]);

  const setcolor = (rank)=>{
    if(rank === "newbie"){
      return "#FFFFFF";
    }else if(rank === "pupil"){
      return "#008000";
    }else if(rank === "specialist"){
      return "#03A89E";
    }else if(rank === "expert"){
      return "#0000FF";
    }else if(rank === "candidate Master"){
      return "#AA00AA";
    }else if(rank === "master" || rank === "international master"){
      return "#FCA900";
    }else{
      return "#FF0000";
    }
  }

  useState(()=>{
    const final={},final2={},final3={},final4={},final5={};

    for(const {verdict} of sub){
      final[verdict] = (final[verdict] || 0) + 1;
    };
    for(const item in final){
      setVerd((curr)=>[...curr,[item,final[item]]]);
    }

    for(const {programmingLanguage} of sub){
      final2[programmingLanguage] = (final2[programmingLanguage] || 0) + 1;
    };
    for(const item in final2){
      setLang((curr)=>[...curr,[item,final2[item]]]);
    }

    for(const {problem} of sub){
      final4[problem.index[0]] = (final4[problem.index[0]] || 0) + 1;
      if(problem.rating)final5[problem.rating] = (final5[problem.rating] || 0) + 1;
      for(const x in problem.tags){
        final3[problem.tags[x]] = (final3[problem.tags[x]] || 0) + 1;
      }
    }
    for(const item in final3){
      setTag((curr)=>[...curr,[item,final3[item]]]);
    }
    for(const item in final4){
      setLevel((curr)=>[...curr,[item,final4[item]]])
    }
    for(const item in final5){
      setRated((curr)=>[...curr,[item,final5[item]]])
    }
    for(const x in props.ratings){
      setRatings((curr)=>[...curr,[new Date(props.ratings[x].ratingUpdateTimeSeconds*1000),props.ratings[x].newRating]])
    }
    
  },[])


  return (
    <div className="data">

      <div className="profile">
        <div className="profile-left">
          <div className="handle" id="handle" style={{color:setcolor(user.rank)}}>{user.handle}</div>
          <div className="name">
            {user.firstName + " " + user.lastName}
            <div className="from">{user.organization}</div>
          </div>
          <div className="rating">contest rating: <div className="rating-num" style={{color:setcolor(user.rank)}}>{user.rating}</div></div>
          <div className="max-rating">
             max: <div className="max-rating-num" style={{color:setcolor(user.maxRank)}}>{user.maxRank+","+user.maxRating}</div>
          </div>
          
        </div>
        <div className="profile-right">
          <img src={user.titlePhoto} alt="userpic" />
        </div>
      </div>

      <div className="data-1">
      <div className="verdict">
        <div className="title2">Verdicts</div>
        <div className="data2"><Verdict verd={verd}/></div>
      </div>

      <div className="verdict">
      <div className="title2">Languages</div>
        <div className="data2"><Lang lang={lang}/></div>
      </div>
      </div>
      

      <div className="verdict">
      <div className="title2">Tags</div>
        <div className="data2"><Tag tag={tag}/></div>
      </div>

      <div className="verdict">
      <div className="title2">Problem Indexs</div>
        <div className="data2"><Level level={level}/></div>
      </div>

      <div className="verdict">
      <div className="title2">Problem Ratings</div>
        <div className="data2"><Rated rated={rated}/></div>
      </div>

      <div className="verdict">
      <div className="title2">Rating Graph</div>
        <div className="data2"><Graph ratings={ratings}/></div>
      </div>

    </div>
  );
}

export default Data;
