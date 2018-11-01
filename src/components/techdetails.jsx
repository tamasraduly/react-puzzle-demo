import React, { Component } from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0",
    transform: "translate(-50%, -50%)"
  }
};

class TechDetails extends Component {
  componentDidMount = () => {
    Modal.setAppElement("#puzzleAppDiv");
  };

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.onCloseModal}
        style={customStyles}
        contentLabel="Puzzle Demo Technical Details"
      >
        <div id="techDetailsDiv" className="modalDialogContainer">
          <nav
            className="navbar navbar-expand-sm"
            style={{ backgroundColor: "buttonface" }}
          >
            Technical Details
          </nav>
          <div className="dialogContent">
            <h4>Algorithm</h4>
            The server side uses A* algorithm to get the best result. The client
            application makes a REST RPC call to an AWS lambda function where
            the computation happens. It's a NodeJS function, with limited
            resources to keep me in the free tier. Therefore I've added some
            limits on the number of iteration the algorithm can have. If it
            exceeds the limit, then it will return an error message which will
            be displayed on the UI.
            <h4>Technology Stack</h4>
            <ul>
              <li>Node JS</li>
              <li>React</li>
              <li>Mocha</li>
              <li>Chai</li>
              <li>Express</li>
              <li>Amazon AWS lambda</li>
              <li>etc</li>
            </ul>
            <div className="container" align="right">
              <button
                key="techDetailsCloseBtn"
                className="btn btn-primary dialog-btn"
                onClick={this.props.onCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default TechDetails;
