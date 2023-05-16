import React
// , {useEffect, useState } 
from 'react';
import './StockResult.scss';


function StockResult(props){

    // you might need to run another query here to get stock information 

    const{index, toggleModal, setModalContents, symbol, company } = props;

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
                onClick={toggleModal}
            >
                Quote
            </button>            
        </div>
    </div>
    )
}

export default StockResult;