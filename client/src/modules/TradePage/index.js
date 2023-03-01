import React, {useEffect, useState } from 'react';
import './tradePage.scss';
import BalanceSummary from './BalanceSummary.js';
import HoldingsTable from './HoldingsTable.js';

const TradePage = props => {
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

export default TradePage;