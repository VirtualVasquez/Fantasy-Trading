import React from 'react';

const HoldingsTable = props => {
    return(
        <div className="holdings-table">
            <h2>My Assets</h2>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Price</th>
                        {/* percentage is value per share invested, divided by current price (~sorta) */}
                    <th scope="col">Performance</th>
                        {/* Performance is net difference between dollars spent and dollars earned/lost */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" className="name-and-symbol">
                            <p>Amazon.com</p>
                            <p>AMZN</p>
                        </th>
                        <td className="balance-value">
                            <p>$10,000.00</p>
                            <p>10 Shares</p>
                        </td>
                        <td className="price-value">
                            <p>$1,000.00</p>
                            <p className="positive">+50.00%</p>
                        </td>
                        <td className="performance-value positive">
                            +$5,000.00
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="name-and-symbol">
                            <p>Microsoft Corp</p>
                            <p>MSFT</p>
                        </th>
                        <td className="balance-value">
                            <p>$5,000.00</p>
                            <p>100 Shares</p>
                        </td>
                        <td className="price-value">
                            <p>$50.00</p>
                            <p className="negative">-50.00%</p>
                        </td>
                        <td className="performance-value negative">
                            -$5,000.00
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    )
    
}

export default HoldingsTable;