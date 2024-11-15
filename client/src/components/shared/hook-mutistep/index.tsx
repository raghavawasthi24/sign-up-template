"use client";

import { useState } from "react";
import StepperIndicator from "../stepper-indicator";
import { Personal } from "../personal";
import { Account } from "../business";
import { Preferences } from "../preserences";

export interface FormValues {
    [key: string]: string | Date;
}

function getStepContent(
    step: number,
    handleBack: () => void,
    handleNext: () => void,
    formValues: FormValues,
    setFormValues: React.Dispatch<React.SetStateAction<FormValues>>
): JSX.Element | string {
    switch (step) {
        case 1:
            return <Personal handleNext={handleNext} formValues={formValues} setFormValues={setFormValues} />;
        case 2:
            return <Account handleBack={handleBack} handleNext={handleNext} formValues={formValues} setFormValues={setFormValues} />;
        case 3:
            return <Preferences handleBack={handleBack} handleNext={handleNext} formValues={formValues} setFormValues={setFormValues} />;
        default:
            return "Unknown step";
    }
}

const HookMultiStepForm: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(1);
    const [formValues, setFormValues] = useState<FormValues>({});

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

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
