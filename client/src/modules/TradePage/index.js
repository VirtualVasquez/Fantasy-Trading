import React, {useEffect, useState } from 'react';
import './TradePage.scss';
import './StockResult';
import './SavedStock';
import SavedStock from './SavedStock';
import StockResult from './StockResult';
import Modal from '../common/Modal';

const TradePage = props => {
    
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
        <div className='container trade-page'>
            <div className='row search-row'>
                <div className='col-12'>
                    <h1>TradePage</h1>
                    <p>Search for stocks in publicly traded companies here.</p>
                    <form>
                        <div className="form-group">
                            <input placeholder='What are you buying today?'></input>
                            <button className="btn btn-light">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='row stocks-row'>
                <div className='col-12 col-lg-7'>
                    <h3>Results</h3>
                    <StockResult 
                        toggleModal={toggleModal}              
                        setModalContents={setModalContents}
                    />

                </div>
                <div className='col-12 col-lg-5'>
                    <h3>Saved Stocks</h3>
                    <SavedStock 
                        toggleModal={toggleModal}            
                        setModalContents={setModalContents}
                    />
                </div>
            </div>
            {showModal ? 
                <Modal 
                    toggleModal={toggleModal}
                /> 
            : null}
        </div>
    )
}

export default TradePage;