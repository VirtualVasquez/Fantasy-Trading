import React from 'react';

const HoldingsRow = ({toggleModal, modalContents, setModalContents, symbol, name, sharesOwned, marketValue, baseCost, gainLoss, formatToUS, formatToPercent, getStockPriceQuote}) => {

    async function handleGetQuote(e){
        try{
            const[stockQuoteData] = await Promise.all([
                getStockPriceQuote(symbol)
            ]);

            
            setModalContents({
                ...modalContents,
                symbol: symbol,
                companyName: name,
                currentOwnedShares: sharesOwned,
                currentPrice: stockQuoteData.c,
                priceChange: stockQuoteData.d,
                percentChange: stockQuoteData.dp,
                highestPriceToday: stockQuoteData.h,
                lowestPriceToday: stockQuoteData.l,
                openPriceToday: stockQuoteData.o,
                previousClosePrice: stockQuoteData.pc,
                timestamp: stockQuoteData.t
            })


            toggleModal(e);

        } catch (error){
            console.error(error);
        }
    }

    return(
        <tr className="stock-row" 
            onClick={handleGetQuote}
        >
            <th scope="row" className="symbol">
                <p>{symbol}</p>
            </th>
            <td className="company-name">
                <p>{name}</p>
            </td>
            <td className="shares">
                <p>{sharesOwned}</p>
            </td>
            <td className="market-value">
                <p>{formatToUS(marketValue)}</p>
            </td>
            <td className="base-cost">
                <p>{formatToUS(baseCost)}</p>
            </td>
            {/* assign 'postive' or 'negative' className */}
            <td className="gain-loss">
                <p>{formatToUS(gainLoss.netCash)} ({formatToPercent(gainLoss.netPercent)})</p>
            </td>
        </tr>
    )   
}

export default HoldingsRow;