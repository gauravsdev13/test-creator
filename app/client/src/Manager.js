import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Axios from 'axios'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import { green } from '@mui/material/colors';
import Input from '@mui/material/Input';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import VerticalStepper from './VerticalStepper';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 270,
  height: 150,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,

  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 10,

  },
  '& .MuiSvgIcon-root': {
    fontSize: 24,
    color: 'black'
  },
});

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

const Manager = (props) => {

  const [open, setOpen] = React.useState(false);

  const [buttonText, setButtonText] = useState("Add");
  const changeText = (text) => setButtonText(text);
  const [testIdNotification, setTestIdNotification] = useState("");
  const [getQuestionForTest, setGetQuestionForTest] = useState([]);
  const [showMinQuestionMessage, setShowMinQuestionMessage] = useState(false);
  const [showConfirmLaunchMessage, setShowConfirmLaunchMessage] = useState(true);
  const [submitEnable, setSubmitEnable] = useState(false);

  const [timeHours, setTimeHours] = useState(0);
  const [timeMinutes, setTimeMinutes] = useState(0);

  const [users, setUsers] = useState([{ username: '' }]);


  const [duration, setDuration] = useState(0);


  const [questionList, setQuestionList] = useState([{ question: '', answerOne: '', answerTwo: '', answerThree: '', answerFour: '' }]);
  const [question, setQuestion] = useState("");
  const [answerOne, setanswerOne] = useState("");
  const [answerTwo, setanswerTwo] = useState("");
  const [answerThree, setanswerThree] = useState("");
  const [answerFour, setanswerFour] = useState("");

  const [showQuestionAdder, setShowQuestionAdder] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [participantList, setParticipantList] = useState([]);

  const [showTestCreationButton, setShowTestCreationButton] = useState(false);

  const foreignKey = localStorage.getItem('status');


  const [getTestDuration, setGetTestDuration] = useState("");
  const [getTestDate, setGetTestDate] = useState("");

  const [success, setSuccess] = React.useState(false);

  const handleOpen = () => { if (foreignKey) setOpen(true) };
  const handleClose = () => { setOpen(false); setShowMinQuestionMessage(false); setShowConfirmLaunchMessage(true); setSubmitEnable(false)}

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const timer = React.useRef();

  const [testId, setTestId] = useState("");

  const [search, setSearch] = useState("");


  const [type, setType] = useState('Multiple choice');

  const [testList, setTestList] = useState([]);

  const [testListOpen, setTestListOpen] = useState([]);

  const [number, setQuestionNumber] = useState();
  const [showTestList, setShowTestList] = useState(true);
  const [showAddNewTest, setshowAddNewTest] = useState(!showTestList);
  const [showAddQuestions, setShowAddQuestions] = useState(false);

  const [testSelectedName, settestSelectedName] = useState("");

  const [testDate, setTestDate] = useState();
  const [testDateParsed, setTestDateParsed] = useState(new Date());

  const [endTime, setEndTime] = useState(testDateParsed);


  const [answer, setAnswer] = useState(
    { answerOne: false, answerTwo: false, answerThree: false, answerFour: false }
  );

  const answerJson = JSON.stringify(answer);


  const deleteQuestion = (QuestionId) => {
    Axios.delete(`https://trellisserver.herokuapp.com/deletequestion/${QuestionId}`).then((response) => {
      setQuestionList(
        questionList.filter((val) => {
          return val.QuestionId != QuestionId;
        })
      );
    });
  };

  useEffect(() => {
    Axios.post("https://trellisserver.herokuapp.com/getQuestionsSizeForTest", 
    { testId: testIdNotification }).then((response) => {
      setGetQuestionForTest(response.data);
    });
    }, [getQuestionForTest], [testIdNotification]); 

  useEffect(() => {
    Axios.post("https://trellisserver.herokuapp.com/getusers").then((response) => {
      setUsers(response.data);
    });
  }, [users]);

  const deleteTest = (testId) => {
    Axios.delete(`https://trellisserver.herokuapp.com/deletetest/${testId}`).then((response) => {
      setTestList(
        testList.filter((val) => {
          return val.testId != testId;
        })
      );
    });
  };


  const secToMin = (mSec) => {

    let min = mSec / (1000 * 60);
    return min;

  };


  useEffect(() => {
    Axios.post("https://trellisserver.herokuapp.com/readopentestlist",
      { foreignKey: foreignKey }).then((response) => {
        setTestListOpen(response.data);
      });

  }, [testListOpen], foreignKey);


  const addQuestions = () => {
    if (questionList.length < 101) {
      Axios.post("https://trellisserver.herokuapp.com/addquestions", {

        type: type,
        number: number,
        testId: testId,
        question: question,
        answerOne: answerOne,
        answerTwo: answerTwo,
        answerThree: answerThree,
        answerFour: answerFour,
        answerJson: answerJson

      })
    }
  };

  useEffect(() => {
    Axios.post("https://trellisserver.herokuapp.com/readquestions", { testId: testId }).then((response) => {
      setQuestionList(response.data);

    });
  }, [questionList], testId);

  const changetestId = () => {
    props.testSelectedChild(testId);
  }


  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    setShowTestList (!showAddNewTest);
  }, [showAddNewTest]);


  function calculateDuration() {

    setEndTime(new Date(testDateParsed.getTime() + ((timeHours * 60 * 60000) + timeMinutes * 60000)));
    setDuration(((60 * 60 * timeHours) + (60 * timeMinutes)) * 1000);
    setShowTestCreationButton(!showTestCreationButton);
    setTestDateParsed(new Date(testDate));
  }



  const notifyTestLaunch = () => toast.info("Test active");
 

  const launchTest = () => {
    
    if(getQuestionForTest.length > 4) {
      Axios.put("https://trellisserver.herokuapp.com/launchtest", {
        testIdNotification:  testIdNotification,     
        testStatus: 'active'      
      }).then(() => {
        console.log("success")
      });
      handleClose();
      notifyTestLaunch()}

      else {
        setShowMinQuestionMessage(!showMinQuestionMessage);
        setShowConfirmLaunchMessage(!showConfirmLaunchMessage);
      
      }     
    };  

  return (
    <div className="header-manager">

       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       
        <Box sx={style}>
        { showConfirmLaunchMessage && <>
        <input  type="checkbox"
              onChange={(e) => setSubmitEnable(!submitEnable)}
            /> &nbsp; Confirm test launch
      <br></br> <br></br>
      { submitEnable && <>
      <Button variant= "contained" 
        onClick={() => launchTest }>Go</Button>
        </>
      }  </> }


     { showMinQuestionMessage && <>
       To launch, test size should exceed 5 questions per test.
      </>}

      </Box> 
     
    </Modal>

          <div className="header-results">
       

            <div className="control">
              <h3>Your tests </h3>
              Create, view, and manage your tests.
              <div style={{ fontWeight: '200', fontSize: "10px", fontFamily: "monospace", padding: '5px' }}>
                {testListOpen.length} tests

                <Tooltip title="Create new">
                  <Button style={{ float: "right", marginLeft: '5px' }} size="medium" color="secondary" aria-label="add"
                    onClick={() => {
                      setShowTestList(!showTestList);
                      setshowAddNewTest(!showAddNewTest);
                      setShowAddQuestions(false)

                    }}>
                    <AddIcon />
                  </Button>
                </Tooltip>

                <Input style={{ float: "right" }} placeholder="Filter results by Test name..."> </Input>
               <br></br>

              </div>
            </div>
            <div style={{ width: '90%', color: 'grey', display: 'flex', flexWrap: 'wrap', justifyContent: 'left' }}>
                <div style={{ width: '20%', fontWeight: '500', color: 'darkgray' }}>Test name</div>
                <div style={{ width: '20%', fontWeight: '500', color: 'darkgray' }}>Cost</div>
                <div style={{ width: '20%', fontWeight: '500', color: 'darkgray' }}>Duration</div>
                <div style={{ width: '25%', fontWeight: '500', color: 'darkgray' }}>Start time</div>
                <div style={{ width: '15%', fontWeight: '500', color: 'darkgray' }}>Actions</div>
              </div>


            <div style={{ height: '326px', width: '90%', overflowY:'scroll', padding:'5px'}}>
            
              { showTestList && <div>

                {testListOpen.filter((val) => {
                  if (search == "") { return val }
                  else if (val.testName.toLowerCase().includes(search.toLowerCase())) { return val }
                }).map((val, key) => {
                  return (
                    <>
                <div style={{ padding: '5px',border:'1px solid green', borderRadius:'5px', margin:'5px', backgroundColor:'ghostwhite', color:'black', height:'3.3rem', width: '99%',  display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ width: '20%', fontWeight: '500' }}>{val.testName}</div>
                <div style={{ width: '20%', fontWeight: '500' }}>{val.cost}$</div>
                <div style={{ width: '20%', fontWeight: '500' }}>{val.duration/(1000*60)} minutes</div>
                <div style={{ width: '25%', fontWeight: '500'}}>{val.testDate}</div>
                <div style={{ width: '15%', fontWeight: '500'}}>
                <IconButton edge="end" aria-label="edit" onClick={() => { setShowTestList(!showTestList); setTestId(val.testId); settestSelectedName(val.testName); setGetTestDate(val.testDate); setGetTestDuration(val.duration); setShowAddQuestions(true) }}>
                 <BorderColorIcon/>
                </IconButton> &nbsp;
                <IconButton>
                  < OpenInNewIcon 
                        onClick={() => 
                                    { setTestIdNotification(val.testId); handleOpen() }} />
                </IconButton>
                <button style={{ border: "none", backgroundColor: "none", fontStyle: "Arial, Helvetica, sans-serif" }} onClick={() => {
                            deleteTest(val.testId);
                          }}>Delete </button> 
                </div>
              </div>
                    </>
                  );
                })}
              </div>
              }

              { showAddNewTest && <div style={{ height: '320px', width: '100%', color: 'grey', padding: '10px'}}>

                <VerticalStepper foreignKey={foreignKey} />

              </div>
              }

                {showAddQuestions && <>
                      <div style={{ fontWeight: "500", fontSize: "24px" }}> &nbsp;{testSelectedName}
                        <div style={{ right: "0", fontSize: "16px" }}> &nbsp;
                          <span style={{ fontWeight: "500" }}> Begins: </span> {getTestDate} &nbsp;
                          <span style={{ fontWeight: "500" }}> Duration: </span>{secToMin(getTestDuration)} minutes &nbsp;
                          <span style={{ fontWeight: "500" }}> Size: </span>{questionList.length} questions &nbsp;</div></div>
                       <br></br>
                      <Divider />
                      {questionList.map((val, key) => (
                      <div style = {{padding: '5px',border:'1px solid green', borderRadius:'5px', margin:'5px', backgroundColor:'ghostwhite', color:'black', height:'auto', maxWidth: '99%', overflowX: 'scroll',overflowY: 'hidden'}}>
                      
                       <span style={{ fontWeight: "500" }}> Question:  </span> {val.question}  <br></br>
                          1. {val.answerOne} &nbsp;&nbsp; 2. {val.answerTwo} &nbsp;&nbsp;
                          3. {val.answerThree} &nbsp;&nbsp; 4.{val.answerFour} <br></br>
                          {val.answerJson}
                          <IconButton
                            style={{ float:'right' }}
                            onClick={() => { deleteQuestion(val.QuestionId); }}>
                            <Tooltip title="Delete">
                              <DeleteIcon />
                            </Tooltip>
                          </IconButton> </div>
                      ))}

                      <br></br>
                <Tooltip title="Add new">
                     <Fab  style={{ cursor: "pointer" }} size="medium" color="secondary" aria-label="add" 
                        onClick={() => { setShowQuestionAdder(!showQuestionAdder)
                      }}>
                  <AddIcon />
                </Fab></Tooltip><br></br> <br></br>

                      {showQuestionAdder && <>

                        <div style={{ fontSize: "10px", fontWeight: "600" }}>Please note that, the question limit is set to 100 questions per test. </div>
                        <br></br>
                        <form>
                          <label>Question type</label> <br></br>
                          <select
                            required
                            id="option"
                            value={type}
                            onChange={(e) => { setType(e.target.value); setShowOptions(!showOptions) }}
                          >
                            <option value="Multiple choice">Multiple choice</option>
                           
                          </select> <br></br><br></br>

                          <label>Question number</label> <br></br>
                          <input placeholder="Question number" onChange={(e) => { setQuestionNumber(e.target.value) }} /> <br></br> <br></br>

                          <label>Question</label>
                          <textarea
                            required
                            placeholder="Question"
                            onChange={(e) => { setQuestion(e.target.value) }}
                          ></textarea>
                          <br></br> <br></br>
                          <div>
                            <label>Options (for multiple choice questions)</label> <br></br><br></br>
                            <textarea id="options" placeholder="Option 1" disabled={showOptions} onChange={(e) => { setanswerOne(e.target.value) }} /> <br></br>
                            <textarea id="options" placeholder="Option 2" disabled={showOptions} onChange={(e) => { setanswerTwo(e.target.value) }} /> <br></br>
                            <textarea id="options" placeholder="Option 3" disabled={showOptions} onChange={(e) => { setanswerThree(e.target.value) }} /> <br></br>
                            <textarea id="options" placeholder="Option 4" disabled={showOptions} onChange={(e) => { setanswerFour(e.target.value) }} /> <br></br>
                            <br></br>

                            <label>Answer: </label>
                            <br></br>


                            1 <input type="checkbox"
                              checked={answer.answerOne}
                              onChange={(e) => setAnswer({
                                answerOne: !answer.answerOne, answerTwo: false,
                                answerThree: false, answerFour: false
                              })}

                            />&nbsp;

                            2  <input type="checkbox"
                              checked={answer.answerTwo}
                              onChange={(e) => setAnswer({
                                answerOne: false, answerTwo: !answer.answerTwo,
                                answerThree: false, answerFour: false
                              })}
                            />&nbsp;

                            3 <input type="checkbox"
                              checked={answer.answerThree}
                              onChange={(e) => setAnswer({
                                answerOne: false, answerTwo: false, answerThree: !answer.answerThree,
                                answerFour: false
                              })}
                            /> &nbsp;

                            4  <input type="checkbox"
                              checked={answer.answerFour}
                              onChange={(e) => setAnswer({
                                answerOne: false, answerTwo: false, answerThree: false, answerFour: !answer.answerFour
                              })}
                            />&nbsp;
                          </div>
                          <br></br>

                          <Button variant="contained" onClick={() => { changeText("Add another question"); addQuestions() }} >
                            {buttonText}
                          </Button>
                          &nbsp; &nbsp;
                          <Button variant="outlined" onClick={() => { setShowTestList(true); setShowAddQuestions(false); changeText("Add"); setShowQuestionAdder(false) }} >
                            Save and Close
                          </Button>
                        </form>
                      </>
                      }
                    </>
                    }

            </div>
            <ToastContainer position="top-center" hideProgressBar={true}/>
          </div>
        
    </div>
  );
}

export default Manager;