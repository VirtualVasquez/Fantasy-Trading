import React
// , {useEffect, useState } 
from 'react';
import './StockResult.scss';


function StockResult({index, toggleModal, modalContents, setModalContents, symbol, company, getStockPriceQuote, sharesOwnedByUser, availableFunds }){
    function formatToDate(timestamp){
        const date = new Date(timestamp);
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

    async function handleGetQuote(e) {
        try {
        const [stockQuoteData, ownedSharesData] = await Promise.all([
            getStockPriceQuote(symbol),
            sharesOwnedByUser(symbol),
        ]);
        console.log(stockQuoteData)
        setModalContents({
            ...modalContents,
            symbol: symbol,
            companyName: company,
            availableFunds: availableFunds,
            currentOwnedShares: ownedSharesData,
            currentPrice: stockQuoteData.c,
            priceChange: stockQuoteData.d,
            percentChange: stockQuoteData.dp,
            highestPriceToday: stockQuoteData.h,
            lowestPriceToday: stockQuoteData.l,
            openPriceToday: stockQuoteData.o,
            previousClosePrice: stockQuoteData.pc,
            timestamp: stockQuoteData.t
        });
    
        toggleModal(e);
        } catch (error) {
        console.error(error);
        }
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