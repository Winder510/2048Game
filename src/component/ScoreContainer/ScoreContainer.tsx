import { useContext, useReducer, useEffect } from "react";
import { ScoreBox } from "../ScoreBox/ScoreBox";
import { Tile } from "../types/types";
import "./ScoreContainer.scss";
import { GameContext } from "../Game/GameContext";
import { getMaxId } from "../Utils/boardUtils";
export type ACTIONTYPE = { type: "change"; payload: Tile[] };

export interface ScoresState {
  score: number;
  bestScore: number;
  newPoints: number;
  tiles: Tile[];
}
export const ScoresContainer = () => {
  const { gameState } = useContext(GameContext);
  const [state, dispatch] = useReducer(
    stateReducer,
    initState(gameState.tiles)
  );

  useEffect(() => {
    dispatch({ type: "change", payload: gameState.tiles });
  }, [gameState.tiles, dispatch]);

  useEffect(() => {
    if (state.newPoints > 0) {
      const oldAddScore = document.getElementById("additionScore");
      if (!oldAddScore) return;
      oldAddScore.innerText = `+${state.newPoints}`;
      const newAddScore = oldAddScore.cloneNode(true);
      oldAddScore?.parentNode?.replaceChild(newAddScore, oldAddScore);
    }
  }, [state]);

  return (
    <>
      <div className="scoresContainer">
        <div style={{ position: "relative" }}>
          <ScoreBox title="SCORE" score={state.score} />
          <div className="addScore" id="additionScore"></div>
        </div>

        <ScoreBox title="BEST" score={state.bestScore} />
      </div>
    </>
  );
};

const initState = (tiles: Tile[] = []): ScoresState => {
  return {
    score: 0,
    newPoints: 0,
    bestScore: 0,
    tiles,
  };
};

const containsTile = (tiles: Tile[], tile: Tile): boolean => {
  return tiles.some((t) => t.id === tile.id);
};

const stateReducer = (state: ScoresState, action: ACTIONTYPE): ScoresState => {
  switch (action.type) {
    case "change": {
      const tiles = action.payload;

      // handles page refresh
      if (
        state.tiles.length === tiles.length &&
        state.tiles.every((t) => containsTile(tiles, t))
      ) {
        return state;
      }
      console.log("   tiles.length", tiles);
      // handles restart
      if (
        tiles.length === 2 &&
        [1, 2].every((id) => tiles.find((tile) => tile.id === id)) &&
        !state.tiles.every((t) => containsTile(tiles, t))
      ) {
        return { ...initState(tiles), bestScore: state.bestScore };
      }

      // handles add new tile
      if (
        state.tiles.every((t) => containsTile(tiles, t)) &&
        tiles.length === state.tiles.length + 1
      ) {
        return { ...state, tiles: tiles, newPoints: 0 };
      }

      // handles merge
      const lastGeneratedTileId = getMaxId(tiles);
      const newPoints = tiles.reduce((acc: number, curr: Tile) => {
        const add =
          curr.id === lastGeneratedTileId || containsTile(state.tiles, curr)
            ? 0
            : curr.value;
        return acc + add;
      }, 0);

      const score = state.score + newPoints;
      const bestScore = Math.max(score, state.bestScore);

      return { tiles, newPoints, score, bestScore };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
