import React from 'react';

//Needed logic
    //if trade button click, show trade modal
    //if value is positive
        //assign class of 'positive'
            //potentially also prepend '+' sign
    //if value is negative
        //assigned class of 'negative'
            //potenitally also prepend '-' sign


const HoldingsRow = props => {
    return(
        <tr className="stock-row">
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

                {/* assign 'postive' or 'negative' className */}
                <p className="positive net-percentage">
                    +50.00%
                </p>
            </td>

            {/* assign 'postive' or 'negative' className */}
            <td className="performance-value">
                +$5,000.00
            </td>
            <td className="trade-cell">
                <button className="btn btn-primary">
                    Trade
                </button>
            </td>
        </tr>
    )   
}

export default HoldingsRow;