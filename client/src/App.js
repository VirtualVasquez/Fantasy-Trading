import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './modules/HomePage';
import LoginPage from './modules/LoginPage';
import TradePage from './modules/TradePage';
import Navbar from './modules/common/Navbar';


function App() {
  return (
    <div className="App">
      {/* Render Navbar only for HomePage and Trade Page */}
      <Navbar />
      <Router>
        <Routes>
          <Route
            exact path="/"
            element={
              // <LoginPage />
              // <HomePage />
              <TradePage />

            }
          />
          <Route
            exact path="/login"
            element={
              <HomePage />
            }
          />
          <Route
            exact path="/trade"
            element={
              <TradePage />
            }
          />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
