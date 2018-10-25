import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import PuzzleGrid from "./components/puzzlegrid";
import PuzzleGridProps from "./components/puzzlegridprops";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

class App extends Component {
  state = {
    steps: 0,
    puzzleGridProps: {}
  };

  constructor() {
    super();
    console.log("process.env", process.env);
    console.log(
      "process.env.REACT_APP_API_BASE_URL: ",
      process.env.REACT_APP_API_BASE_URL
    );
    let moveEmptyPieceFunc = this.moveEmptyPiece;
    this.state.puzzleGridProps = new PuzzleGridProps({
      size: { rows: 3, cols: 3 },
      handleMoveEmptyPiece: moveEmptyPieceFunc
    });
  }

  moveEmptyPiece = (deltaX, deltaY) => {
    const { piecePropsArr } = this.state.puzzleGridProps;
    const emptyPiece = this.state.puzzleGridProps.findEmptyPiece();
    const newX = emptyPiece.x + deltaX;
    const newY = emptyPiece.y + deltaY;
    if (
      newX >= 0 &&
      newX < piecePropsArr.length &&
      newY >= 0 &&
      newY < piecePropsArr[0].length
    ) {
      const stateCopy = { ...this.state };
      stateCopy.puzzleGridProps.replacePieces(
        emptyPiece.x,
        emptyPiece.y,
        newX,
        newY
      );
      this.increaseSteps(stateCopy);
      this.setState(stateCopy);
    }
  };

  increaseSteps = stateCopy => {
    stateCopy.steps++;
  };

  handleSizeChange = (rows, cols) => {
    this.setState({
      steps: 0,
      puzzleGridProps: new PuzzleGridProps({
        size: { rows: rows, cols: cols }
      })
    });
    console.log("Changed size", this.state);
  };

  handlePieceClicked = piece => {
    console.log("apps handlePieceClicked", piece);
    if (piece.num === 0) {
      // Clicked the empty space
      console.log("empty clicked");
      return;
    }
    const stateCopy = { ...this.state };
    const puzzleGridProps = { ...this.state.puzzleGridProps };
    //const emptyPiece = piecePropsArr[0].filter(p => p.empty);
    //console.log("stateCopy.puzzleGridProps", stateCopy.puzzleGridProps);

    const emptyPiece = puzzleGridProps.findEmptyPiece();
    //console.log("emptyPiece", emptyPiece);
    // See if the clicked piece is neighbour with the empty piece
    console.log(emptyPiece.x, emptyPiece.y, piece.x, piece.y);
    if (
      (piece.x === emptyPiece.x && Math.abs(piece.y - emptyPiece.y) === 1) ||
      (piece.y === emptyPiece.y && Math.abs(piece.x - emptyPiece.x) === 1)
    ) {
      stateCopy.puzzleGridProps.replacePieces(
        emptyPiece.x,
        emptyPiece.y,
        piece.x,
        piece.y
      );
      this.increaseSteps(stateCopy);
    }
    stateCopy.puzzleGridProps = puzzleGridProps;
    this.setState(stateCopy);
  };

  handleStepCounterClick = () => {
    console.log("handleStepCounterClick");

    const stateCopy = { ...this.state };
    stateCopy.steps = 0;
    this.setState(stateCopy);
  };

  handleSolve = () => {
    const payload = {
      pieces: this.state.puzzleGridProps.piecePropsArr.map(ppaRow =>
        ppaRow.map(piece => piece.num)
      )
    };
    console.log("Payload", payload);
    // Call Rest Endpoint
    // const url = process.env.REACT_APP_API_BASE_URL + "/puzzle/solve";

    // axios.post(url, { pieces: { payload } }).then(res => console.log(res.data));
  };

  handleShuffle = () => {
    console.log("handleShuffle");
    const stateCopy = { ...this.state };

    const { puzzleGridProps } = stateCopy;
    const shuffleCount = 100;
    for (let i = 0; i < shuffleCount; i++) {
      console.log("Shuffle, count: " + i);
      stateCopy.steps++;
      puzzleGridProps.moveRandomPiece();
    }

    this.setState(stateCopy);
  };

  render() {
    console.log("App render ", this.state.puzzleGridProps.size);
    return (
      <div>
        <Navbar
          onSizeChange={(rows, cols) => this.handleSizeChange(rows, cols)}
          steps={this.state.steps}
          onStepCounterClick={this.handleStepCounterClick}
          onSolve={this.handleSolve}
          onShuffle={this.handleShuffle}
        />
        <PuzzleGrid
          pgProps={this.state.puzzleGridProps}
          onPieceClicked={this.handlePieceClicked}
        />
      </div>
    );
  }
}

export default App;
