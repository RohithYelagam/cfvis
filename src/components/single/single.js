import React, { useState } from 'react'
import Data from "./data";
import axios from 'axios';
import search from "../../search-interface-symbol.png";
import ReactLoading from 'react-loading';
import "../../css/single.css"

function Single() {

  const [handle,setHandle] = useState("");
  const [a,setA] = useState(0);
  const [b,setB] = useState(0);
  const [c,setC] = useState(0);
  const [err,setErr] = useState(false);
  const [user,setUser] = useState(null);
  const [submissions, setSubmissions] = useState(null);
  const [ratings, setRatings] = useState(null);
  
const query = "https://codeforces.com/api/";

  const handlechange=(event)=>{
    // setUser(null);
    setHandle(event.target.value);
  }

  const handlesubmit = (event)=>{
    event.preventDefault();
    setUser(null);
    setA(1);
    setB(1);
    setC(1);
    setErr(false);
    axios.get(query+`user.info?handles=${handle}`)
    .then((response) => {
      setA(2);
      setUser(response.data.result[0]);
    })
    .catch((error) => {
      setErr(true);
      console.log(error.message);
    })

    axios.get(query + `user.status?handle=${handle}`)
    .then((response) => {
      setB(2);
      setSubmissions(response.data.result)
    })
    .catch((error) => {
      setErr(true);
      console.log(error.message);
    });
    
    axios.get(query + `user.rating?handle=${handle}`)
    .then((response) => {
      setC(2);
      const aa = response.data.result;
      setRatings(aa);
    })
    .catch((error) => {
      setErr(true);
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

        {(a==0 && b==0 && c==0)?(
          <div></div>
        ):(
          <div>
            {(a==1 || b==1 || c==1)?(
             <div className='loading'><ReactLoading type="spokes" color="#357EDD" height={100} width={100} /></div>
          ):(
            <div>
              {(err)?(
                <div>data not found</div>
              ):(
                <div className="result">
                  <div ><Data user={user} handle={handle} ratings={ratings} submissions={submissions}/></div>
                </div>
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