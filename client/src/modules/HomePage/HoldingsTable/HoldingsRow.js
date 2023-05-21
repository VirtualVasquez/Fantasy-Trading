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
        <tr className="stock-row" 
            onClick={props.toggleModal}
        >
            <th scope="row" className="symbol">
                <p>AMZN</p>
            </th>
            <td className="company-name">
                <p>Amazon.com</p>
            </td>
            <td className="shares">
                <p>10</p>
            </td>
            <td className="market-value">
                <p>$1,000.00</p>
            </td>
            <td className="base-cost">
                <p>$1,000.00</p>
            </td>
            {/* assign 'postive' or 'negative' className */}
            <td className="gain-loss">
                <p>+$5,000.00 (+50.00%)</p>
                {/* assign 'postive' or 'negative' className */}
            </td>
            {/* <td className="trade-cell">
                <button 
                    className="btn btn-primary"
                    onClick={props.toggleModal}
                >
                    Trade
                </button>
            </td> */}
        </tr>
    )   
}

export default HoldingsRow;