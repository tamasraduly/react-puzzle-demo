import React, { Component } from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class Manual extends Component {
  componentDidMount = () => {
    Modal.setAppElement("#puzzleAppDiv");
  };

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.onCloseModal}
        style={customStyles}
        contentLabel="Puzzle Demo Manual"
      >
        <div id="manualDiv">
          <h3>Puzzle Demo Manual</h3>
          Welcome to Tamas Raduly's Puzzle Demo! This is a simple puzzle that
          you can shuffle and solve and shuffle again to solve again. :)
          <h4>Sizes</h4>
          There are three sizes available
          <ul>
            <li>2 x 2</li>
            <li>3 x 3</li>
            <li>4 x 4</li>
          </ul>
          You can pick the size under <strong> Size </strong> menu.
          <h4>Moving Pieces</h4>
          The pieces can be moved using the arrow keys or by clicking on the
          puzzle piece. The pieces change color depending the state of the
          puzzle/piece.
          <ul>
            <li>Blue background means the puzzle is solved</li>
            <li>Yellow background means the puzzle is not solved</li>
            <li>White font means that the piece is in the right position</li>
            <li>Red font means that the piece is not in the right position</li>
            <li>
              Green font means that you should move that piece to get to the
              solution the fastest way. Please note that you need to request the
              solution first.
            </li>
          </ul>
          <h4>Getting Solution</h4>
          If you're stuck or just simply want to know what's the fastest way to
          solve the puzzle, you'll need to follow the steps below:
          <ul>
            <li>
              Go to <strong>Tools</strong> > <strong>Get Solution</strong>
            </li>
            <li>Hope that it will work :)</li>
          </ul>
          The solution is requested via a remote call. There's a limit on how
          much computation can be done at the other end, so there's a chance
          that request will not work on the 4x4 puzzle. <br />
          If you're lucky and got the steps, you'll see the list of arrows at
          the bottom of the screen. There are three ways to proceed to the
          solution:
          <ul>
            <li>
              Use the keyboard's arrow key that corresponds to the highlighted
              arrow
            </li>
            <li>
              Click on the <strong>Execute Next Step</strong> button
            </li>
            <li>Click on the puzzle piece with green font color</li>
          </ul>
          If you divert from the solution's path, then steps at the bottom of
          the page will disappear. But don't be sad if it happens, because you
          can request another solution. :)
          <h4>Reset</h4>
          You can reset the puzzle by going to <strong>Tools</strong> >
          <strong>Reset</strong>
          <h4>Shuffle</h4>
          You can shuffle the puzzle by going to <strong>Tools</strong> >
          <strong>Shuffle</strong>. It makes 100 random moves in the puzzle.
          <h4>Step Counter</h4>
          The navigation bar has a tiny step counter next to
          <strong>Steps:</strong>. It increases by one after each move
          (including shuffle calls). You can reset it by clicking on it.
          <h4>Manhattan Distance</h4>
          Under the puzzle, there's a number showing the total of the Manhattan
          distances of all pieces. Manhattan distance of a piece is the sum of
          the horizontal and vertical steps between its current position and the
          final target position on the puzzle grid.
        </div>
        <div className="container" align="right">
          <button
            key="manualCloseBtn"
            className="btn btn-primary"
            onClick={this.props.onCloseModal}
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }
}

export default Manual;
