import React, {useEffect, useState } from 'react';
import './TradePage.scss';
import './StockResult';
import './SavedStock';
import SavedStock from './SavedStock';

const TradePage = props => {
    return (
        <div className='container trade-page'>
            <div className='row search-row'>
                <div className='col-12'>
                    <h1>TradePage</h1>
                    <p>Search for stocks in publicly traded companies here.</p>
                    <form>
                        <input></input>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
            <div className='row stocks-row'>
                <div className='col-4'>
                    <h3>Saved Stocks</h3>
                    <SavedStock />
                </div>
                <div className='col-8'>
                    <h3>Results</h3>

                </div>
            </div>
        </div>
    )
}

export default TradePage;