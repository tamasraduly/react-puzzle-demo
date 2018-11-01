import React, { Component } from "react";
const stepToImgNamePostfixMapper = {
  L: "left",
  R: "right",
  U: "up",
  D: "down"
};

class SolutionStepContainer extends Component {
  getSolutionStepImageUrl = step => {
    return "/assets/icons/arrow_" + stepToImgNamePostfixMapper[step] + ".png";
  };

  getSolutionStepImageClass = active => {
    return "step-img" + (active ? "-active" : "");
  };

  render() {
    //console.log("SolutionStepContainer render, props", this.props);
    const { step, active } = this.props;
    return (
      <React.Fragment>
        <span key="solutionStepContainer" className="container">
          <img
            className={this.getSolutionStepImageClass(active)}
            src={this.getSolutionStepImageUrl(step)}
            alt={stepToImgNamePostfixMapper[step]}
          />
        </span>
      </React.Fragment>
    );
  }
}

export default SolutionStepContainer;
