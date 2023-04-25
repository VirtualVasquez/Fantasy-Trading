import React
// , {useEffect, useState } 
from 'react';
import './StockResult.scss';


const StockResult = props => {
    return (
    <div className="card stock-result"> 
        <div className="card-body stock-result-body">
            <p className="comp-info">
                <span className="comp-symbol">
                    ABC
                </span>
                &nbsp;-&nbsp;
                <span className="comp-name">
                    Google
                </span>
            </p>
            <button 
                className="btn btn-primary"
                onClick={props.toggleModal}
            >
                Quote
            </button>            
        </div>
    </div>
    )
}

export default StockResult;