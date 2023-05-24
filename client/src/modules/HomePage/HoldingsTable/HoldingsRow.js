import React from 'react';

const HoldingsRow = ({toggleModal, setModalContents, symbol, name, sharesOwned, marketValue, baseCost, gainLoss, formatToUS, formatToPercent}) => {

    return(
        <tr className="stock-row" 
            onClick={toggleModal}
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