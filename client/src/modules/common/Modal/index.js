import { useState, useEffect } from 'react';
import './Modal.scss';

function Modal({modalContents, toggleModal}) {
    
    const {symbol, companyName, availableFunds, currentOwnedShares, currentPrice, priceChange, percentChange, highestPriceToday, lowestPriceToday, openPriceToday, previousClosePrice, timestamp} = modalContents;

    const [tradeData, setTradeData] = useState({
        action: "buy",
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
            // quantity: currentOwnedShares,
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

    return(
    <div className="modal-backdrop" id="modal">
        <div className="modal-wrapper">
            <div className="modal-header">
                <h3>Trade: {symbol} - {companyName}</h3>
                <button 
                    type="button" 
                    class="btn-close" 
                    aria-label="Close"
                    onClick={toggleModal}
                >    
                </button>
            </div>
            <div className="modal-content container">
                <div className='row user-data'>
                    <div className='col-6 user-funds'>
                        <p><span class="info-label">Available funds:</span> {formatToUS(availableFunds)}</p>
                    </div>
                    <div className='col-5 offset-1 user-shares'>
                        <p><span class="info-label">Shares owned: </span>{currentOwnedShares}</p>
                    </div>
                </div>
                <div className='row stock-data'>
                    <div className="col-12 stock-timestamp">
                        <p>Quote as of {formatToDate(timestamp)}</p>
                    </div>
                    <div className="col-6 stock-price">
                        <p><span class="info-label">Share Price:</span></p>
                        <p>{formatToUS(currentPrice)} / share</p>
                        
                    </div>
                    <div className="col-5 offset-1 stock-details">
                        <p><span class="info-label">Today's Change:</span> {formatToUS(priceChange)} ({formatToPercent(percentChange)})</p>
                        <p><span class="info-label">Day High | Low:</span> {formatToUS(highestPriceToday)} | {formatToUS(lowestPriceToday)}</p>
                        <p><span class="info-label">Previous Close:</span> {formatToUS(previousClosePrice)}</p>
                        <p><span class="info-label">Open Price:</span> {formatToUS(openPriceToday)}</p>
                    </div>

                </div>
                <div className='row form-data'>
                    <form class="form-inline">                        
                        <label for="action">Action</label>
                        <select id="action" class="custom-select" value={tradeData.action} onChange={handleSelectChange}>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                        
                        <label for="quantity">Quantity</label>
                        <input id="quantity" name="quantity" type="number" min="0" value={tradeData.quantity} onChange={handleQuantityChange}>
                        </input>
                            {currentOwnedShares && tradeData.action === "sell" ? 
                            <button 
                                class="btn btn-warning" 
                                onClick={selectAllOwnedStock}
                            >
                                Sell All
                            </button> : null}
                    </form>
                    <p><span class="info-label">Total:</span> {formatToUS(tradeData.total)}</p>
                </div>
                <div className='row actions'>
                    <button className='btn btn-secondary'>Cancel</button>
                    <button className='btn btn-success'>Trade</button>
                </div>
                
            </div>
        </div>

    </div>
    )
}

export default Modal;