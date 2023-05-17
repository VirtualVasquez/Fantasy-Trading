import React
// , {useEffect, useState } 
from 'react';
import './StockResult.scss';


function StockResult({index, toggleModal, modalContents, setModalContents, symbol, company, getStockPriceQuote, accountFigures }){


   async function handleGetQuote(e){
    getStockPriceQuote(symbol)
    .then((stockQuoteData) => {
        console.log("firin' the laser");
        console.log(accountFigures.cashBalance);
      setModalContents({
        ...modalContents,
        symbol: symbol,
        sharePrice: stockQuoteData.c,
        availableFunds: accountFigures.cashBalance,
        currentOwnedShares: 3,
      });
      toggleModal(e);
    })
    .catch((error) => {
      console.error(error);
    });
   }

    return (
    <div className="card stock-result"> 
        <div className="card-body stock-result-body">
            <p className="comp-info">
                <span className="comp-symbol">
                    {symbol}
                </span>
                    &nbsp;-&nbsp;
                <span className="comp-name">
                    {company}
                </span>
            </p>
            <button 
                className="btn btn-primary"
                onClick={handleGetQuote}
            >
                Quote
            </button>            
        </div>
    </div>
    )
}

export default StockResult;