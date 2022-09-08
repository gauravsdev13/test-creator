import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Input from '@mui/material/Input';
import { Tooltip } from '@mui/material';

const Results = () => {

  const [testResult, setTestResultList] = useState([]);
  const [search, setSearch] = useState("");
  const [testId, setTestId] = useState("");
  const [user, setUser] = useState("");
  const [score, setScore] = useState("");
  const [txHash, setTxHash] = useState("");

  function openScanner() {

    let link = `https://mumbai.polygonscan.com/tx/${txHash}`;
    window.open( link, '_blank');

  }

  useEffect(() => {
    Axios.post("https://trellisserver.herokuapp.com/getresults").then((response) => {
      setTestResultList(response.data);
    });
  }, []);

  var truncate = require( '@stdlib/string-truncate' );

  return (<>

    <div className="headerResults">
    <div className='topMessageResults'> 
          <span style={{fontWeight:'600'}}>Note: </span> &nbsp; If the status of your test hasn't been updated immediately,
            there is likely a delay in our systems.
            We recommend checking back in the next 1 hour.</div>
 
      <div className='results-div'>

        <h6>Results</h6>
          <Input type="text" placeholder="Find by address..." onChange={(event) => {
            setSearch(event.target.value);
          }}> </Input> <br></br> <br></br>
         
       
        <div className='scrollableList'>
          {testResult.filter((val) => {
            if (search == "") { return val }
            else if (val.loginStatus.toLowerCase().includes(search.toLowerCase())) { return val }
          }).map((value, key) => {
            return (
              <Tooltip title = "Click for more">
              <div className='Result-List' 
               onClick={() => { setTestId(value.testId); setUser(value.loginStatus); setScore(value.score); setTxHash(value.txHash) }} >
               <span style={{fontWeight:'600'}}>User:</span> {truncate(value.loginStatus,18)} <br></br>
               <span style={{fontWeight:'600'}}>Test ID:</span> {truncate(value.testId,18)} <br></br>
               <span style={{fontWeight:'600'}}>Score:</span> {value.score}            
              </div>
              </Tooltip>
            );
          })} </div>
      </div>

      <div className='resultsDivDetails'>

      <span style={{fontWeight:'600', color:'gray'}}>{testId}</span>&nbsp;&nbsp;
      <span style={{fontWeight:'600', color:'red'}}>{user}</span>&nbsp;&nbsp;

      { (txHash) && <>
     
      <span style={{fontWeight:'600', color:'green', float:'right'}}>Published</span>
      <br></br>
      <button style={{fontSize:'0.84rem', float:'right', fontWeight:'300', border:'none',backgroundColor:'gray', borderRadius:'5px', color:'ghostwhite', cursor:'pointer'}} onClick = { () => openScanner()}>Track on Blockchain</button>
      </>
      }    

     { (!txHash) && (user) && <>
     
     <span style={{fontWeight:'600', color:'red', float:'right'}}>Unpublished</span> <br></br>
     <button disabled style={{fontSize:'0.84rem', float:'right', fontWeight:'300', border:'none',backgroundColor:'gray', borderRadius:'5px', color:'ghostwhite', cursor:'pointer'}} onClick = { () => openScanner()}>Track on Blockchain</button>

     </>
     }   
      <div style={{width:'100%', height:'100%', display: 'flex', flexWrap: 'wrap', alignItems:'center', justifyItems: 'center', alignContent: 'center', textAlign: 'center', justifyContent: 'center'}}>
      <span style={{fontWeight:'600', color:'green', fontSize:'10rem'}}>{score}</span>
      </div>
      </div>
      </div>


  </>);
}

export default Results;