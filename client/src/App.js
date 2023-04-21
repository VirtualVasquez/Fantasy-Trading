import { useState, useEffect } from "react";
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
import Modal from './modules/common/Modal';
import Protected from "./helpers/Protected";
import axios from "axios";



function App() {

  //get access token in local storage
  const[ localToken, setLocalToken]  = useState(localStorage.getItem('fantasy_access_token'));
  const[ user, setUser] = useState(null);


  async function verifyAccessToken(token) {
    try {
      const response = await axios.post('token/validate', {
        accessToken: token
      });
      setUser(response);
    } catch (error) {
      console.error(error);
    }
  }

  //if access token present
  if(localToken){
    verifyAccessToken(localToken);
  }

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
  
  useEffect(() => {
    function handleEscKeyPress(event) {
      if (event.key === 'Escape' && showModal === true) {
        console.log("I am working at esc");
        setShowModal(false);
      }
    }

    document.addEventListener('keydown', handleEscKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [showModal]);


  return (
    <div className="App">
      {showModal ? 
        <Modal 
          toggleModal={toggleModal} 
        /> 
        : null}
      {user ? <Navbar /> : null}
      <Router>
        <Routes>
          <Route
            exact path="/"
            element={
              <LoginPage 
                setUser={setUser}
              />
            }
          />
          <Route
            exact path="/home"
            element={
              <Protected user={user}>            
                <HomePage
                  toggleModal={toggleModal}
                  setModalContents={setModalContents}
                  user={user} 
                />
              </Protected>

            }
          />
          <Route
            exact path="/trade"
            element={
              <Protected user={user}>            
                <TradePage 
                  toggleModal={toggleModal}
                  setModalContents={setModalContents}
                  user={user}
                />
              </Protected>
            }
          />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
