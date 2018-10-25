import React, { Component } from "react";

class StepCounter extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <span
          className="badge badge-primary"
          datatoggle="tooltip"
          title="Click to reset!"
          onClick={this.props.onClick}
        >
          {this.props.steps}
        </span>
      </React.Fragment>
    );
  }
}

export default StepCounter;
