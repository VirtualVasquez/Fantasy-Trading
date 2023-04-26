import { useState, useEffect } from "react";
import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import HomePage from './modules/HomePage';
import LoginPage from './modules/LoginPage';
import TradePage from './modules/TradePage';
import Navbar from './modules/common/Navbar';
// import Modal from './modules/common/Modal';
import Protected from "./helpers/Protected";
import axios from "axios";

function App() {
  const [localToken, setLocalToken] = useState(localStorage.getItem('fantasy_access_token'));
  const [user, setUser] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  // const [modalContents, setModalContents] = useState(null);

  async function verifyAccessToken(token) {
    try {
      const response = await axios.post('http://localhost:3001/token/validate', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // const toggleModal = (e) => {
  //   console.log(showModal)
  //   e.preventDefault();
  //   if (showModal) {
  //     setShowModal(false);
  //   } else {
  //     setShowModal(true);
  //   }
  // }

  useEffect(() => {
    if (localToken) {
      const verified = verifyAccessToken(localToken);
      if(!verified){
        localStorage.removeItem('fantasy_access_token');
      }
    }
  }, [localToken]);

  // useEffect(() => {
  //   function handleEscKeyPress(event) {
  //     if (event.key === 'Escape' && showModal === true) {
  //       console.log("I am working at esc");
  //       setShowModal(false);
  //     }
  //   }

  //   document.addEventListener('keydown', handleEscKeyPress);

  //   return () => {
  //     document.removeEventListener('keydown', handleEscKeyPress);
  //   };
  // }, [showModal]);

  return (
    <div className="App">
      {/* {showModal ? 
        <Modal 
          toggleModal={toggleModal} 
        /> 
        : null} */}
      {localToken ? <Navbar /> : null}
      <Router>
        <Routes>
        <Route
          exact path="/"
          element={
            user ? (
              <Navigate to="/home" replace />
            ) : (
              <LoginPage setUser={setUser} />
            )
          }
        />
          <Route
            exact path="/home"
            element={
              <Protected localToken={localToken}>            
                <HomePage
                  // toggleModal={toggleModal}
                  // setModalContents={setModalContents}
                  user={user} 
                />
              </Protected>

            }
          />
          <Route
            exact path="/trade"
            element={
              <Protected localToken={localToken}>            
                <TradePage 
                  // toggleModal={toggleModal}
                  // setModalContents={setModalContents}
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
