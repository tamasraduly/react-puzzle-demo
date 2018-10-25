import React, { Component } from "react";

class PuzzlePiece extends Component {
  state = {};

  constructor() {
    super();
  }

  getBadgeClasses = props => {
    let badgeClasses = "badge m-1 puzzle-piece badge-";
    badgeClasses += props.piece.empty
      ? "secondary"
      : props.solved
        ? "primary"
        : "warning";
    return badgeClasses;
  };

  getFontStyle = props => {
    if (props.piece.empty) {
      return { visibility: "hidden" };
    }

    return props.piece.isItInSolvedPosition()
      ? { color: "white" }
      : { color: "red" };
  };

  render() {
    console.log("Piece rendered", this.props.solved);

    return (
      <React.Fragment>
        <span
          key={"Badge" + this.props.piece.num}
          className={this.getBadgeClasses(this.props)}
          onClick={() => this.props.onPieceClicked(this.props.piece)}
        >
          <span
            key={"Num" + this.props.piece.num}
            style={this.getFontStyle(this.props)}
          >
            {this.props.piece.num}
          </span>
        </span>
      </React.Fragment>
    );
  }
}

export default PuzzlePiece;
