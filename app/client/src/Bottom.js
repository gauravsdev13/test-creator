
import { green , red } from '@mui/material/colors';
import SignalWifiOffIcon from '@mui/icons-material/SignalWifiOff';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import React from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Offline, Online } from "react-detect-offline";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function onClickDirect() {
  window.open('https://app.gitbook.com/c/', '_blank');
}

const Bottom = (props) => {
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return ( <>
       
        <div className="bottom">
          <div className="info-net">POLYGON</div>
          <div className="info" aria-describedby={id} variant="contained" onClick={handleClick}><NotificationsNoneOutlinedIcon color="action"  /></div>
          <div className="info" onClick={onClickDirect}><HelpOutlineIcon color="action" /></div>
          <a href="mailto:trellisnetwork1@gmail.com"> <div className="info"> <MailOutlineIcon color="action"/></div></a>
          
          <div className="info-net" style={{position:'absolute', right:'10px'}}> <Online> <span style={{ color: green[700] ,fontWeight:'lighter' }}> Stable connection</span> <SignalWifi4BarIcon fontSize="medium" sx={{ color: green[400] }}/></Online><Offline><span style={{ color: red[500], fontWeight:'lighter' }}>No Connection</span>  &nbsp; <SignalWifiOffIcon fontSize="small" sx={{ color: red[500] }}/></Offline></div>
          </div>
          <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography variant="h5" sx={{ p: 2 }}>Notifications</Typography>
        <Typography sx={{ p: 2 }}>You don't have any notifications.</Typography>
      </Popover>
          </>);
      }

       
      export default Bottom;   