class PuzzlePieceProps {
  constructor(props) {
    //console.log("PuzzlePieceProps", props);
    this.x = props.x;
    this.y = props.y;
    this.size = props.gridSize;
    this.num = this.getNumForPos();
    this.empty = this.num === 0;
  }

  getNumForPos = () => {
    return (
      (this.x * this.size.rows + (this.y + 1)) %
      (this.size.rows * this.size.cols)
    );
  };

  isItInSolvedPosition = () => {
    let numToCheck = this.getNumForPos();
    //console.log("isItInSolvedPosition", numToCheck, this.num);
    return numToCheck === this.num;
  };
}

export default PuzzlePieceProps;
