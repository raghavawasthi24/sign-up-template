"use client";

import { useEffect, useState } from "react";
import StepperIndicator from "../stepper-indicator";
import { Personal } from "../personal";
import { Account } from "../business";
import { Preferences } from "../preserences";

function getStepContent(step: number, handleBack: () => void, handleNext: () => void) {
    switch (step) {
        case 1:
            return <Personal handleBack={handleBack} handleNext={handleNext}/>;
        case 2:
            return <Account handleBack={handleBack} handleNext={handleNext}/>;
        case 3:
            return <Preferences />;
        default:
            return "Unknown step";
    }
}

const HookMultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [erroredInputName, setErroredInputName] = useState("");
  // focus errored input on submit
  useEffect(() => {
    const erroredInputElement =
      document.getElementsByName(erroredInputName)?.[0];
    if (erroredInputElement instanceof HTMLInputElement) {
      erroredInputElement.focus();
      setErroredInputName("");
    }
  }, [erroredInputName]);


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
            {getStepContent(activeStep, handleBack, handleNext)}
      </div>
    </div>
  );
};

export default HookMultiStepForm;
