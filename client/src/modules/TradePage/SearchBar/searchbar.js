import React, {useState} 
from 'react';
import axios from "axios";

import './SearchBar.scss';


function SearchBar({setSearchResults}){

    const [searchQuery, setSearchQuery] = useState("");


    async function executeSearch(userQuery){
        try{
            const response = await axios.get('/symbol-lookup', {
                params:{
                    q: userQuery,
                }
            })
            setSearchResults(response.data.filter(stock => !stock.symbol.includes('.')));
        } catch (error) {
            console.error(error);
        }
    }

    function clearSearchQuery(){
        setSearchQuery("");
    }

    
    function handleSubmit(event){
        event.preventDefault();
        executeSearch(searchQuery);
    }

    return (
        <form>
            <div className="form-group">
                <input 
                    placeholder='What are you buying today?'
                    value={searchQuery}
                    onChange={e=>setSearchQuery(e.target.value)}
                >                    
                </input>
                <button 
                    disabled={!searchQuery}
                    className="btn btn-light"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                <button
                    disabled={!searchQuery}
                    className="btn btn-dark"
                    onClick={clearSearchQuery}
                >
                    Clear
                </button>
            </div>
        </form>
    )
}

export default SearchBar;