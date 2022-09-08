import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import { TextField } from '@material-ui/core';
import { nanoid } from "nanoid";
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const steps = [
  {
    label: 'Enter test name',
    
  },
  {
    label: 'Duration in minutes',
 
  },
  {
    label: 'Start time',

  },
  {
    label: 'Cost in USD (Zero by default)',

  },
];

export default function VerticalStepper(props) {
  const foreignKey= props.foreignKey;
  const [activeStep, setActiveStep] = React.useState(0);
  const [testName, setTestName] = React.useState();
  const [duration, setDuration] = React.useState();
  const [cost, setCost] = React.useState('NA');
  const [testDate, setTestDate] = useState();
  const [testDateParsed, setTestDateParsed] = useState(new Date());
  const [endTime, setEndTime] = useState(testDateParsed);

  const [hideTimeInput, setHideTimeInput] = React.useState(true);
  const [showTimeInput, setShowTimeInput] = React.useState(false);


useEffect(() => {
  if(activeStep == 3) {calculateDuration()}
  if(activeStep == 2) {setHideTimeInput(false); setShowTimeInput(true)}
  else {setHideTimeInput(true); setShowTimeInput(false)}
  
 }, [activeStep]);

 const notifyTestCreated = () => toast.info("New Test created");

 function calculateDuration() {
  setDuration(((60 * duration)) * 1000);
  setEndTime(new Date(testDateParsed.getTime() + ( duration * 60000)));
  setTestDateParsed(new Date(testDate));
} 

 const createTest = () => {

  Axios.post("https://trellisserver.herokuapp.com/createtest", {
    testId: nanoid(),
    testName: testName,
    duration: duration,
    testDate: testDate,
    foreignKey: foreignKey,
    endTime: endTime,
    cost: cost,
    token: nanoid(),
    
  
  }).then((response) => {
    console.log(response);
    setCost('NA');
  });
  notifyTestCreated();

};

  function setTestDetails (number, val) {
    switch (number) {
      case 0:
        setTestName(val);
        break;
        case 1:
          setDuration(val);
          break;
          case 2:
            setTestDate(val);
            break;
            case 3:
            setCost(val);
            break;
      }
  }


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
 
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    createTest();
  };

  return (
    <>
    <ToastContainer position="top-center" hideProgressBar={true} />

    <Box sx={{ maxWidth: 400 }}>
   
      <Stepper activeStep={activeStep} orientation="vertical">
    
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
             
            >
              {step.label}
            </StepLabel>
            <StepContent>
              { hideTimeInput && <>
              <Input required onChange={(event) => {
              setTestDetails(activeStep, event.target.value)}}></Input> 
              </>
              }

             { showTimeInput && <>
              <TextField required
                          onChange={(event) => {
                            setTestDetails(activeStep, event.target.value);
                          }}
                          id="datetime-local"
          
                          type="datetime-local"
                          placeholder="2022-01-24T10:30"
                          sx={{ width: 250 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
              </>
              }
              
              <br></br> <br></br>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                  
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>You are almost finished.</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Create test
          </Button>
        </Paper>
      )}
    </Box>
    </>
  );
}
