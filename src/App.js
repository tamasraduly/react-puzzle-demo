import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import PuzzleGrid from "./components/puzzlegrid";
import PuzzleGridProps from "./components/puzzlegridprops";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import SolutionContainer from "./components/solutioncontainer";
import PuzzleDetails from "./components/puzzledetails";
import Manual from "./components/manual";
import About from "./components/about";
import TechDetails from "./components/techdetails";
import StatusModal from "./components/statusmodal";

// This map helps resolve the coordinate delta for the emtpy piece based on a step
const stepToEmptyPieceCoordDeltaMap = {
  L: [0, 1],
  R: [0, -1],
  U: [1, 0],
  D: [-1, 0]
};

class App extends Component {
  state = {
    stepCount: 0,
    puzzleGridProps: {},
    solutionSteps: [],
    solutionMessage: "",
    didSolutionCallFail: false,
    nextStepIndex: 0,
    callInProgress: false,
    activeModal: ""
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
    if (this.state.callInProgress) {
      // Not moving while waiting for server response
      return;
    }
    //console.log(`moveEmptyPiece delta ${deltaX}, ${deltaY},`);
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

      const currentIndex = this.state.nextStepIndex;
      // Check if there's a solution available and compare this step with the current solution step
      if (stateCopy.solutionSteps && stateCopy.solutionSteps.length > 0) {
        const delta =
          stepToEmptyPieceCoordDeltaMap[stateCopy.solutionSteps[currentIndex]];
        // The move is in line with the current solution step, so update the solution state
        if (delta[0] === deltaX && delta[1] === deltaY) {
          if (currentIndex === stateCopy.solutionSteps.length - 1) {
            this.resetSolutionFields(stateCopy);
          } else {
            stateCopy.nextStepIndex++;
          }
        } else {
          // If this move  was different then the solution's step, then reset the solution, as it became useless.
          this.resetSolutionFields(stateCopy);
        }
      }

      stateCopy.puzzleGridProps.replacePieces(
        emptyPiece.x,
        emptyPiece.y,
        newX,
        newY
      );
      this.synchronizePieceWithNextStep(stateCopy);
      this.increaseSteps(stateCopy);
      this.setState(stateCopy);
    }
  };

  increaseSteps = stateCopy => {
    stateCopy.stepCount++;
  };

  handleSizeChange = (rows, cols) => {
    const stateCopy = { ...this.state };
    stateCopy.puzzleGridProps.size = { rows: rows, cols: cols };
    this.resetFields(stateCopy);
    this.setState(stateCopy);
    console.log("Changed size", this.state);
  };

  handlePieceClicked = piece => {
    console.log("apps handlePieceClicked", piece);
    if (piece.num === 0) {
      // Clicked the empty space
      console.log("empty clicked");
      return;
    }
    // find the  empty piece and call moveEmptyPiece if the delta suggests adjacent elements
    const emptyPiece = this.state.puzzleGridProps.findEmptyPiece();
    const deltaX = piece.x - emptyPiece.x;
    const deltaY = piece.y - emptyPiece.y;
    if (
      Math.abs(deltaX) <= 1 &&
      Math.abs(deltaY) <= 1 &&
      Math.abs(deltaX) + Math.abs(deltaY) === 1
    ) {
      this.moveEmptyPiece(deltaX, deltaY);
    }
  };

  handleStepCounterClick = () => {
    console.log("handleStepCounterClick");

    const stateCopy = { ...this.state };
    stateCopy.stepCount = 0;
    this.setState(stateCopy);
  };

  handleGetSolution = () => {
    const pieces = this.state.puzzleGridProps.piecePropsArr.map(ppaRow =>
      ppaRow.map(piece => piece.num)
    );
    //    console.log("Payload", payload);
    // Call Rest Endpoint
    const url = process.env.REACT_APP_API_BASE_URL + "/puzzle/solve";

    const stateCopy = { ...this.state };
    stateCopy.callInProgress = true;
    stateCopy.activeModal = "status";
    this.resetSolutionFields(stateCopy);
    this.setState(stateCopy);
    try {
      axios
        .post(url, {
          pieces
        })
        .then(res => this.solutionReceived(res.data))
        .catch(error => {
          console.log("Error on request", error);
          this.solutionCallFailed(error);
        });
    } catch (e) {
      this.solutionCallFailed(e);
    }
  };

  solutionReceived = responseData => {
    const stateCopy = { ...this.state };
    stateCopy.callInProgress = false;
    stateCopy.solutionSteps = responseData.steps;
    stateCopy.solutionMessage = responseData.message;
    stateCopy.didSolutionCallFail = false;
    stateCopy.nextStepIndex = 0;
    this.synchronizePieceWithNextStep(stateCopy);
    console.log(responseData);
    this.setState(stateCopy);
  };

  solutionCallFailed = error => {
    const stateCopy = { ...this.state };
    stateCopy.callInProgress = false;
    this.resetSolutionFields(stateCopy);
    console.log("Error response data", error.responseData);

    if (error.response) {
      stateCopy.solutionMessage = error.response.data.message;
    } else {
      stateCopy.solutionMessage = error.toString();
    }
    stateCopy.didSolutionCallFail = true;
    this.setState(stateCopy);
  };

  synchronizePieceWithNextStep = stateCopy => {
    if (!stateCopy.solutionSteps || stateCopy.solutionSteps.length === 0) {
      return;
    }
    const emptyPiece = stateCopy.puzzleGridProps.findEmptyPiece();
    const coordDeltaForEmptyPiece =
      stepToEmptyPieceCoordDeltaMap[
        [stateCopy.solutionSteps[stateCopy.nextStepIndex]]
      ];
    const i = emptyPiece.x + coordDeltaForEmptyPiece[0];
    const j = emptyPiece.y + coordDeltaForEmptyPiece[1];
    stateCopy.puzzleGridProps.suggestedNumToMove =
      stateCopy.puzzleGridProps.piecePropsArr[i][j].num;
  };

  handleShuffle = () => {
    console.log("handleShuffle");
    const stateCopy = { ...this.state };

    const { puzzleGridProps } = stateCopy;
    const shuffleCount = 100;
    for (let i = 0; i < shuffleCount; i++) {
      console.log("Shuffle, count: " + i);
      stateCopy.stepCount++;
      puzzleGridProps.moveRandomPiece();
    }
    this.resetSolutionFields(stateCopy);
    this.setState(stateCopy);
  };

  handleReset = () => {
    const stateCopy = { ...this.state };
    this.resetFields(stateCopy);
    this.setState(stateCopy);
  };

  resetFields = stateCopy => {
    const { rows, cols } = stateCopy.puzzleGridProps.size;
    this.resetSolutionFields(stateCopy);
    stateCopy.stepCount = 0;
    stateCopy.puzzleGridProps = new PuzzleGridProps({
      size: { rows: rows, cols: cols }
    });
  };

  resetSolutionFields = stateCopy => {
    stateCopy.solutionMessage = "";
    stateCopy.solutionSteps = [];
    stateCopy.puzzleGridProps.suggestedNumToMove = -1;
  };

  handleExecuteNext = () => {
    console.log("Executing Next Step");

    if (this.state.puzzleGridProps.isPuzzleSolved()) {
      console.log("Puzzle is already solved, not executing any steps");
      return false;
    }
    const delta =
      stepToEmptyPieceCoordDeltaMap[
        this.state.solutionSteps[this.state.nextStepIndex]
      ];
    this.moveEmptyPiece(delta[0], delta[1]);
    return true;
  };

  handleManual = () => {
    const stateCopy = { ...this.state };
    stateCopy.activeModal = "manual";
    this.setState(stateCopy);
  };

  handleAbout = () => {
    const stateCopy = { ...this.state };
    stateCopy.activeModal = "about";
    this.setState(stateCopy);
  };

  handleCloseModal = () => {
    const stateCopy = { ...this.state };
    stateCopy.activeModal = "";
    this.setState(stateCopy);
  };

  handleTechDetails = () => {
    const stateCopy = { ...this.state };
    stateCopy.activeModal = "techDetails";
    this.setState(stateCopy);
  };

  render() {
    console.log("App render ", this.state.puzzleGridProps.size);
    return (
      <div id="puzzleAppDiv" align="center">
        <StatusModal
          modalIsOpen={this.state.activeModal === "status"}
          onCloseModal={this.handleCloseModal}
          message={this.state.solutionMessage}
          showError={this.state.didSolutionCallFail}
          callInProgress={this.state.callInProgress}
        />
        <Manual
          modalIsOpen={this.state.activeModal === "manual"}
          onCloseModal={this.handleCloseModal}
        />
        <About
          modalIsOpen={this.state.activeModal === "about"}
          onCloseModal={this.handleCloseModal}
        />
        <TechDetails
          modalIsOpen={this.state.activeModal === "techDetails"}
          onCloseModal={this.handleCloseModal}
        />
        <Navbar
          onSizeChange={(rows, cols) => this.handleSizeChange(rows, cols)}
          stepCount={this.state.stepCount}
          onStepCounterClick={this.handleStepCounterClick}
          onGetSolution={this.handleGetSolution}
          onShuffle={this.handleShuffle}
          onReset={this.handleReset}
          solved={this.state.puzzleGridProps.isPuzzleSolved()}
          callInProgress={this.state.callInProgress}
          onManual={this.handleManual}
          onAbout={this.handleAbout}
          onTechDetails={this.handleTechDetails}
        />
        <PuzzleGrid
          pgProps={this.state.puzzleGridProps}
          onPieceClicked={this.handlePieceClicked}
          callInProgress={this.state.callInProgress}
        />
        <PuzzleDetails pgProps={this.state.puzzleGridProps} />
        <SolutionContainer
          steps={this.state.solutionSteps}
          nextStepIndex={this.state.nextStepIndex}
          onExecuteNext={this.handleExecuteNext}
        />
      </div>
    );
  }
}

export default App;
