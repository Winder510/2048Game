export const GameFooter = () => {
  return (
    <div className="footer pt-5">
      <h2>How to play</h2>
      <p>
        The same numbers will be merged into one when they touch. After each
        move, a new number (<strong>2</strong> or <strong>4</strong>) is
        generated at a random empty position. Merge the numbers and build a 2048
        number to <strong>WIN</strong> the game!
      </p>
      <h2>Learn more</h2>
      <p>
        Its clone
        <a href="https://2048game.com/"> https://2048game.com/</a>
      </p>
    </div>
  );
};
