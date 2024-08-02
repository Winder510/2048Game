import "./Board.scss";
import { TileContainer } from "../Tiles/TilesList";
import { Tile } from "../types/types";
import GameResultContainer from "./GameResult";
const BoardGrid = () => {
  const grid = Array.from(Array(4).keys()).map((rowId) => {
    const columns = Array.from(Array(4).keys()).map((colId) => (
      <div key={colId} className="cells"></div>
    ));
    return (
      <div key={rowId} className="rows ">
        {columns}
      </div>
    );
  });

  return <div className="gridContainer">{grid}</div>;
};

const Board = (props: { tiles: Tile[] }) => {
  return (
    <div id="boardContainer">
      <GameResultContainer tiles={props.tiles} />
      <BoardGrid />
      <TileContainer tiles={props.tiles} />
    </div>
  );
};

export default Board;
