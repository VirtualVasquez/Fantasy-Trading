import React
// , {useEffect, useState } 
from 'react';
import './StockResult.scss';


function StockResult({index, toggleModal, modalContents, setModalContents, symbol, company, getStockPriceQuote, accountFigures, sharesOwnedByUser }){


//    async function handleGetQuote(e){
//     getStockPriceQuote(symbol)
//     .then((stockQuoteData) => {
//       setModalContents({
//         ...modalContents,
//         symbol: symbol,
//         sharePrice: stockQuoteData.c,
//         availableFunds: accountFigures.cashBalance,
//         currentOwnedShares: 3,
//       });
//       toggleModal(e);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//    }

    async function handleGetQuote(e) {
        try {
        const [stockQuoteData, ownedSharesData] = await Promise.all([
            getStockPriceQuote(symbol),
            sharesOwnedByUser(symbol),
        ]);
        console.log(ownedSharesData)
    
        setModalContents({
            ...modalContents,
            symbol: symbol,
            sharePrice: stockQuoteData.c,
            availableFunds: accountFigures.cashBalance,
            currentOwnedShares: ownedSharesData,
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