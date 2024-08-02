import { Header } from "./component/Header/Header";
import "./App.scss";
import { GameProvider } from "./component/Game/GameContext";
import { BoardContainer } from "./component/Board/BoardContainer";

function App() {
  return (
    <>
      <GameProvider>
        <div className="main-layout">
          <div className="header ">
            <Header />
          </div>
          <hr />
          <div className="main-container">
            <BoardContainer />
          </div>
          <div className="footer"></div>
        </div>
      </GameProvider>
    </>
  );
}

export default App;
