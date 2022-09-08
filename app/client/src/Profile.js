import React, { useState, useEffect } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Button, Divider } from '@mui/material';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import List from '@mui/material/List';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { deepOrange} from '@mui/material/colors';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PublishIcon from '@mui/icons-material/Publish';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { ethers } from "ethers";
import { contractABI, contractAddress } from "/home/gaurav/Desktop/trellis-app/app/client/src/utils/constants.js";

const theme = createTheme({
  palette: {
    secondary: {
      main: '#1e88e5'
    }
  }
});

var crypto = require('crypto-js');

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (

    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  const notifyNotEnoughFunds = () => toast.error("Not enough funds");

export default function BasicTabs(props) {

  <ToastContainer position="top-center" hideProgressBar={true}/>

  const [activeTestList, setActiveTestList] = useState([]);
  const [savedTestList, setSavedTestList] = useState([]);
  const [completeTestList, setCompleteTestList] = useState([]);

  const [publishedTests, setPublishedTests] = useState([]);

  const [testResultList, setTestResultList] = useState([]);
  const [testResultsStringified, setTestResultsStringified] = useState();

  const [testId, setTestId] = useState('dummyData');
  const [txHash, setTxHash] = useState();

  const [txHashDetails, setTxHashDetails] = useState();
  
  const foreignKey= localStorage.getItem('status');
  var key = "password"

  function encryptTestResults(testResults) {
  var encrypted = crypto.AES.encrypt(testResults, key).toString();
  return encrypted;
  }

  function decryptTestResults(testResultsEncrypted) {
  var decrypted = crypto.AES.decrypt(testResultsEncrypted, key)
    .toString(crypto.enc.Utf8);
    return decrypted;
  }

 useEffect(() => {
    Axios.post("https://trellisserver.herokuapp.com/getResultsforSubmission", {testId}).then((response) => {
      setTestResultList(response.data);
    
    });
  }, [testId]); 


  useEffect(() => {
    if(txHash) {
    Axios.post("https://trellisserver.herokuapp.com/updatePublishedTests", {
      testId: testId,
      txHash: txHash
  });
    Axios.post("https://trellisserver.herokuapp.com/updatePublishedTestsInAnswers", {
    testId: testId,
    txHash: txHash
});
}
  }, [txHash]); 

  useEffect(() => {
    if(txHashDetails) {
    let link = `https://mumbai.polygonscan.com/tx/${txHashDetails}`;
    window.open( link, '_blank');
  }

  }, [txHashDetails]); 

  const publishResults = async () => {

    if (window.ethereum) {   

    try {

      setTestResultsStringified(encryptTestResults(JSON.stringify((testResultList)))); 
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
           
      const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
      
      let txHashed = await transactionsContract.publishResults(testId, testResultsStringified);

      setTxHash(`${txHashed.hash}`);

      }

      catch {
    
      }

    }
    };

    useEffect(() => {
    if(testId) {
    publishResults()
    }
    }, [testId]); 

  useEffect(() => {
    Axios.post("https://trellisserver.herokuapp.com/getActiveTests", { foreignKey: foreignKey }).then((response) => {
      setActiveTestList(response.data);
    });
    }, [activeTestList]); 

    useEffect(() => {
      Axios.post("https://trellisserver.herokuapp.com/readSavedTestList", { foreignKey: foreignKey }).then((response) => {
        setSavedTestList(response.data);
      });
      }, [savedTestList]);

      useEffect(() => {
        Axios.post("https://trellisserver.herokuapp.com/readCompleteTestList", { foreignKey: foreignKey }).then((response) => {
          setCompleteTestList(response.data);
        });
        }, [completeTestList]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className="header-profile">
   
      <div className="cover-image"><div className="image-container">
      
      <Avatar sx={{ bgcolor: deepOrange[500], width: 104, height: 104 , cursor: 'pointer'}} >
        <PermIdentityIcon fontSize="large"/></Avatar> 
       
      <h3 style={{ color: 'black' }}>{foreignKey}</h3>  
      <h6 style={{ color: 'black' }}>Tests complete:</h6>&nbsp; {completeTestList.length}  
      <h6 style={{ color: 'black' }}>Tests active:</h6>&nbsp; {activeTestList.length} 
      </div>
      </div>

      <MuiThemeProvider theme={theme}>
      <Box sx={{ width: '100%', color: "black", typography: 'body1' }}>

       <Tabs
               value={value}
               onChange={ handleChange}
               textColor="primary"
               indicatorColor="primary"
       >
          <Tab icon={<AssignmentTurnedInIcon />} iconPosition="top" label="Complete" {...a11yProps(0)} />
          <Tab icon={<UpcomingIcon />}  iconPosition="top" label="Upcoming" {...a11yProps(1)} />
          <Tab icon={<DataSaverOffIcon />} iconPosition="top" label="Saved" {...a11yProps(2)} />
        </Tabs>
    
        <Divider />

        <div style={{ width: '100%', height: 'auto', display: 'flex', 
        justifyContent: "center", alignItems: "center" }}>

          <List sx={{
            width: '48%',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 200,
            '& ul': { padding: 0 },
          }}>
            <TabPanel value={value} index={0}>

            <List sx={{ width: '100%', bgcolor: 'ghostwhite', borderRadius:'5px'  }}>
                {completeTestList.map((value) => (
                  <ListItem
                  sx = {{borderBottom: '1px solid rgb(0, 156, 0)'}}
                    key={value}
                    disableGutters
                    secondaryAction={
                  
                      <IconButton>
                        { (!value.txHash) && <>                        
                         <PublishIcon onClick = { () => setTestId(value.testId)} /> 
                        </>}
                        { (value.txHash) &&  <>
                           <ReadMoreIcon onClick = { () => setTxHashDetails(value.txHash)}/> 
                        </>}
                      </IconButton>
                                
                    }
                  >
                    <ListItemText primary={` Test Id:  ${value.testId}`} />
                    <ListItemText secondary={` Test Date: ${value.testDate}`} />
                  </ListItem>
                ))}
              </List>

            </TabPanel>
            
            <TabPanel value={value} index={1}>
              <List sx={{ width: '100%', bgcolor: 'ghostwhite', borderRadius:'5px'  }}>
                {activeTestList.map((value) => (
                  <ListItem
                  sx = {{borderBottom: '1px solid rgb(0, 156, 0)'}}
                    key={value}
                    disableGutters
                   
                  >
                    <ListItemText primary={` Test Id:  ${value.testId}`} />
                    <ListItemText secondary={` Test Date: ${value.testDate}`} />

                  </ListItem>
                ))}
              </List>

            </TabPanel>

            <TabPanel value={value} index={2}>
              <List sx={{ width: '100%', bgcolor: 'ghostwhite', borderRadius:'5px'  }}>
                {savedTestList.map((value) => (
                  <ListItem
                  sx = {{borderBottom: '1px solid rgb(0, 156, 0)'}}
                    key={value}
                    disableGutters
                   
                  >
                    <ListItemText primary={` Test Id:  ${value.testId}`} />
                    <ListItemText secondary={` Test Date: ${value.testDate}`} />

                  </ListItem>
                ))}
              </List>

            </TabPanel>
          </List>
        </div>
      </Box>
   </MuiThemeProvider>
    </div>
  );
}
