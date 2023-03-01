import React, {useEffect, useState } from 'react';


const SavedStock = props => {
    return (
    <div class="card">
        <div class="card-header">
            <span>Microsoft Corp</span>
            <span>(MSFT)</span>
            <span> - </span>
            <span>Price: $249.42</span>  
        </div>
        <div class="card-body">
            <div className='container'>
                <div className='row'>

                    <div className='col-6'>
                    Today's Change
                    -$0.74 (-0.3%)
                    </div>
                    <div className='col-6'>
                    Day High|Low
                    $251.49|$248.73
                    </div>
                    <div className='col-6'>
                    Previous Close $250.16
                    </div>
                    <div className='col-6'>
                    Open Price $249.07
                    </div>

                </div>
                <div className='row'>
                    <button class="btn btn-success">Trade</button>
                    <button class="btn btn-secondary">Unsave</button>
            
                </div>
            </div>




        </div>
    </div>
    )
}

export default SavedStock;