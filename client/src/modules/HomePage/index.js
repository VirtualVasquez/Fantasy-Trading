import React
// , {useEffect, useState } 
from 'react';
import './HomePage.scss';
import BalanceSummary from './BalanceSummary.js';
import HoldingsTable from './HoldingsTable/index.js';

const HomePage = props => {
    
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