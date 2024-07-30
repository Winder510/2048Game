import { Header } from "./component/Header/Header";
import "./App.scss";
function App() {
  return (
    <>
      <div className="main-layout">
        <div className="header ">
          <Header />
        </div>
        <div className="main-container"></div>
        <div className="footer"></div>
      </div>
    </>
  );
}

export default App;
