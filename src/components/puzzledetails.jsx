import React, { Component } from "react";

class PuzzleDetails extends Component {
  render() {
    return (
      <React.Fragment>
        <div key="puzzleDetailsDiv" className="container m-3" align="center">
          Manhattan Distance Sum: {this.props.pgProps.manhattanDistanceSum}
        </div>
      </React.Fragment>
    );
  }
}

export default PuzzleDetails;
