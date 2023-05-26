import React, { useState }
from 'react';
import './tradepage.scss';
import StockResult from './StockResult';
import SearchBar from './SearchBar/searchbar';


function TradePage({toggleModal, modalContents, setModalContents, getStockPriceQuote, sharesOwnedByUser}){

    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false);

    return (
        
        <div className='container trade-page'>
            <div className='row search-row'>
                <div className='col-12'>
                    <h1>TradePage</h1>
                    <p>Search for stocks in publicly traded companies here.</p>
                    <SearchBar
                        setSearchResults={setSearchResults}
                        setNoResults={setNoResults}
                    />
                </div>
            </div>
            <div className='row stocks-row'>
                <div className='col-12 col-lg-8 offset-lg-2'>
                
                {Array.isArray(searchResults) 
                    && searchResults.length 
                    ? <h3>Results</h3> 
                    : null
                }
                
                {noResults 
                    ? <p>Sorry, no results found</p> 
                    : null
                }

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