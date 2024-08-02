import React, { useEffect, useReducer, ReactNode } from "react";
import {
  GameState,
  GameContextActionType,
  Tile,
  IGameContext,
  GameStatus,
  Direction,
} from "../types/types";
import {
  MOVES_MAP,
  areEqual,
  merge,
  createRandomTile,
  generateBoard,
  isGameOver,
  isGameWon,
} from "../Utils/boardUtils";
import { KEYBOARD_ARROW_TO_DIRECTION_MAP } from "../Utils/constant";
const initState = (tilesCount = 2): GameState => ({
  tiles: generateBoard(tilesCount),
  lastMove: null,
  status: "IN_PROGRESS",
});

const getGameStatus = (tiles: Tile[]): GameStatus => {
  if (isGameOver(tiles)) {
    return "GAME_OVER";
  }
  if (isGameWon(tiles)) {
    return "WIN";
  }
  return "IN_PROGRESS";
};

function gameReducer(
  state: GameState,
  action: GameContextActionType
): GameState {
  switch (action.type) {
    case "restart":
      return initState();
    case "continue":
      return { ...state, status: "PLAY_AFTER_WIN" };
    case "move":
      const move = MOVES_MAP[action.payload];
      let tiles = move(state.tiles);
      if (areEqual(state.tiles, tiles)) {
        return state;
      }
      tiles = merge(tiles);
      tiles = [...tiles, createRandomTile(tiles)];
      const status = getGameStatus(tiles);
      console.log(" state.status ", state.status);
      const shouldChangeStatus =
        state.status !== "PLAY_AFTER_WIN" || status === "GAME_OVER";
      return {
        ...state,
        tiles,
        lastMove: action.payload,
        status: shouldChangeStatus ? status : state.status,
      };
    default:
      throw new Error(`Unhandled action: ${action}`);
  }
}

const defaultGameState: GameState = initState(2);
const defaultContextValue: IGameContext = {
  gameState: defaultGameState,
  dispatch: () => {},
};

const GameContext = React.createContext<IGameContext>(defaultContextValue);

interface GameProviderProps {
  children: ReactNode;
}

const GameProvider = (props: GameProviderProps) => {
  const [state, dispatch] = useReducer(gameReducer, defaultGameState);
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const direction: Direction | undefined =
        KEYBOARD_ARROW_TO_DIRECTION_MAP[e.key];
      if (direction) {
        dispatch({ type: "move", payload: direction });
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch]);
  return (
    <GameContext.Provider value={{ gameState: state, dispatch }}>
      {props.children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
