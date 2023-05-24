import { useState, useEffect } from 'react';
import HoldingsRow from './HoldingsRow';


const HoldingsTable = ({toggleModal, setModalContents, userTransactions, sharesOwnedByUser, getStockPriceQuote, getTransactionTypeTotal, formatToUS, formatToPercent}) => {

    const [userStockHoldings, setUserStockHoldings] = useState([]);

    async function getUserStockHoldingsInfo() {
      const trades = userTransactions.filter(transaction => transaction.nyse_symbol !== null);
      const uniqueSymbols = [...new Set(trades.map(trade => trade.nyse_symbol))];
    
      const updatedHoldings = [];
    
      for (let i = 0; i < uniqueSymbols.length; i++) {
        let stockHolding = {
          nyse_symbol: uniqueSymbols[i],
          company_name: trades.find(obj => obj.nyse_symbol === uniqueSymbols[i]).company_name,
          sharesOwned: 0,
          marketValue: 0,
          baseCost: 0,
          gainLoss: {
            netCash: 0,
            netPercent: 0
          }
        };
    
        stockHolding.sharesOwned = await sharesOwnedByUser(uniqueSymbols[i]);
    
        const stockQuote = await getStockPriceQuote(uniqueSymbols[i]);
        const stockPrice = stockQuote.c;
        stockHolding.marketValue = stockPrice * stockHolding.sharesOwned;
    
        const stockSpecificTrades = trades.filter(transaction => transaction.nyse_symbol === uniqueSymbols[i]);
        stockHolding.baseCost = getTransactionTypeTotal("BUY", stockSpecificTrades) - getTransactionTypeTotal("SELL", stockSpecificTrades);
    
        stockHolding.gainLoss.netCash = stockHolding.marketValue - stockHolding.baseCost;
        stockHolding.gainLoss.netPercent = stockHolding.gainLoss.netCash / stockHolding.baseCost;
    
        updatedHoldings.push(stockHolding);
      }
    
      setUserStockHoldings(updatedHoldings);
    }

    useEffect(() => {
      getUserStockHoldingsInfo();
    }, [userTransactions]);
    
    useEffect(() => {
      console.log(userStockHoldings);
    }, [userStockHoldings]);
      
    return(
        <div className="holdings-table">
            <h2>My Assets</h2>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">Symbol</th>
                        <th scope="col">Name</th>
                        <th scope="col">Shares</th>
                        <th scope="col">Market Value</th>
                        <th scope="col">Base Cost</th>
                        <th scope="col">Gain/Loss</th>
                    </tr>            
                </thead>
                <tbody>
                    {Array.isArray(userStockHoldings) ? userStockHoldings.map(function (stock, index){
                        return(
                            <HoldingsRow
                                key={index}
                                toggleModal={toggleModal}
                                setModalContents={setModalContents}
                                symbol={stock.nyse_symbol}
                                name={stock.company_name}
                                sharesOwned={stock.sharesOwned}
                                marketValue={stock.marketValue}
                                baseCost={stock.baseCost}
                                gainLoss={stock.gainLoss}
                                formatToUS={formatToUS}
                                formatToPercent={formatToPercent}
                            />
                        )
                    }) : null}

                </tbody>
            </table>
        </div>
    )
    
}

export default HoldingsTable;