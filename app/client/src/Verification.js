import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import UploadIcon from '@mui/icons-material/Upload';
import Fab from '@mui/material/Fab';
import { TextField } from '@material-ui/core';



const Verification = () => {

  const [showName, setShowName] = useState(true);
  const [showDOB, setShowDOB] = useState(false);
  const [showID, setShowID] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [count, setCount] = useState(-1);

  const [phone, setPhone] = useState();

  useEffect(() => {

    setTestDetails(count);

   }, [count]);

   function onChange() {
     
   }


function setTestDetails (number) {
  switch (number) {

    case -1:
      setShowInstructions(true);
      setShowName(false);
      setShowDOB(false);
      setShowID(false);
      setShowPhone(false);
      break;

    case 0:
        setShowInstructions(false);
        setShowName(true);
        setShowDOB(false);
        setShowID(false);
        setShowPhone(false);
        break;
        case 1:
          setShowName(false);
          setShowDOB(true);
          setShowID(false);
          setShowPhone(false);
          break;
          case 2:
            setShowName(false);
            setShowDOB(false);
            setShowID(true);
            setShowPhone(false);
            break;
            case 3:
              setShowName(false);
              setShowDOB(false);
              setShowID(false);
              setShowPhone(true);
            break;
  
    }
}


  return (<>

    <div className="headerID">

      <div className='widthID'>

      { showInstructions && <>

        <Typography sx={{width:'100%', margin:'0'}} variant="h5" gutterBottom component="div">
          Please read the instructions carefully before starting the verification process.
          </Typography>

     <Typography sx={{width:'100%'}} variant="caption" gutterBottom>
     Note： 1. Prepare your passport/ driving license in advance and take a picture
     according to the instructions. 2. Strictly provide the credentials as per your document. 
     We suggest you to double check the information after entering, or, the verification 
     may fail. 3. The maximum picture size is set to 1.6MB.
     4. Please be patient as, the verification may take a few minutes to complete. 
     </Typography>

     </>
}

{showName && <>
     <TextField required sx={{ width: '60%' }} label="Your name"/>
     </>
}

{showDOB && <>
     <TextField required  sx={{ width: '60%' }} label="Your date of birth"/>
     </>
}

{showID && <>
     <TextField required fullWidth label="ID Card Number"/> <br></br> <br></br> 
     <div style={{width:'60%'}}> 
     <Fab  variant="extended" color="primary" > 
        <UploadIcon sx={{ mr: 1 }} />
        Upload ID
      </Fab> <br></br><br></br>
      <Fab  variant="extended"  >
        <CameraFrontIcon sx={{ mr: 1 }} />
        Selfie with ID
      </Fab>
      </div>
     </>
}

{ showPhone && <>
  <TextField required label="Your phone" 
    placeholder="+1 7866 78389"  onChange={(e) => { setPhone (e.target.value) }}  sx={{ width: '10px' }}/>  
     </>    
}

<div style={{width:'100%', display:'flex', justifyContent: 'flex-end'}}>
 <Button onClick={ () => setCount (count-1)}>Back</Button> &nbsp; &nbsp;
     <Button variant='contained' onClick={ () => setCount (count+1)}>Next</Button>
    </div>
   </div>
   </div>
  </>);
}

export default Verification;