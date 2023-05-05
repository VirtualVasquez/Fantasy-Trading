import React from 'react';

const BalanceSummary = props => {
    return(
        <div className="balance-table">
            <h2>Account Summary</h2>
            <table className="table table-striped table">
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
                    <td className="account-value">
                        $100,000
                    </td>
                    <td className="cash-balance">
                        $100,000
                    </td>
                    <td className="market-value">
                        $0
                    </td>
                    <td className="base-cost">
                        $0
                    </td>
                    <td className="gain-loss">
                        +$0.00(+0.0%)
                    </td>

                </tbody>
            </table>
        </div>
    )
    
}

export default BalanceSummary;