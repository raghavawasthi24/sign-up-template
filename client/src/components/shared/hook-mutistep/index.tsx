"use client";

import { useState } from "react";
import StepperIndicator from "../stepper-indicator";
import { Personal } from "../personal";
import { Account } from "../business";
import { Preferences } from "../preserences";

function getStepContent(step: number, handleBack: () => void, handleNext: () => void, formValues: any, setFormValues: any) {
    switch (step) {
        case 1:
            return <Personal handleNext={handleNext} formValues={formValues} setFormValues= {setFormValues}/>;
        case 2:
            return <Account handleBack={handleBack} handleNext={handleNext} formValues={formValues} setFormValues= {setFormValues}/>;
        case 3:
            return <Preferences handleBack={handleBack} handleNext={handleNext} formValues={formValues} setFormValues= {setFormValues}/>;
        default:
            return "Unknown step";
    }
}

const HookMultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formValues, setFormValues] = useState({});

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-1/3">
        <StepperIndicator activeStep={activeStep} />
            {getStepContent(activeStep, handleBack, handleNext, formValues, setFormValues)}
      </div>
    </div>
  );
};

export default HookMultiStepForm;
