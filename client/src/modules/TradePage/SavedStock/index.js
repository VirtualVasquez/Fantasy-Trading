import React, {useEffect, useState } from 'react';
import './SavedStock.scss';

const SavedStock = props => {
    return (
    <div className="card saved-stock">
        <div className="card-header">
            <div>
                <p>
                    <span className="comp comp-name">Microsoft Corp</span> 
                    <span className="comp comp-symbol"> (MSFT)</span>
                </p>
            </div>
            <div>
                <p>Price: <span>$249.42</span></p>
            </div>
        </div>
        <div className="card-body">
            <div className='container'>
                <div className='row'>
                    <div className='col-5'>
                        <div className='day-change'>
                            <div className='label day-change-label'>
                                Today's Change
                            </div>
                            <div className='value day-change-value'>
                                <span className='day-change-dollars'>
                                    -$0.74
                                </span>
                                <span className='day-change-percentage'>
                                    (-0.3%)
                                </span> 
                            </div>
                        </div>
                    </div>
                    <div className='col-7 saved-stats'>
                        <p className="stat high-low-stat">
                            <span className="label high-low-label">
                            Day High | Low
                            </span>
                            <span className="value high-low-value">
                                $251.49 | $248.73
                            </span>
                        </p>
                        <p className="stat previous-close-stat">
                            <span className="label previous-close-label">
                            Previous Close
                            </span>
                            <span className="value previous-close-value">
                            $250.16
                            </span>
                        </p>
                        <p className="stat open-price-stat">
                            <span className="label open-price-label">
                            Open Price
                            </span>
                            <span className="value open-price-value">
                            $249.07
                            </span>
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <button
                     className="btn btn-success col-6"
                     onClick={props.toggleModal}
                    >
                        Trade
                    </button>
                    <button 
                    className="btn btn-secondary col-6"
                    >
                        Unsave
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default SavedStock;