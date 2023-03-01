import React, {useEffect, useState } from 'react';
import './HomePage.scss';
import BalanceSummary from './BalanceSummary.js';
import HoldingsTable from './HoldingsTable.js';

const HomePage = props => {
    return (
        <div className='container trade-page'>
            <div className='row'>
                <div className='col-12'>
                    <BalanceSummary />
                </div>
                <div className='col-12'>
                    <HoldingsTable />
                </div>     
            </div>

        </div>
    )
}

export default HomePage;