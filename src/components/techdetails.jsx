import React, { Component } from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "auto",
    marginRight: "-50%",
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
        <div id="techDetailsDiv">
          <h1>Technical Details</h1>
          <h3>Algorithm</h3>
          The server side uses A* algorithm to get the best result. The client
          application makes a REST RPC call to AWS lambda where the computation
          happens. It's a NodeJS function, with limited resources to keep me in
          the free zone. Therefore I've added some limits on the number of
          iteration the algorithm can have. If it exceeds the limit, then it
          will return an error message which will be displayed on the UI.
          <h3>Technology Stack</h3>
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
              className="btn btn-primary"
              onClick={this.props.onCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default TechDetails;
