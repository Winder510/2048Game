import { ScoreBox } from "../ScoreBox/ScoreBox";
import "./ScoreContainer.scss";
export const ScoresContainer = () => {
  return (
    <>
      <div className="scoresContainer ">
        <div style={{ position: "relative" }}>
          <ScoreBox title="SCORE" score={100} />
          <div className="addScore" id="additionScore"></div>
        </div>

        <ScoreBox title="BEST" score={3544} />
      </div>
    </>
  );
};
