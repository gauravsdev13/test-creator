import React, { useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Modal from '@material-ui/core/Modal';
import Box from '@mui/material/Box';
import Axios from 'axios';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = (props) => {

    const username = localStorage.getItem('status');
    const [showAccount, setShowAccount] = useState(true);
    const [showNetwork, setShowNetwork] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {if (username) setOpen(true)};
    const handleClose = () => setOpen(false);
   
    const [network, setNetwork] = React.useState('');

    const notifyError = () => toast.error("Connect to Metamask");
    const notifyAccountDelete = () => toast.success("Success");
    
    const handleChange = (event) => {
        setNetwork(event.target.value);
      };

    const deleteUser = (username) => {

      if(username) {
     
      Axios.delete(`https://trellisserver.herokuapp.com/deleteUser/${username}`)
      .then(function (response) {   
       setOpen(false);
       notifyAccountDelete();
       window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    else {
      notifyError()
    }
    };


  

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 200,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
   

    const buttons = [
        <Button key="one" onClick={() => { setShowAccount(true); setShowNetwork(false) }}>Account</Button>,
        <Button key="two" onClick={() => { setShowAccount(false); setShowNetwork(true) }}>Tests and Network</Button>,
      ];

      
    return ( <div className="header-profile">
     
     <ToastContainer position="top-center" hideProgressBar={true}/>

     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>         
          <Button style={{cursor:"pointer"}} onClick= { deleteUser }>Delete Account</Button>       
        </Box>
     </Modal>

       <h3>Settings</h3> <br></br>

       <ButtonGroup size="small" aria-label="small button group">
        {buttons}
       </ButtonGroup>

      <br></br> <br></br>
      { showAccount && <>
       <p style={{cursor:"pointer"}} onClick={handleOpen}>Delete Account</p>     
       </>
      }

     { showNetwork && <>

      <FormGroup>
      <FormControlLabel control={<Switch defaultChecked disabled />} label="Publish results on the network after complete test" />

     <br></br>

     <div style = {{width:'48%'}}>
     <InputLabel id="demo-simple-select-label" disabled >Network</InputLabel>
        <Select
          disabled
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={network}
          label="Network"
          onChange={handleChange}
        >
          <MenuItem value={10}>Polygon</MenuItem>
          <MenuItem value={20}>Ethereum</MenuItem>
        </Select>
        </div>
      </FormGroup> <br></br> <br></br>
      <Button variant="contained" disabled>Save</Button>
      </>
       }
    </div>
 );
}
 
export default Settings;