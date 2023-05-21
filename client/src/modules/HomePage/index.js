import { useEffect } from "react";
import './HomePage.scss';
import BalanceSummary from './BalanceSummary.js';
import HoldingsTable from './HoldingsTable/index.js';




function HomePage({accessToken, toggleModal, modalContents, setModalContents, getTransactions, userTransactions, accountFigures, setAccountFigures, accountFunctions}) {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userCashBalance = accountFunctions.setCashBalance();
                const userBaseCost = accountFunctions.setBaseCost();
                const userMarketValue = accountFunctions.setMarketValue();
            
                await Promise.all([userCashBalance, userBaseCost, userMarketValue]).then(([userCashBalance, userBaseCost, userMarketValue]) => {
                    console.log(userMarketValue);


                    setAccountFigures({
                        ...accountFigures,
                        cashBalance: userCashBalance,
                        baseCost: userBaseCost,
                        marketValue: userMarketValue
                    })
                })

            } catch (error){
                console.error(error);
            }
        }

        fetchData();
 
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userTransactions]);


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
                        modalContents={modalContents}               
                        setModalContents={setModalContents}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage;