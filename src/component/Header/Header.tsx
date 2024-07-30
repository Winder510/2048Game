import { ScoresContainer } from "../ScoreContainer/ScoreContainer";
import "./Header.scss";
export const Header = () => {
  return (
    <>
      <div className="header ">
        <div className=" d-flex flex-row justify-content-between">
          <div className="name ">2048</div>
          <div className="score-container ">
            <ScoresContainer />
          </div>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div className="description ">
            Play 2048 game online <br />
            Join the numbers and get to the 2048 tile!
          </div>
          <button className="reset-button ">New Game</button>
        </div>
      </div>
    </>
  );
};
