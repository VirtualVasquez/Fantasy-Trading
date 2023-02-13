import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/homePage/homePage';
import LoginPage from './pages/loginPage/loginPage';
import TradePage from './pages/tradePage/tradePage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact path="/"
            element={
              <HomePage />
            }
          />
          <Route
            exact path="/login"
            element={
              <LoginPage />
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
