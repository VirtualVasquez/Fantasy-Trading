import React from 'react';
import HoldingsRow from './HoldingsRow';

//needed logic
    //map user's assets to Holdings Row

const HoldingsTable = props => {
    return(
        <div className="holdings-table">
            <h2>My Assets</h2>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">Symbol</th>
                        <th scope="col">Name</th>
                        <th scope="col">Shares</th>
                        <th scope="col">Market Value</th>
                        <th scope="col">Base Cost</th>
                            {/* percentage is value per share invested, divided by current price (~sorta) */}
                        <th scope="col">Gain/Loss</th>
                            {/* Performance is net difference between dollars spent and dollars earned/lost */}
                        {/* <th scope="col"></th> */}
                    </tr>            
                </thead>
                <tbody>
                    <HoldingsRow 
                        toggleModal={props.toggleModal}setModalContents={props.setModalContents}
                    />
                </tbody>
            </table>
        </div>
    )
    
}

export default HoldingsTable;