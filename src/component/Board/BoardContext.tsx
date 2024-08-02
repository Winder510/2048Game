import React, { useContext, useEffect, useReducer } from "react";
import { MOVES_MAP } from "../Utils/boardUtils";
import { GameState, Tile } from "../types/types";
import Board from "./Board";

import "./Board.scss";
import { GameContext } from "../Game/GameContext";

interface BoardState {
  moves: Array<GameState>;
  loading: boolean;
  tiles: Tile[];
}

type BoardActionType =
  | { type: "addMove"; payload: GameState }
  | { type: "startMove" }
  | { type: "endMove" };

export const BoardProvider = () => {
  const { gameState } = useContext(GameContext);

  const [boardState, dispatch] = useReducer(boardReducer, initState());

  useEffect(() => {
    dispatch({ type: "addMove", payload: gameState });
  }, [gameState]);

  useEffect(() => {
    if (boardState.moves.length < 2 || boardState.loading) {
      return;
    }

    dispatch({ type: "startMove" });

    setTimeout(() => {
      dispatch({
        type: "endMove",
      });
    }, 50);
  }, [boardState]);

  return <Board tiles={boardState.tiles} />;
};

function boardReducer(state: BoardState, action: BoardActionType): BoardState {
  switch (action.type) {
    case "addMove": {
      const isNewGame = !action.payload.lastMove;
      if (isNewGame || state.tiles.length === 0) {
        return initState(action.payload);
      }

      return {
        ...state,
        moves: [...state.moves, action.payload],
      };
    }
    case "startMove": {
      const currGameState = state.moves[0];
      const nextGameState = state.moves[1];
      if (!nextGameState.lastMove) {
        throw new Error("Invalid move direction");
      }
      const tiles = MOVES_MAP[nextGameState.lastMove](currGameState.tiles);

      return { ...state, loading: true, tiles };
    }
    case "endMove": {
      const nextGameState = state.moves[1];
      return {
        moves: state.moves.slice(1),
        loading: false,
        tiles: nextGameState.tiles,
      };
    }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
}

const initState = (gameState?: GameState): BoardState => {
  if (gameState) {
    return { moves: [gameState], loading: false, tiles: gameState.tiles };
  }
  return { moves: [], loading: false, tiles: [] };
};
