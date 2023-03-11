import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from "react";
import HomePage from './modules/HomePage';
import LoginPage from './modules/LoginPage';
import TradePage from './modules/TradePage';
import Navbar from './modules/common/Navbar';


function App() {

  //placeholder until we implement webtokens for login
  const[ loggedIn, setLoggedIn]  = useState(true);

  return (
    <div className="App">
      {loggedIn ? <Navbar /> : null}
      <Router>
        <Routes>
          <Route
            exact path="/"
            element={
              <LoginPage />
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
