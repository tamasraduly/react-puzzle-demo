import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "mdbreact";
import StepCounter from "./stepcounter";

class Navbar extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <nav
          className="navbar navbar-expand-sm"
          style={{ backgroundColor: "buttonface" }}
        >
          <span className="navbar-brand">Puzzle Demo</span>
          <span className="navbar-text" style={{ marginLeft: 15 }}>
            <Dropdown>
              <DropdownToggle caret color="default">
                Size
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => this.props.onSizeChange(2, 2)}
                  href="#"
                >
                  2 x 2
                </DropdownItem>
                <DropdownItem
                  href="#"
                  onClick={() => this.props.onSizeChange(3, 3)}
                >
                  3 x 3
                </DropdownItem>
                <DropdownItem
                  href="#"
                  onClick={() => this.props.onSizeChange(4, 4)}
                >
                  4 x 4
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </span>
          <span className="navbar-text" style={{ marginLeft: 15 }}>
            <Dropdown>
              <DropdownToggle caret color="default">
                Tools
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.props.onSolve()} href="#">
                  Solve
                </DropdownItem>
                <DropdownItem href="#" onClick={() => this.props.onShuffle()}>
                  Shuffle
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </span>
          <span className="navbar-text" style={{ marginLeft: 15 }}>
            Steps:{" "}
            <StepCounter
              steps={this.props.steps}
              onClick={this.props.onStepCounterClick}
            />
          </span>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
