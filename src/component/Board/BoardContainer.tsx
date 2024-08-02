import React, { useContext, useEffect } from "react";
import { GameContext } from "../Game/GameContext";
import { BoardProvider } from "./BoardContext";
let startClientX: any = null;
let startClientY: any = null;

export const BoardContainer = () => {
  const { dispatch } = useContext(GameContext);

  useEffect(() => {
    function handleTouchStart(event: any) {
      if (event.touches.length === 1) {
        const startTouch = event.touches[0];
        startClientX = startTouch.clientX;
        startClientY = startTouch.clientY;
      }
    }

    function handleTouchEnd(event: any) {
      if (!startClientX || !startClientY || event.touches.length > 0) {
        return;
      }

      const endTouch = event.changedTouches[0];
      var endClientX = endTouch.clientX;
      var endClientY = endTouch.clientY;

      var xDiff = startClientX - endClientX;
      var yDiff = startClientY - endClientY;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff < 0) {
          /* right swipe */
          dispatch({ type: "move", payload: "right" });
        } else {
          /* left swipe */
          dispatch({ type: "move", payload: "left" });
        }
      } else {
        if (yDiff < 0) {
          /* down swipe */
          dispatch({ type: "move", payload: "down" });
        } else {
          /* up swipe */
          dispatch({ type: "move", payload: "up" });
        }
      }
      /* reset values */
      startClientX = null;
      startClientY = null;
    }

    const boardContainer = document.getElementById("boardContainer");
    boardContainer?.addEventListener("touchstart", handleTouchStart);
    boardContainer?.addEventListener("touchend", handleTouchEnd);

    return () => {
      boardContainer?.removeEventListener("touchstart", handleTouchStart);
      boardContainer?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [dispatch]);

  return <BoardProvider />;
};
