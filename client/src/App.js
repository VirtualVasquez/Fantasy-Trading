import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/homePage/homePage';
import LoginPage from './pages/loginPage/loginPage';
import TradePage from './pages/tradePage/tradePage';
import Navbar from './components/navbar';


function App() {
  return (
    <div className="App">
      {/* Render Navbar only for HomePage and Trade Page */}
      {/* <Navbar /> */}
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
