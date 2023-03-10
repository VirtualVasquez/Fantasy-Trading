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
import Modal from './modules/common/Modal'


function App() {

  //placeholder until we implement webtokens for login
  const[ loggedIn, setLoggedIn]  = useState(true);
  const[ showModal, setShowModal]  = useState(false);
  const[ modalContents, setModalContents] = useState(null);

  const toggleModal = (e) => {
      console.log(showModal)
      e.preventDefault();
      if(showModal){
          setShowModal(false);
      } else {
          setShowModal(true);
      }
      
  }

  return (
    <div className="App">
      {showModal ? 
        <Modal 
          toggleModal={toggleModal} 
        /> 
        : null}
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
            exact path="/home"
            element={
              <HomePage
                toggleModal={toggleModal}
                setModalContents={setModalContents} 
              />
            }
          />
          <Route
            exact path="/trade"
            element={
              <TradePage 
                toggleModal={toggleModal}
                setModalContents={setModalContents}
              />
            }
          />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
