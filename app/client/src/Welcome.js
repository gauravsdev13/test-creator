import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Axios from 'axios';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import ClearIcon from '@mui/icons-material/Clear';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Countdown from 'react-countdown-now';
import Fab from '@mui/material/Fab';
import KeyIcon from '@mui/icons-material/Key';
import { Tooltip } from '@mui/material';
import { ethers } from "ethers";
import { contractABI, contractAddress } from "C:/Users/gshar/Desktop/Test-creator/test-creator/app/client/src/utils/constants.js";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 304,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Welcome = (props) => {

  let loginStatus = null;
  loginStatus = localStorage.getItem('status');

  //Toast logic

  const notifyTokenReceived = () => toast.info("Token received");

  <ToastContainer position="top-center" hideProgressBar={true}/>

  //Blockchain Logic
  
    const depositFrom = async () => {

      if (window.ethereum) {   

      try {
        const options = {value: ethers.utils.parseEther(cost)};

        const costParsed = ethers.utils.parseEther(cost);
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        await provider.send("eth_requestAccounts", []);

        const signer = await provider.getSigner();
             
        const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const sendTx = await transactionsContract.depositFrom(testId, user, costParsed, options);

        transactionsContract.on("Deposit", (_amount, _testId, _from ) => 
        
        { if (_amount >= costParsed) 
         
          Axios.post("https://trellisserver.herokuapp.com/updateTokens", {
            loginStatus: loginStatus,
            tokens: tokens
          });     

        })
        }

        catch {
  
          console.log('Not enough funds')
      
        }

      }

      else {
        console.log('Install Metamask')
      }
  };
  
   //Collect answers

  const [answer, setAnswer] = useState([
    { id: 0, answerOne: false, answerTwo: false, answerFour: false, answerThree: false },
    { id: 1, answerOne: false, answerTwo: false, answerFour: false, answerThree: false },
    { id: 2, answerOne: false, answerTwo: false, answerFour: false, answerThree: false },
    { id: 3, answerOne: false, answerTwo: false, answerFour: false, answerThree: false },
    { id: 4, answerOne: false, answerTwo: false, answerFour: false, answerThree: false },
    { id: 5, answerOne: false, answerTwo: false, answerFour: false, answerThree: false },
    { id: 6, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 7, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 8, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 9, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 10, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 11, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 12, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 13, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 14, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 15, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 16, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 17, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 18, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 19, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 20, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 21, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 22, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 23, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 24, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 25, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 26, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 27, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 28, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 29, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 30, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 31, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 32, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 33, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 34, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 35, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 36, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 37, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 38, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 39, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 40, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 41, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 42, answerOne: false, answerTwo: false, answerFour: false, answerThree: false },
    { id: 43, answerOne: false, answerTwo: false, answerFour: false, answerThree: false },
    { id: 44, answerOne: false, answerTwo: false, answerFour: false, answerThree: false },
    { id: 45, answerOne: false, answerTwo: false, answerFour: false, answerThree: false },
    { id: 46, answerOne: false, answerTwo: false, answerFour: false, answerThree: false },
    { id: 47, answerOne: false, answerTwo: false, answerFour: false, answerThree: false },
    { id: 48, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 49, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 50, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 51, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 52, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 53, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 54, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 55, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 56, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 57, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 58, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 59, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 60, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 61, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 62, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 63, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 64, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 65, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 66, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 67, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 68, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 69, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 70, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 71, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 72, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 73, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 74, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 75, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 76, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 77, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 78, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 79, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 80, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 81, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 82, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 83, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 65, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 66, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 67, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 68, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 69, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 70, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 71, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 72, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 73, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 74, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 75, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 76, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 77, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 78, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 79, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 80, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 81, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 82, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 83, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 84, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 85, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 86, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 87, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 88, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 89, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 90, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 91, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 92, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 93, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 94, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 95, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 96, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 97, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 98, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 99, answerOne: false, answerTwo: false, answerThree: false, answerFour: false },
    { id: 100, answerOne: false, answerTwo: false, answerThree: false, answerFour: false }
  ]);

  function selectFewerProps(show) {

    const { answerOne, answerTwo, answerFour, answerThree } = show;
    return { answerOne, answerTwo, answerFour, answerThree };

  }

  const addResults = () => {

    var answerJson = JSON.stringify(answer);

    Axios.post("https://trellisserver.herokuapp.com/addResults", {

      testId: testId,
      loginStatus: loginStatus,
      answerJson: answerJson,
      score: score

    }).then((response) => {
      console.log(response);
    });
  };

  const updateTestStatus = () => {
    Axios.put("https://trellisserver.herokuapp.com/updateTestStatus", {
      testId: testId,
      testStatus: 'complete'
    })
  }

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  const [testId, setTestId] = useState(null);

  const [cost, setCost] = useState();
  const [user, setUser] = useState();
  const [tokens, setTokens] = useState();

  const [showTest, setShowTest] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [showAgreementNext, setShowAgreementNext] = useState(false);
  const [showBeginTestButton, setShowBeginTestButton] = useState(false);
  const [showActiveTestList, setShowActiveTestList] = useState(true);
  const [showConfirmSubmission, setShowConfirmSubmission] = useState(false);
  const [successTest, setShowsuccessTest] = useState(false);

  const [maxSteps, setMaxSteps] = useState();

  const [steps, setSteps] = useState();
  const [stepsValues, setStepsValues] = useState();

  const [userTokens, setUserTokens] = useState([]);


  useEffect(() => {

     async function getQuestions() {
      const response = await Axios.post("https://trellisserver.herokuapp.com/getQuestions", { testId: testId });
      await setSteps(response.data);
    }
    getQuestions();
  
  }, [testId], [steps])

 
  function readTokens() {
    Axios.post("https://trellisserver.herokuapp.com/readTokens", { loginStatus: loginStatus }).then((response) => {    
    var tokens = response.data.map(function(a){
        return a.tokens;
    });
    setUserTokens((tokens))
    });   
  }

  useEffect(() => {
   readTokens() 
  }, [loginStatus], [userTokens])



  function getCorrectAnswers() {

    let result = steps.map(({ answerJson }) => answerJson);

    setStepsValues(Object.values(result));

  }

  const [score, setScore] = useState(0);

  function makeResults() {
    let score = 0;
    if (stepsValues) {
      for (var i = 0; i < answer.length; i++) {
        if (JSON.stringify(answer[i]) === JSON.stringify(JSON.parse(stepsValues[i]))) {
          score++;
          setScore(score);
        }
      }
    }
  }

  var submitTimeout = null

  useEffect(() => {

    makeResults();

    function checkUserPresent() {

      if (showConfirmSubmission && testId != null && !showTest) submitTest() 

    }

  submitTimeout = setTimeout(checkUserPresent, 30000)


  }, [showConfirmSubmission])


  function prepareAnswerSheetOne() {

    setMaxSteps(steps.length);
    setShowAgreementNext(!showAgreementNext);
    getCorrectAnswers();

  }

  function prepareAnswerSheetTwo() {

    answer.splice(maxSteps);
    setShowBeginTestButton(!showBeginTestButton);
    setShowAgreement(!showAgreement);
    setShowAgreementNext(!showAgreementNext);

  }


  const toggleanswerOne = (id) => {

    setAnswer(answer => {
      return answer.map(item => {
        return item.id === id ? { ...item, answerOne: !item.answerOne } : item
      })
    })
  }

  const toggleanswerTwo = (id) => {

    setAnswer(answer => {
      return answer.map(item => {
        return item.id === id ? { ...item, answerTwo: !item.answerTwo } : item
      })
    })

  }

  const toggleanswerThree = (id) => {

    setAnswer(answer => {
      return answer.map(item => {
        return item.id === id ? { ...item, answerThree: !item.answerThree } : item
      })
    })
  }

  const toggleanswerFour = (id) => {

    setAnswer(answer => {
      return answer.map(item => {
        return item.id === id ? { ...item, answerFour: !item.answerFour } : item
      })
    })
  }

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let navbarStatusForLogin = props.navbarStatusForLogin;

  const [testDuration, setTestDuration] = useState(0);

  const [success, setSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(navbarStatusForLogin);
  }, [navbarStatusForLogin])


  const timer = React.useRef();

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );



  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);


  function msToMin(mSecs) {

    let  min = (mSecs/1000)/60;
    return min;

  }

  const [dateParsed, setDateParsed] = useState();
  const [timeNow, setTimeNow] = useState();
  const [dateParsedTimeEnd, setDateParsedTimeEnd] = useState();
  const [testName, setTestName] = useState();
 
  const fetchTestId = async (id, timeStart, timeEnd, tokenNo, _cost, username, testname) => {

    setUser(username);
    setCost(_cost);
    setTestId(id);
    setTokens(tokenNo);
    setDateParsed(new Date(timeStart));
    setTimeNow (new Date());
    setDateParsedTimeEnd (new Date(timeEnd));
    setTestName(testname);
    notifyTokenReceived()
 
  }

  const notifyGetTokens = () => toast.error("No token found");
  const notifyConnectWallet = () => toast.error("Connect to Metamask");

   function checkPaid() {

    if(localStorage.getItem('status')) {

    if(tokens) {

    if (userTokens.includes(tokens) || cost == '0') {


      if (timeNow.getTime() > dateParsed.getTime() &&
        timeNow.getTime() < dateParsedTimeEnd.getTime()) {

        setShowActiveTestList(false);
        setTestDuration(dateParsedTimeEnd - timeNow);
        setShowAgreement(true);
      
      }

      else if (dateParsed.getTime() > timeNow.getTime()) {

        setTestNotBegun(!testNotBegun);
        setShowActiveTestList(!showActiveTestList);

      }

      else if (dateParsed.getTime() < dateParsedTimeEnd.getTime()) {

        setTestEnded(!testEnded);
        setShowActiveTestList(!showActiveTestList);

      }
      }

      else {

        depositFrom();    
      }
    
     }

     else {
       notifyGetTokens()
     }
    }

    else {
      notifyConnectWallet()
    }
  }
  async function getDuration() {

    setShowBeginTestButton(false);
    setShowTest(true);

  };

  function startTest() {

    getDuration();

  };

  function goBackToHomeScreen() {
    setShowsuccessTest(!successTest);
    setShowActiveTestList(!showActiveTestList);

  }

  function goBackToHomeScreenTestEnded() {
    setTestEnded(!testEnded);
    setShowActiveTestList(!showActiveTestList);
    updateTestStatus();
  }

  function goBackToHomeScreenTestNotBegun() {
    setTestNotBegun(!testNotBegun);
    setShowActiveTestList(!showActiveTestList)
  }

  function completeSubmission() {

    setAnswer(answer.map(selectFewerProps));
    setShowConfirmSubmission(!showConfirmSubmission);
    setShowTest(!showTest);

  };

  function submitTest() {

    addResults();
    setShowConfirmSubmission(false);
    setShowsuccessTest(true);
    setTestId(null);
    clearTimeout(submitTimeout)

  };

  Axios.defaults.withCredentials = true;

  const [activeTests, setActiveTestsList] = useState([{
    testName: "Math Exam",
    duration: 90,  // in minutes
    cost: 20,  // in USD
    testId: "12345",
    testDate: "2025-01-25T09:00:00Z",
    endTime: "2025-01-25T10:30:00Z",
    token: "sampleToken123",
    foreignKey: "testData2025",
  },
  {
    testName: "Physics Exam",
    duration: 90,  // in minutes
    cost: 15,  // in USD
    testId: "12345",
    testDate: "2025-01-25T09:00:00Z",
    endTime: "2025-01-25T10:30:00Z",
    token: "sampleToken123",
    foreignKey: "testData2025",
  },
]);
  const [search, setSearch] = useState("");

  const [testEnded, setTestEnded] = useState(false);
  const [testNotBegun, setTestNotBegun] = useState(false);

  const [filterWhich, setFilterWhich] = useState();


  useEffect(() => {
   if (filterWhich == 'A') filterTestsBegins() 
    else if (filterWhich == 'U') filterTestsAsc() 
     else if (filterWhich == 'O') filterTestsBegins()  
    }, filterWhich)

  useEffect(() => {
    Axios.post("https://trellisserver.herokuapp.com/readActiveTestListForUser").then((response) => {
      setActiveTestsList(response.data);
      
    });
  }, []);
 
  const activeTestsFiltered = activeTests.map(a => ({...a}));

    function filterTestsAsc() {

      activeTestsFiltered.sort((testOne, testTwo) => {
        if ( new Date(testOne.testDate).getTime() > new Date(testTwo.testDate).getTime()){
          return -1;
        }
        if ( new Date(testOne.testDate).getTime() < new Date(testTwo.testDate).getTime() ){
          return 1;
        }   
      return 0;
    })

    }    
    
    function filterTestsBegins( ) {
     
      activeTestsFiltered.sort((testOne, testTwo) => {
        if ( testOne.duration < testTwo.duration ) {
          return -1;
        }
        if ( testOne.duration > testTwo.duration ){
          return 1;
        }    
        return 0;
      })
    }   


  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      completeSubmission()

    } else {
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };

  return (
    <>
          
         <div className="header-welcome">
  
       
        {showTest &&
          <div className='testScreen'>
            <div style={{ marginRight: "10px", marginTop: "3.3rem", position: "absolute", top: "0", right: "0" }}>
            <span >Q{activeStep+1}/{maxSteps} &nbsp;
              
              </span>
          
              <Countdown date={Date.now() + testDuration} renderer={renderer} />
              
            
            </div>
           
            <Box sx={{ maxWidth: 600, flexGrow: 1, backgroundColor:'ghostwhite' }}>
            <div style ={{ display: 'flex', alignItems:'center', justifyContent: 'center',width:'100%', height:'3.3rem', color: 'ghostwhite',  backgroundColor: '#383838', borderRadius: '5px'}}>{testName}</div>
              <Paper
                square
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 50,
                  pl: 2,
                  bgcolor: 'background.default',
                }}
              >
                <Typography>{steps[activeStep].question}</Typography>
              </Paper>

              <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>

                <input type="checkbox"
                  checked={answer[activeStep].answerOne}
                  onChange={(e) => toggleanswerOne(activeStep)}
                />&nbsp; {steps[activeStep].answerOne} <br></br> <br></br> <br></br>

                <input type="checkbox"
                  checked={answer[activeStep].answerTwo}
                  onChange={(e) => toggleanswerTwo(activeStep)}
                />&nbsp; {steps[activeStep].answerTwo} <br></br> <br></br> <br></br>

                <input type="checkbox"
                  checked={answer[activeStep].answerThree}
                  onChange={(e) => toggleanswerThree(activeStep)}
                /> &nbsp; {steps[activeStep].answerThree} <br></br> <br></br> <br></br>

                <input type="checkbox"
                  checked={answer[activeStep].answerFour}
                  onChange={(e) => toggleanswerFour(activeStep)}
                />&nbsp; {steps[activeStep].answerFour}

              </Box>
              <br></br>
              <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    Next
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                    Back
                  </Button>
                }
              /> <br></br>
            
            </Box>
          
            <Button disabled={activeStep < (maxSteps - 1)}
              style={{ position: 'absolute', right: '0', bottom: '60px', marginRight: '48px' }}
              onClick={
                completeSubmission
              } >
              Complete Submission</Button>
          </div>
        }

        {showConfirmSubmission && <>
          <div className="testScreenMessage">
            You are about to submit your test responses. Duplicate entries are not allowed.
            Your test responses will be automatically submitted in 30 seconds. Please confirm by
            pressing SUBMIT or press BACK to return to the test screen.
            <br></br> <br></br>
          </div>

          <Button onClick={() => {
            setShowTest(!showTest); setShowConfirmSubmission(!showConfirmSubmission);  clearTimeout(submitTimeout);
          }} > Back </Button> &nbsp; &nbsp; &nbsp;

          <Button variant="contained" onClick={
            submitTest
          } > Submit</Button> </>
        }

        {showBeginTestButton && <div sx={{ width: 'auto', height: '500px' }}>
          <div className='button-create-test' onClick={startTest}>
            <div className='content-ic'><BorderColorIcon fontSize="large" />
            </div>
            <div className='content-bu'> Start Test </div></div>
          <br></br>
        </div>}

        {showAgreement &&
          <div>
            <div className='messageCandidate' >
              I, hereby give my permission for (add host organisation)
              to share personal information with other service providers in
              connection with my Test reports, including accessing and sharing my performance,
              if applicable. I understand that the host organisations may hold
              information gathered about me from the various agencies. <br></br> <br></br>

              <br></br> <input type="checkbox"
                onChange={prepareAnswerSheetOne}
              />&nbsp; &nbsp;I agree to my information being shared and gathered between services.<br></br> <br></br>
              {showAgreementNext &&
                <>
                  <Button onClick={ prepareAnswerSheetTwo}>Next</Button>
                </>
              }
            </div>
          </div>}

        {testEnded && <>
          <div className="testScreenMessage">
            Thank you. This test has already ended.  <br></br> <br></br>
          </div>

          <Button onClick={goBackToHomeScreenTestEnded}>Back to Home Screen</Button>
        </>
        }


        {testNotBegun && <>
          <div className="testScreenMessage">
            This test has not begun.  <br></br> <br></br>
          </div>

          <Button onClick={goBackToHomeScreenTestNotBegun}>Back to Home Screen</Button>
        </>
        }

        {successTest && <>
          <div className="testScreenMessage">
            Thank you. Your responses have been submitted.
            If the status of your test hasn't been updated immediately,
            there is likely a delay between the two systems.
            We recommend checking back in the next 1 hour.  <br></br> <br></br>
          </div>

          <Button onClick={goBackToHomeScreen}>Back to Home Screen</Button>
        </>
        }

        {showActiveTestList &&

          <div >
            <br></br> &nbsp;
            <Input sx={{ width: '100%', maxWidth: 300 }} type="text" val={search} placeholder="Filter results by Test ID..." onChange={(event) => {
              setSearch(event.target.value);
            }}> </Input> &nbsp; <ClearIcon style={{ cursor: 'pointer' }} onClick={() => {
              setSearch("")
            }} /> <br></br><br></br>

              <button className= 'joinRoom' style={{position:'absolute', right:'0', marginRight:'120px'}}  onClick={checkPaid}>Join Room</button>
                     
            <Chip label="All" variant="outlined" onClick={() => {
               setFilterWhich('A')
              }} /> &nbsp;
            <Chip label="Upcoming latest" variant="outlined"  onClick={() => {
               setFilterWhich('U')
              }}/> &nbsp;
            <Chip label="Active in 1 Hour or less" variant="outlined" onClick={() => {
               setFilterWhich('O')
              }} />
          
 <br></br> <br></br>
            <Divider />

            <div className='gridActiveTests' >
              <br></br> <br></br>
              {activeTests.filter((val) => {
                if (search == "") { return val }
                else if (val.testId.toLowerCase().includes(search.toLowerCase())) { return val }
              }).map((value, key) => {

                let date = new Date(value.testDate);

                return (
                  <div>
                    <React.Fragment >
                      <CardContent sx={{ bgcolor: 'ghostwhite', borderRadius: '10px', margin: '5px',  border: '1px solid rgb(0, 156, 0)' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Test Room
                        </Typography>
                        <Typography variant="h5" component="div">
                          {bull}{value.testName}
                        </Typography>
                     
                        <Typography variant="body2">
                        { msToMin(value.duration) } minutes  {value.cost} USD  <br></br>               
                          Opens: {date.toLocaleString()}
                      
                        </Typography>
                    
                      </CardContent>
                      <CardActions>
                      
                        <Tooltip title="Get Token">
                        <Fab size="small" color="secondary"
                          onClick={() => {
                            fetchTestId(value.testId, value.testDate, value.endTime, value.token, value.cost, value.foreignKey, value.testName);
                          }}>
                          <KeyIcon  />
                        </Fab>
                        </Tooltip> 
                    


                       
                      </CardActions>
                    </React.Fragment>

                  </div>

                );
              })}

            </div>
          </div>}
      </div>

    </>

  );
}

export default Welcome;

