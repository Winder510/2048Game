import React, { memo } from "react";
import { TileType, Value } from "../types/types";

import "./Tile.scss";

interface TileProps {
  value: Value;
  type: TileType;
  x: number;
  y: number;
}

const Tile = (props: TileProps) => {
  return (
    <div
      className={`tile tile-${props.value}`}
      style={{ transform: `translate(${props.x}px, ${props.y}px)` }}
    >
      <div className={`tileInner ${props.type}`}>{props.value}</div>
    </div>
  );
};

export default Tile;
