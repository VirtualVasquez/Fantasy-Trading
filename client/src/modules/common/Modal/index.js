import { useState, useEffect } from 'react';
import axios from "axios";
import './Modal.scss';

function Modal({modalContents, toggleModal, localToken, getTransactions}) {
    
    const {symbol, companyName, availableFunds, currentOwnedShares, currentPrice, priceChange, percentChange, highestPriceToday, lowestPriceToday, openPriceToday, previousClosePrice, timestamp} = modalContents;

    const [tradeData, setTradeData] = useState({
        action: "BUY",
        quantity: 0,
        total: 0
    });

    const handleSelectChange = (event) => {
        setTradeData({
            ...tradeData,
            action: event.target.value
        })
    }

    const handleQuantityChange = (event) => {
        setTradeData({
            ...tradeData,
            quantity: event.target.value,
            total: updateTotal(event.target.value, currentPrice)
        })
    }

    const updateTotal = (shares, price) => {
        return shares * price
    }

    const selectAllOwnedStock = (event) => {
        event.preventDefault();
        setTradeData({
            ...tradeData,
            quantity: currentOwnedShares,
            total: updateTotal(currentOwnedShares, currentPrice)
        })
    }

    function formatToUS(value){
        return value.toLocaleString('en-US', {
            style: 'currency', 
            currency: 'USD',
          })
    }
    function formatToPercent (value){
      return (value).toFixed(2) + '%';
    }
    function formatToDate(timestamp){
        const date = new Date(timestamp * 1000);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric', 
            timeZone: 'UTC' 
          };
          return date.toLocaleString('en-US', options);
    }

    async function makeTransaction(action, token, compName, compSymbol, sharesQuantity, sharesPrice){

        const requestData = {
            transaction_type: action,
            company_name: compName,
            nyse_symbol: compSymbol,
            shares: sharesQuantity,
            price: sharesPrice
        }

        const config ={
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        try{
            const response = await axios.post('/transactions', requestData, config)
            return response.data
        } catch (error){
            console.error(error);
        }
    }
    
    async function handleTradeSubmit(event){
        event.preventDefault();
        if(!tradeData.quantity){
            return console.log("You can not buy zero shares.");
        }
        if(availableFunds < tradeData.total){
            return console.log("You do not have enough money to make this transaction.");
        }
        console.log("initiating trade");
        await makeTransaction(tradeData.action, localToken, companyName, symbol, tradeData.quantity, currentPrice);
        toggleModal(event);
        getTransactions(localToken);
        // setTimeout(() => {
        //     window.location.href = '/home'
        //   }, "4000");
    }

    return(
    <div className="modal-backdrop" id="modal">
        <div className="modal-wrapper">
            <div className="modal-header">
                <h3>Trade: {symbol} - {companyName}</h3>
                <button 
                    type="button" 
                    className="btn-close" 
                    aria-label="Close"
                    onClick={toggleModal}
                >    
                </button>
            </div>
            <div className="modal-content container">
                <div className='row user-data'>
                    <div className='col-6 user-funds'>
                        <p><span className="info-label">Available funds:</span> {formatToUS(availableFunds)}</p>
                    </div>
                    <div className='col-5 offset-1 user-shares'>
                        <p><span className="info-label">Shares owned: </span>{currentOwnedShares}</p>
                    </div>
                </div>
                <div className='row stock-data'>
                    <div className="col-12 stock-timestamp">
                        <p>Quote as of {formatToDate(timestamp)}</p>
                    </div>
                    <div className="col-6 stock-price">
                        <p><span className="info-label">Share Price:</span></p>
                        <p>{formatToUS(currentPrice)} / share</p>
                        
                    </div>
                    <div className="col-5 offset-1 stock-details">
                        <p><span className="info-label">Today's Change:</span> {formatToUS(priceChange)} ({formatToPercent(percentChange)})</p>
                        <p><span className="info-label">Day High | Low:</span> {formatToUS(highestPriceToday)} | {formatToUS(lowestPriceToday)}</p>
                        <p><span className="info-label">Previous Close:</span> {formatToUS(previousClosePrice)}</p>
                        <p><span className="info-label">Open Price:</span> {formatToUS(openPriceToday)}</p>
                    </div>

                </div>
                <div className='row form-data'>
                    <form className="form-inline">                        
                        <label htmlFor="action">Action</label>
                        <select id="action" className="custom-select" value={tradeData.action} onChange={handleSelectChange}>
                            <option value="BUY">Buy</option>
                            <option value="SELL">Sell</option>
                        </select>
                        
                        <label htmlFor="quantity">Quantity</label>
                        <input id="quantity" name="quantity" type="number" min="0" value={tradeData.quantity} onChange={handleQuantityChange}>
                        </input>
                            {currentOwnedShares && tradeData.action === "SELL" ? 
                            <button 
                                className="btn btn-warning" 
                                onClick={selectAllOwnedStock}
                            >
                                Sell All
                            </button> : null}
                    </form>
                    <p><span className="info-label">Total:</span> {formatToUS(tradeData.total)}</p>
                </div>
                <div className='row actions'>
                    <button className='btn btn-secondary'>Cancel</button>
                    <button 
                        className='btn btn-success'
                        disabled={!tradeData.quantity || availableFunds < tradeData.total }
                        onClick={handleTradeSubmit}
                    >
                        Trade
                    </button>
                </div>
                
            </div>
        </div>

    </div>
    )
}

export default Modal;