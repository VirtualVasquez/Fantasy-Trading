import { useState, useEffect } from "react";
import './HomePage.scss';
import BalanceSummary from './BalanceSummary.js';
import HoldingsTable from './HoldingsTable/index.js';
import axios from "axios";




const HomePage = props => {

    const { accessToken } = props;

    async function getTransactions(token){
        try {
            const response = await axios.get('http://localhost:3001/transactions', {
                params: {
                    accessToken: token
                }
            })
        } catch (error){
            console.error(error);
        }
    }
    

    useEffect(() => {
        getTransactions(accessToken);
    }, []);

    //axios request for user's transactions
        //make account summary end point
        //make post request
        //only market value needs to query finnhub for current price of all 

    
    return (
        <div className='container home-page'>
            <div className='row'>
                <div className='col-12'>
                    <BalanceSummary />
                </div>
                <div className='col-12'>
                    <HoldingsTable 
                        toggleModal={props.toggleModal}                  
                        setModalContents={props.setModalContents}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage;