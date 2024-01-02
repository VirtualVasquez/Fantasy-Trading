import React, {useState} 
from 'react';
import axios from '../../../helpers/axiosConfig';

import './SearchBar.scss';


function SearchBar({setSearchResults, setNoResults}){

    const [searchQuery, setSearchQuery] = useState("");


    async function executeSearch(userQuery){
        try{
            const response = await axios.get('/symbol-lookup', {
                params:{
                    q: userQuery,
                }
            })
            if(response.data.length > 0){
                setSearchResults(response.data.filter(stock => !stock.symbol.includes('.')));
                setNoResults(false);
            }
            if(response.data.length === 0){
                setSearchResults([])
                setNoResults(true)
            }
        } catch (error) {
            console.error(error);
        }
    }

    function clearSearchQuery(){
        setSearchQuery("");
        setNoResults(false);
    }

    
    function handleSubmit(event){
        event.preventDefault();
        executeSearch(searchQuery);
    }

    return (
        <form className='search'>
            <div className="form-group row">
                    <input 
                        placeholder='What are you buying today?'
                        value={searchQuery}
                        onChange={e=>setSearchQuery(e.target.value)}
                    >                    
                    </input>
                    <button 
                        disabled={!searchQuery}
                        className="btn btn-success"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    <button
                        disabled={!searchQuery}
                        className="btn btn-light"
                        onClick={clearSearchQuery}
                    >
                        Clear
                    </button>
            </div>
        </form>
    )
}

export default SearchBar;