import React, { Component } from "react";
import PuzzlePiece from "./puzzlepiece";
import ArrowKeysReact from "arrow-keys-react";

class PuzzleGrid extends Component {
  // getNumForPlace = (x, y, rows, cols) => {
  //   return (x * rows + (y + 1)) % (rows * cols);
  // };
  constructor(props, args) {
    //    console.log("pg const args", props);

    super(props);
    ArrowKeysReact.config({
      left: () => {
        props.pgProps.handleMoveEmptyPiece(0, 1);
      },
      right: () => {
        props.pgProps.handleMoveEmptyPiece(0, -1);
      },
      up: () => {
        props.pgProps.handleMoveEmptyPiece(1, 0);
      },
      down: () => {
        props.pgProps.handleMoveEmptyPiece(-1, 0);
      }
    });
  }

  componentWillUnmount = () => {
    //console.log("PG will unmount", this.props);
  };

  componentDidMount = () => {
    //console.log("PG  mounted");
    this.puzzleGridDiv.focus();
  };

  componentDidUpdate = () => {
    //    console.log("PG  update");
    this.puzzleGridDiv.focus();
  };

  render() {
    const { pgProps } = this.props;
    const solved = pgProps.isPuzzleSolved();
    //    console.log("PG render, pgProps.size:", pgProps.size);
    return (
      <React.Fragment>
        <div
          key="puzzleContainerDiv"
          ref={div => (this.puzzleGridDiv = div)}
          className="container m-5"
          style={{ outlineWidth: 0 }}
          {...ArrowKeysReact.events}
          tabIndex="1"
        >
          {pgProps.piecePropsArr.map(row => (
            <div
              key={"row" + row[0].num}
              style={{ outlineWidth: 0, margin: "auto", width: "80%" }}
            >
              {row.map(piece => (
                <PuzzlePiece
                  key={"puzzlePiece" + piece.num}
                  piece={piece}
                  solved={solved}
                  onPieceClicked={this.props.onPieceClicked}
                />
              ))}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default PuzzleGrid;
