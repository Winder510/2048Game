import { Dispatch } from "react";

export type Value = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;

export type TransformFactor = 121 | 97 | 73;

export type Direction = "right" | "left" | "up" | "down";

export type TileType = "merged" | "new";

export interface Tile {
  id: number;
  value: Value;
  type: TileType;
  positionX: number;
  positionY: number;
}

export type GameStatus = "WIN" | "GAME_OVER" | "IN_PROGRESS" | "PLAY_AFTER_WIN";

export interface GameState {
  tiles: Tile[];
  lastMove: Direction | null;
  status: GameStatus;
}
export type GameContextActionType =
  | { type: "restart" }
  | { type: "continue" }
  | { type: "move"; payload: Direction };

export interface IGameContext {
  gameState: GameState;
  dispatch: Dispatch<GameContextActionType>;
}
