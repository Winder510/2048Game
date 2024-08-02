import { GameState } from "../types/types";

const GAME_ID = "2048game";

export const getLocalStorageState = (): any => {
  const state = localStorage.getItem(GAME_ID);
  return state ? JSON.parse(state) : null;
};

export const setLocalStorageState = (state: GameState) => {
  localStorage.setItem("GAME_ID", JSON.stringify(state));
};
// lưu thêm tile[] (chưa hoàn thành)
