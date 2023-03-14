import React, {useEffect, useState } from 'react';
import './HomePage.scss';
import BalanceSummary from './BalanceSummary.js';
import HoldingsTable from './HoldingsTable/index.js';
import Modal from '../common/Modal';

const HomePage = props => {
    
    const[ showModal, setShowModal]  = useState(false);
    const[ modalContents, setModalContents] = useState(null);

    const toggleModal = (e) => {
        console.log(showModal)
        e.preventDefault();
        if(showModal){
            setShowModal(false);
        } else {
            setShowModal(true);
        }
        
    }

    return (
        <div className='container home-page'>
            <div className='row'>
                <div className='col-12'>
                    <BalanceSummary />
                </div>
                <div className='col-12'>
                    <HoldingsTable 
                        toggleModal={toggleModal}                  
                        setModalContents={setModalContents}
                    />
                </div>
                {showModal ? 
                <Modal 
                toggleModal={toggleModal} 
                /> 
                : null}
                
            </div>
        </div>
    )
}

export default HomePage;