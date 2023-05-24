import React, { useState }
from 'react';
import './TradePage.scss';
import './StockResult';
import './SavedStock';
import SavedStock from './SavedStock';
import StockResult from './StockResult';
import SearchBar from './SearchBar/searchbar';


function TradePage({toggleModal, modalContents, setModalContents, getStockPriceQuote, sharesOwnedByUser}){

    const [searchResults, setSearchResults] = useState([]);

    return (
        
        <div className='container trade-page'>
            <div className='row search-row'>
                <div className='col-12'>
                    <h1>TradePage</h1>
                    <p>Search for stocks in publicly traded companies here.</p>
                    <SearchBar
                        setSearchResults={setSearchResults}
                    />
                </div>
            </div>
            <div className='row stocks-row'>
                <div className='col-12 col-lg-7'>
                    <h3>Results</h3>

                    {Array.isArray(searchResults) ? searchResults.map(function (result, index) {
                        return (
                            <StockResult    
                                key={index}
                                toggleModal={toggleModal}
                                modalContents={modalContents}              
                                setModalContents={setModalContents}
                                symbol={result.symbol}
                                company={result.name}
                                getStockPriceQuote={getStockPriceQuote}
                                sharesOwnedByUser={sharesOwnedByUser}
                            />
                        )
                        }) : null
                    }

                </div>
            </div>

        </div>
    )
}

export default TradePage;