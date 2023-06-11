import React, { useState } from 'react'
import Data from "./data";
import axios from 'axios';
import search from "../../search-interface-symbol.png";
import ReactLoading from 'react-loading';
import "../../css/single.css"

function Single() {
  const [errh,setErrh] = useState("");
  const [handle,setHandle] = useState("");
  const [a,setA] = useState(0);
  const [b,setB] = useState(0);
  const [c,setC] = useState(0);
  const [user,setUser] = useState(null);
  const [submissions, setSubmissions] = useState(null);
  const [ratings, setRatings] = useState(null);
  
const query = "https://codeforces.com/api/";

  const handlechange=(event)=>{
    setHandle(event.target.value);
  }

  const handlesubmit = (event)=>{
    event.preventDefault();
    if(handle===""){
      return;
    }
    setUser(null);
    setA(1);
    setB(1);
    setC(1);
    axios.get(query+`user.info?handles=${handle}`)
    .then((response) => {
      setA(2);
      setUser(response.data.result[0]);
    })
    .catch((error) => {
      setErrh(handle);
      setA(3);
      console.log(error.message);
    })

    axios.get(query + `user.status?handle=${handle}`)
    .then((response) => {
      setB(2);
      setSubmissions(response.data.result)
    })
    .catch((error) => {
      setErrh(handle);
      setB(3);
      console.log(error.message);
    });
    
    axios.get(query + `user.rating?handle=${handle}`)
    .then((response) => {
      setC(2);
      const aa = response.data.result;
      setRatings(aa);
    })
    .catch((error) => {
      setErrh(handle);
      setC(3);
      console.log(error.message);
    });
    }

  return (
    <div className='single'>
      <div >
        <form className="search">
        <input type='text' placeholder='codeforce handle' value={handle} onChange={handlechange}/>
        <button type="submit" onClick={handlesubmit}><img src={search} style={{widht:'20px',height:'20px'}}/></button>
        </form>
      </div>

      <div>

        {(a===2 && b===2 && c===2)?(
          <div className="result">
            <div><Data user={user} handle={handle} ratings={ratings} submissions={submissions}/></div>
          </div>
        ):(
          <div>
            {(a===1 && b===1 && c===1)?(
             <div className='loading'><ReactLoading type="spokes" color="#357EDD" height={100} width={100} /></div>
          ):(
            <div>
              {(a===3 || b===3 || c===3)?(
                <div>User with {errh} not found</div>
              ):(
                <div></div>
              )}
            </div>
          )}
          
          </div>
          
        )} 
      </div>

    </div>
  )
}

export default Single