import { useState, useEffect } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from './modules/HomePage/HomePage';
import LoginPage from './modules/LoginPage';
import TradePage from './modules/TradePage/TradePage';
import Navbar from './modules/common/Navbar/navbar';
import Modal from './modules/common/Modal/modal';
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
          netCash: "-$0.00",
          netPercent: "0.0%"
      }
  });
  const [modalContents, setModalContents] = useState({
    symbol:"",
    companyName: "",
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
      setCashBalance(){
          return getTransactionTypeTotal('DEPOSIT') + getTransactionTypeTotal('SELL') - getTransactionTypeTotal('WITHDRAWAL') - getTransactionTypeTotal('BUY');
      },
      async setMarketValue(){
          //define variable of 'total'
          //from userTransactions, filter out unique stock symbols (no duplicates or nulls)
          let totalValue = 0;
          const uniqueSymbols = [...new Set(userTransactions.map(transaction => transaction.nyse_symbol))];
          const symbolObjects = uniqueSymbols
          .filter(symbol => symbol !== null)
          .map(symbol => ({
            symbol: symbol,
            sharesOwned: 0,
            sharePrice: 0
          }))
          //for each unique stock symbol
            const getSharesAndPrice = async() => {
              for (let i = 0; i < symbolObjects.length; i++) {
                const symbol = symbolObjects[i].symbol;
            
                // Update sharesOwned
                const sharesOwned = await sharesOwnedByUser(symbol);
                symbolObjects[i].sharesOwned = sharesOwned;
            
                // Update sharePrice
                const stockQuote = await getStockPriceQuote(symbol);
                const stockPrice = stockQuote.c;
                symbolObjects[i].sharePrice = stockPrice;

                totalValue += (sharesOwned * stockPrice)
              }

            }
            await getSharesAndPrice();

          return totalValue
      },
      setBaseCost(){
          return getTransactionTypeTotal("BUY") - getTransactionTypeTotal("SELL");
      }
  }
  async function getTransactions(token){
    try {
        const response = await axios.get('/transactions', {
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
  function getTransactionTypeTotal(typeOfTransaction, arrayofTransactions){

    let transactions;

    if(Array.isArray(arrayofTransactions) && arrayofTransactions.length > 0){
      transactions = arrayofTransactions.filter(transaction => transaction.transaction_type === typeOfTransaction)
    } else if(Array.isArray(userTransactions) && userTransactions.length > 0){
      transactions = userTransactions.filter(transaction => transaction.transaction_type === typeOfTransaction)
    }

    if(!transactions){
      return 0;
    } 

    let sum = 0;

    if(typeOfTransaction === 'WITHDRAWAL' || typeOfTransaction === 'DEPOSIT'){
      for (let i = 0; i < transactions.length; i++){
        const price = parseFloat(transactions[i].price);
        sum += price;
      }
        return sum;
    }
  
      if(typeOfTransaction === 'BUY' || typeOfTransaction === 'SELL'){
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
  function formatToUS(value){
    return value.toLocaleString('en-US', {
        style: 'currency', 
        currency: 'USD',
      })
  }
  function formatToPercent (value){
    return (value).toFixed(4) + '%';
  }

  async function verifyAccessToken(token) {
    try {
      const response = await axios.post('/token/validate', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }



   useEffect(() => {

    if (localToken) {
      verifyAccessToken(localToken).then((verified) =>{
        if(!verified){
          return localStorage.removeItem('fantasy_access_token');
        }
        if(verified){
          getTransactions(localToken);
        }
      })

    }
  }, [localToken]);

  useEffect(() => {
    console.log(userTransactions);
  }, [userTransactions]);
 
  
  useEffect(() => {
    function handleEscKeyPress(event) {
      if (event.key === 'Escape' && showModal === true) {
        setShowModal(false);
      }
    }

    document.addEventListener('keydown', handleEscKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [showModal]);

  // useEffect(() => {
  //   //change this to "if localToken verified" later
  //   //only checking with localToken for now to advance the project
  //   if(localToken){
  //     getTransactions(localToken);
  //   }
  // }, [localToken]);

useEffect(() => {
  setModalContents((prevModalContents) => ({
    ...prevModalContents,
    availableFunds: accountFunctions.setCashBalance(),
  }));
}, [userTransactions, setModalContents]);

  return (
    <div className="App">
      {showModal ? 
        <Modal
          localToken={localToken} 
          toggleModal={toggleModal}
          modalContents={modalContents}
          getTransactions={getTransactions}
          formatToUS={formatToUS}
          formatToPercent={formatToPercent}
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
                  toggleModal={toggleModal}
                  modalContents={modalContents}
                  setModalContents={setModalContents}
                  userTransactions={userTransactions}
                  accountFigures={accountFigures}
                  setAccountFigures={setAccountFigures}
                  accountFunctions={accountFunctions}
                  sharesOwnedByUser={sharesOwnedByUser}
                  getStockPriceQuote={getStockPriceQuote}
                  getTransactionTypeTotal={getTransactionTypeTotal}
                  formatToUS={formatToUS}
                  formatToPercent={formatToPercent}
                />
              </Protected>

            }
          />
          <Route
            exact path="/trade"
            element={
              <Protected localToken={localToken}>            
                <TradePage 
                  toggleModal={toggleModal}
                  modalContents={modalContents}
                  setModalContents={setModalContents}
                  getTransactions={getTransactions}
                  getStockPriceQuote={getStockPriceQuote}
                  sharesOwnedByUser={sharesOwnedByUser}
                  formatToUS={formatToUS}
                  formatToPercent={formatToPercent}
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
