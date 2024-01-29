import React, { useState } from "react";
import { Paper, Typography, Button, MobileStepper } from "@material-ui/core";

const EventScoreCard = ({
  player,
  groupTeeTime,
  holes,
  scores,
  onNext,
  onBack,
  onSubmit,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    onNext();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    onBack();
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const renderScoreCard = () => {
    const currentHole = holes[activeStep];

    return (
      <div>
        <Typography variant="h6">{`Tee Time: ${groupTeeTime}`}</Typography>
        <Typography variant="h6">{`Player: ${player.name}`}</Typography>
        <Typography>{`Hole: ${currentHole.holeNumber}`}</Typography>
        <Typography>{`Length: ${currentHole.yellow} yards`}</Typography>
        <Typography>{`Par: ${currentHole.par}`}</Typography>
        <Typography>{`Stroke: ${currentHole.stroke}`}</Typography>
        <Typography>{`Score: ${scores[activeStep]?.score || ""}`}</Typography>
        <Typography>{`Net: ${scores[activeStep]?.net || ""}`}</Typography>
        {currentHole.points && (
          <Typography>{`Points: ${
            scores[activeStep]?.points || ""
          }`}</Typography>
        )}
      </div>
    );
  };

  return (
    <Paper>
      {renderScoreCard()}
      <MobileStepper
        variant="dots"
        steps={holes.length}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === holes.length - 1}
          >
            Next
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
        }
      />
      {activeStep === holes.length - 1 && (
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Submit
        </Button>
      )}
    </Paper>
  );
};

export default EventScoreCard;
