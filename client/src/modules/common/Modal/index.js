import React from 'react';
import './Modal.scss';

function Modal({modalContents, toggleModal}) {
    
    const {symbol, companyName, availableFunds, currentOwnedShares, currentPrice, priceChange, percentChange, highestPriceToday, lowestPriceToday, openPriceToday, previousClosePrice, timestamp} = modalContents;

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
                        <select id="action" class="custom-select">
                            <option selected>Buy</option>
                            <option>Sell</option>
                        </select>
                        
                        <label for="quantity">Quantity</label>
                        <input id="quantity" name="quantity" type="number" min="0" placeholder="0">
                        </input>
                            <button class="btn btn-warning">Sell All</button>
                    </form>
                    <p><span class="info-label">Total:</span> $xxx,xxx,xxx</p>
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