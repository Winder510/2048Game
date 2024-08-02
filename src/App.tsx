import { Header } from "./component/Header/Header";
import "./App.scss";
import { GameProvider } from "./component/Game/GameContext";
import { BoardContainer } from "./component/Board/BoardContainer";
import { GameFooter } from "./component/Footer/Footer";

function App() {
  return (
    <>
      <GameProvider>
        <div className="layout-container">
          <div className="left-bg"></div>
          <div className="main-layout">
            <div className="header ">
              <Header />
            </div>
            <hr />
            <div className="main-container">
              <BoardContainer />
            </div>
            <div className="footer">
              <GameFooter />
            </div>
          </div>
          <div className="right-bg"></div>
        </div>
      </GameProvider>
    </>
  );
}

export default App;
