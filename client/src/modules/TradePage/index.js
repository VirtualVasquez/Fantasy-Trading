import React
, {useEffect, useState }
from 'react';
import './TradePage.scss';
import './StockResult';
import './SavedStock';
import SavedStock from './SavedStock';
import StockResult from './StockResult';
import axios from "axios";


function TradePage(props){

    const [searchResults, setSearchResults] = useState([]);
    const [savedSearches, setSavedSearches] = useState([]);


    async function executeSearch(userQuery){

        try{
            const response = await axios.get('/symbol-lookup', {
                params:{
                    q: userQuery,
                }
            })
            setSearchResults(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    
    useEffect(() => {}, []);
    
    return (
        <div className='container trade-page'>
            <div className='row search-row'>
                <div className='col-12'>
                    <h1>TradePage</h1>
                    <p>Search for stocks in publicly traded companies here.</p>
                    <form>
                        <div className="form-group">
                            <input placeholder='What are you buying today?'></input>
                            <button className="btn btn-light">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='row stocks-row'>
                <div className='col-12 col-lg-7'>
                    <h3>Results</h3>
                    <StockResult 
                        toggleModal={props.toggleModal}              
                        setModalContents={props.setModalContents}
                    />

                </div>
                <div className='col-12 col-lg-5'>
                    <h3>Saved Stocks</h3>
                    <SavedStock 
                        toggleModal={props.toggleModal}            
                        setModalContents={props.setModalContents}
                    />
                </div>
            </div>

        </div>
    )
}

export default TradePage;