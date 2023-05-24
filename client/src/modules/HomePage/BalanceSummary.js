import React from 'react';

function BalanceSummary({ accountFigures })  {

    function formatToUS(string){
        return (Number(string)).toLocaleString('en-US', {style:'currency', currency: 'USD'})
    }
    
    function formatToPercent (value){
        const numericValue = Number(value); // Convert the value to a number

        if(isNaN(numericValue)){
            return '0.00%'
        }
        return (value).toFixed(4) + '%';
    }

    return(
        <div>
            <h2>Account Summary</h2>
            <table className="table table-striped balance-table">
                <thead>
                    <tr>
                        <th scope="col">Account Value</th>
                        <th scope="col">Cash Balance</th>
                        <th scope="col">Market Value</th>
                        <th scope="col">Base Cost</th>
                        <th scope="col">Gain/Loss</th>
                    </tr>            
                </thead>
                <tbody >
                    <tr>
                        <td className="account-value">
                            {formatToUS(accountFigures.accountValue)}
                        </td>
                        <td className="cash-balance">
                            {formatToUS(accountFigures.cashBalance)}
                        </td>
                        <td className="market-value">
                            {formatToUS(accountFigures.marketValue)}
                        </td>
                        <td className="base-cost">
                            {formatToUS(accountFigures.baseCost)}
                        </td>
                        <td className={`gain-loss ${ (accountFigures.marketValue - accountFigures.baseCost) < 0 ? 'negative' : 'positive'}`}>
                            {formatToUS(accountFigures.gainLoss.netCash)}
                            &nbsp;
                            ({formatToPercent(accountFigures.gainLoss.netPercent)})
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
    
}

export default BalanceSummary;