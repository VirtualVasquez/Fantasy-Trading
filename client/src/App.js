import { useState, useEffect } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from './modules/HomePage';
import LoginPage from './modules/LoginPage';
import TradePage from './modules/TradePage';
import Navbar from './modules/common/Navbar';
import Modal from './modules/common/Modal';
import Protected from "./helpers/Protected";
import axios from "axios";

function App() {
  const [localToken, setLocalToken] = useState(localStorage.getItem('fantasy_access_token'));
  const [showModal, setShowModal] = useState(false);
  const [userTransactions, setUserTransactions] = useState([]);
  const [accountFigures, setAccountFigures] = useState({
      accountValue: 0,
      cashBalance: 0,
      marketValue: 0,
      baseCost: 0,
      gainLoss: {
          netCash: "-$1.00",
          netPercent: "-1.0%"
      }
  });
  const [modalContents, setModalContents] = useState({
    symbol:"DEMO",
    companyName: "Demonstration, Inc.",
    availableFunds: '$0.00',
    currentOwnedShares: 0,
    currentPrice: 0,
    priceChange: 0,
    percentChange: 0,
    highestPriceToday: 0,
    lowestPriceToday: 0,
    openPriceToday: 0,
    previousClosePrice: 0,
    timestamp: 0,
  });
  const accountFunctions = {
      setAccountValue(){
          //accountFigures.cashBalance + accountFigures.marketValue
              //but because ^this^ won't be defined at time of running
              //this.setCashBalance() + this.setMarketValue();
      },
      setCashBalance(){
          return getTransactionTypeTotal('DEPOSIT') + getTransactionTypeTotal('SELL') - getTransactionTypeTotal('WITHDRAWAL') - getTransactionTypeTotal('BUY');
      },
      setMarketValue(){
          //get all BUY transactions made
          //get all SELL transactions made
          //if "X" company is both in BUY and SELL
              //for each company with both
                  //"BUY" shares minus "SELL" shares
          //for each company (with now calculated total shares)
              //total shares multiplied by current market price
          //Add all market values for all shares
      },
      setBaseCost(){
          return getTransactionTypeTotal("BUY") - getTransactionTypeTotal("SELL");
      },
      setGainLoss(){
          //IN THIS ORDER
          //setBaseCost() - setMarketValue()
          //result should be something like {netCash: "valueX", netPercent: "valueY"}
      }
  }
  async function getTransactions(token){
    try {
        const response = await axios.get('http://localhost:3001/transactions', {
            params: {
                accessToken: token
            }
        });
        //return the response to be present/altered in the frontend
        setUserTransactions(response.data)
    } catch (error){
        console.error(error);
    }
  }
  function getTransactionTypeTotal(typeOfTransaction){

    let specifiedType;
    let total;

    if(typeOfTransaction === 'DEPOSIT'){
        specifiedType = 'DEPOSIT'
    }
    if(typeOfTransaction === 'WITHDRAWAL'){
        specifiedType = 'WITHDRAWAL'
    }
    if(typeOfTransaction === 'BUY'){
        specifiedType = 'BUY'
    }
    if(typeOfTransaction === 'SELL'){
        specifiedType = 'SELL'
    }
    const transactions = userTransactions.filter(transaction => transaction.transaction_type === specifiedType);
    let sum = 0;

    if(typeOfTransaction == 'WITHDRAWAL' || typeOfTransaction == 'DEPOSIT'){
      for (let i = 0; i < transactions.length; i++){
        const price = parseFloat(transactions[i].price);
        sum += price;
        
      }
      return sum;
    }

    if(typeOfTransaction == 'BUY' || typeOfTransaction == 'SELL'){
      for (let i = 0; i < transactions.length; i++){
        const shares = parseFloat(transactions[i].shares);
        const sharePrice = parseFloat(transactions[i].price);   
        sum += (shares * sharePrice)
      }
      return sum;
    }
  }
  const toggleModal = (e) => {
    e.preventDefault();
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }

  async function getStockPriceQuote(stockSymbol){
    try {
      const response = await axios.get('/stock-quote', {
        params:{
          symbol: stockSymbol,
        }
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  function sharesOwnedByUser(symbol) {

    function sumShares(array){
      let sum = 0;
      for (let i = 0; i < array.length; i++){
        const shares = parseFloat(array[i].shares);

        sum += shares;
      }
      return sum;
    }

    return new Promise((resolve) => {
      const buyInstances = userTransactions.filter((transaction) => {
        return transaction.nyse_symbol === symbol && transaction.transaction_type === 'BUY';
      });
      const sharesBought = sumShares(buyInstances);

      const sellInstances = userTransactions.filter((transaction) => {
        return transaction.nyse_symbol === symbol && transaction.transaction_type === 'SELL';
      });
      const sharesSold = sumShares(sellInstances);

      const sharesOwned = sharesBought - sharesSold;
      resolve(sharesOwned);
    });
  }

  // async function verifyAccessToken(token) {
  //   try {
  //     const response = await axios.post('http://localhost:3001/token/validate', null, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }



  // useEffect(() => {
  //   if (localToken) {
  //     const verified = verifyAccessToken(localToken);
  //     if(!verified){
  //       localStorage.removeItem('fantasy_access_token');
  //     }
  //     console.log(localToken);
  //   }
  // }, [localToken]);
 
  
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

  useEffect(() => {
    //change this to "if localToken verified" later
    //only checking with localToken for now to advance the project
    if(localToken){
      getTransactions(localToken);
    }
  }, [localToken]);

  useEffect(() => {
    setModalContents({
      ...modalContents,
      availableFunds: accountFunctions.setCashBalance(),
    })
    console.log(modalContents);

  }, [userTransactions]);

  return (
    <div className="App">
      {showModal ? 
        <Modal
          localToken={localToken} 
          toggleModal={toggleModal}
          modalContents={modalContents}
          getTransactions={getTransactions}
        /> 
        : null}
      {localToken ? <Navbar /> : null}
      <Router>
        <Routes>
        <Route
          exact path="/"
          element={
            localToken ? (
              <Navigate to="/home" replace />
            ) : (
              <LoginPage />
            )
          }
        />
          <Route
            exact path="/home"
            element={
              <Protected localToken={localToken}>            
                <HomePage
                  accessToken={localToken}
                  toggleModal={toggleModal}
                  modalContents={modalContents}
                  setModalContents={setModalContents}
                  getTransactions={getTransactions}
                  userTransactions={userTransactions}
                  accountFigures={accountFigures}
                  setAccountFigures={setAccountFigures}
                  accountFunctions={accountFunctions}
                />
              </Protected>

            }
          />
          <Route
            exact path="/trade"
            element={
              <Protected localToken={localToken}>            
                <TradePage 
                  accessToken={localToken}
                  toggleModal={toggleModal}
                  modalContents={modalContents}
                  setModalContents={setModalContents}
                  getTransactions={getTransactions}
                  getStockPriceQuote={getStockPriceQuote}
                  sharesOwnedByUser={sharesOwnedByUser}
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
