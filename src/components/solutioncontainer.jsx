import React, { Component } from "react";
import SolutionStep from "./solutionstep";

class SolutionContainer extends Component {
  getExecuteSolutionDivStyle = steps => {
    return steps && steps.length ? { display: "block" } : { display: "none" };
  };

  render() {
    const { steps, nextStepIndex } = this.props;
    const remainingStepsCount = steps.length - nextStepIndex;
    //console.log("Render Solution Container, nextStepIndex: ", nextStepIndex);
    return (
      <React.Fragment>
        <div key="solutionContainerDiv" className="container m-3">
          {steps.map((step, stepIndex) => (
            <SolutionStep
              key={"step" + stepIndex}
              step={step}
              stepIndex={stepIndex}
              nextStepIndex={nextStepIndex}
              active={stepIndex === nextStepIndex}
            />
          ))}
        </div>
        <div
          align="center"
          className="container m-3"
          style={this.getExecuteSolutionDivStyle(steps)}
          key="executeSolutionDiv"
        >
          <button
            onClick={this.props.onExecuteNext}
            className="btn btn-large btn-primary m-1"
          >
            Execute Next Step
          </button>
          <br />
          {remainingStepsCount} step
          {remainingStepsCount > 1 ? "s" : ""} remaining.
        </div>
      </React.Fragment>
    );
  }
}

export default SolutionContainer;
