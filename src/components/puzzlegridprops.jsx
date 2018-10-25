import PuzzlePieceProps from "./puzzlepieceprops";

class PuzzleGridProps {
  constructor(props) {
    //console.log("PuzzleGridProps", props);
    this.size = props.size;
    this.solved = true;

    const rows = props.size.rows;
    const cols = props.size.cols;
    this.handleMoveEmptyPiece = props.handleMoveEmptyPiece;
    this.piecePropsArr = new Array(rows);
    for (var i = 0; i < rows; i++) {
      this.piecePropsArr[i] = new Array(cols);
      for (var j = 0; j < cols; j++) {
        this.piecePropsArr[i][j] = new PuzzlePieceProps({
          gridSize: props.size,
          x: i,
          y: j
        });
      }
    }
  }

  isPuzzleSolved = () => {
    for (let i = 0; i < this.size.rows; i++) {
      for (let j = 0; j < this.size.cols; j++) {
        if (!this.piecePropsArr[i][j].isItInSolvedPosition()) {
          return false;
        }
      }
    }
    console.log("isPuzzleSolved returns true");
    return true;
  };

  replacePieces = (p1x, p1y, p2x, p2y) => {
    console.log(
      "replacePieces, p1x=" +
        p1x +
        ", p1y=" +
        p1y +
        ", p2x=" +
        p2x +
        ", p2y=" +
        p2y
    );
    const p1 = this.piecePropsArr[p1x][p1y];
    const p2 = this.piecePropsArr[p2x][p2y];
    const p1x_old = p1x;
    const p1y_old = p1y;
    p1.x = p2.x;
    p1.y = p2.y;
    this.piecePropsArr[p1x_old][p1y_old] = p2;
    this.piecePropsArr[p2.x][p2.y] = p1;
    p2.x = p1x_old;
    p2.y = p1y_old;
  };

  moveRandomPiece = () => {
    const emptyPiece = this.findEmptyPiece();
    const neighboursOfEmpty = this.getNeighbours(emptyPiece);
    const randomIndex =
      Math.round(Math.random() * 1000) % neighboursOfEmpty.length;
    console.log(
      "Random Index: ",
      randomIndex,
      "Neighbours count:",
      neighboursOfEmpty.length
    );
    this.replacePieces(
      emptyPiece.x,
      emptyPiece.y,
      neighboursOfEmpty[randomIndex].x,
      neighboursOfEmpty[randomIndex].y
    );
  };

  getNeighbours = piece => {
    const result = new Array();
    if (piece.x < this.size.rows - 1) {
      result.push(this.piecePropsArr[piece.x + 1][piece.y]);
    }
    if (piece.x > 0) {
      result.push(this.piecePropsArr[piece.x - 1][piece.y]);
    }
    if (piece.y < this.size.cols - 1) {
      result.push(this.piecePropsArr[piece.x][piece.y + 1]);
    }
    if (piece.y > 0) {
      result.push(this.piecePropsArr[piece.x][piece.y - 1]);
    }
    return result;
  };

  findEmptyPiece = () => {
    const emptyPiece = this.piecePropsArr
      .filter(row => row.filter(p => p.empty).length)[0]
      .filter(p => p.empty)[0];
    return emptyPiece;
  };
}

export default PuzzleGridProps;
