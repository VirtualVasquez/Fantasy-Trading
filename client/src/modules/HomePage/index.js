import { useState, useEffect } from "react";
import './HomePage.scss';
import BalanceSummary from './BalanceSummary.js';
import HoldingsTable from './HoldingsTable/index.js';
import axios from "axios";




function HomePage({accessToken, toggleModal, setModalContents}) {

    const [userTransactions, setUserTransactions] = useState([]);
    const [accountFigures, setAccountFigures] = useState({
        accountValue: 0,
        cashBalance: 0,
        marketValue: 0,
        baseCost: 0,
        gainLoss: {
            netCash: "-$1.00",
            netPercent: "-1.0%"
        }
    });

    const accountFunctions = {
        setAccountValue(){
            //accountFigures.cashBalance + accountFigures.marketValue
                //but because ^this^ won't be defined at time of running
                //this.setCashBalance() + this.setMarketValue();
        },
        setCashBalance(){
            return getTransactionTypeTotal('DEPOSIT') + getTransactionTypeTotal('SELL') - getTransactionTypeTotal('WITHDRAWAL') - getTransactionTypeTotal('BUY');
        },
        setMarketValue(){
            //get all BUY transactions made
            //get all SELL transactions made
            //if "X" company is both in BUY and SELL
                //for each company with both
                    //"BUY" shares minus "SELL" shares
            //for each company (with now calculated total shares)
                //total shares multiplied by current market price
            //Add all market values for all shares
        },
        setBaseCost(){
            return getTransactionTypeTotal("BUY") - getTransactionTypeTotal("SELL");
        },
        setGainLoss(){
            //IN THIS ORDER
            //setBaseCost() - setMarketValue()
            //result should be something like {netCash: "valueX", netPercent: "valueY"}
        }
    }

    async function getTransactions(token){
        try {
            const response = await axios.get('http://localhost:3001/transactions', {
                params: {
                    accessToken: token
                }
            });
            //return the response to be present/altered in the frontend
            setUserTransactions(response.data)
        } catch (error){
            console.error(error);
        }
    }

    function getTransactionTypeTotal(typeOfTransaction){

        let specifiedType;
        let total;

        if(typeOfTransaction === 'DEPOSIT'){
            specifiedType = 'DEPOSIT'
        }
        if(typeOfTransaction === 'WITHDRAWAL'){
            specifiedType = 'WITHDRAWAL'
        }
        if(typeOfTransaction === 'BUY'){
            specifiedType = 'BUY'
        }
        if(typeOfTransaction === 'SELL'){
            specifiedType = 'SELL'
        }
        const transactions = userTransactions.filter(transaction => transaction.transaction_type === specifiedType);
        const prices = transactions.map(transaction => parseFloat(transaction.price));
        return total = prices.reduce((total, currentValue) => total + currentValue, 0);
    }

    useEffect(() => {
        getTransactions(accessToken);
        setAccountFigures({
            ...accountFigures,
            cashBalance: accountFunctions.setCashBalance(),
            baseCost: accountFunctions.setBaseCost(),
        })        
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