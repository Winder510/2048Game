import "./ScoreBox.scss";
type ScoreBoxProps = {
  title: string;
  score: number;
};
export const ScoreBox = (props: ScoreBoxProps) => {
  return (
    <div className="scoreBox">
      <span className="title">{props.title}</span>
      <span className="score">{props.score}</span>
    </div>
  );
};
