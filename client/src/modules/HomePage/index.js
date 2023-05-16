import { useState, useEffect } from "react";
import './HomePage.scss';
import BalanceSummary from './BalanceSummary.js';
import HoldingsTable from './HoldingsTable/index.js';
import axios from "axios";




function HomePage({accessToken, toggleModal, modalContents, setModalContents, getTransactions, userTransactions, accountFigures, setAccountFigures, accountFunctions}) {

    useEffect(() => {
        getTransactions(accessToken);
        setAccountFigures({
            ...accountFigures,
            cashBalance: accountFunctions.setCashBalance(),
            baseCost: accountFunctions.setBaseCost(),
        })
        console.log(userTransactions)
        console.log(accountFigures)        
    }, []);

    //axios request for user's transactions
        //make account summary end point
        //make post request
        //only market value needs to query finnhub for current price of all 

    
    return (
        <div className='container home-page'>
            <div className='row'>
                <div className='col-12'>
                    <BalanceSummary 
                        accountFigures={accountFigures}
                    />
                </div>
                <div className='col-12'>
                    <HoldingsTable 
                        toggleModal={toggleModal}                  
                        setModalContents={setModalContents}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage;