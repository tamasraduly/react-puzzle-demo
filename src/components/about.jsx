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

class About extends Component {
  componentDidMount = () => {
    Modal.setAppElement("#puzzleAppDiv");
  };

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.onCloseModal}
        style={customStyles}
        contentLabel="Puzzle Demo About"
      >
        <div id="aboutDiv">
          <h1>About</h1>A "bout" can have the following meanings:
          <ul>
            <li>
              a short period of intense activity of a specified kind.
              <br />
              synonyms: attack, fit, spasm, paroxysm, convulsion, eruption,
              outburst
            </li>
            <li>
              a curve in the side of a violin, guitar, or other musical
              instrument.
            </li>
          </ul>
          <img
            style={{
              height: "45px"
            }}
            src="/assets/icons/Smiling_Face_Emoji.png"
            alt=":)"
          />
          <div className="container" align="right">
            <button
              key="aboutCloseBtn"
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

export default About;
