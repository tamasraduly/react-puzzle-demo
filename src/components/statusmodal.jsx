import React, { Component } from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0"
  }
};

class StatusModal extends Component {
  componentDidMount = () => {
    Modal.setAppElement("#puzzleAppDiv");
  };

  getSolutionMessageDivClasses = showError => {
    return "alert-" + (showError ? "warning" : "success");
  };

  render() {
    const {
      message,
      showError,
      callInProgress,
      modalIsOpen,
      onCloseModal
    } = this.props;
    const msg = callInProgress ? "Please wait..." : message;
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Puzzle Demo Solution Status"
      >
        <div id="statusModalDiv">
          <nav
            className="navbar navbar-expand-sm"
            style={{ backgroundColor: "buttonface" }}
          >
            Get Solution Status
          </nav>
          <h3
            key="solutionMessageDiv"
            className={this.getSolutionMessageDivClasses(showError)}
            style={{ padding: "10px" }}
          >
            {msg}
          </h3>
          <div align="right">
            <button
              key="aboutCloseBtn"
              className="btn btn-primary m-2"
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

export default StatusModal;
