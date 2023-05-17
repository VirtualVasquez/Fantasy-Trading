import React from 'react';
import './Modal.scss';

function Modal({modalContents, toggleModal}) {
    
    const {symbol, sharePrice, availableFunds, currentOwnedShares} = modalContents;

    function formatToUS(value){
        return value.toLocaleString('en-US', {
            style: 'currency', 
            currency: 'USD',
          })
    }

    return(
    <div className="modal-div" id="modal">
        <div className="content">
            <h2>Modal Window</h2>
            <p>{symbol}</p>
            <p>{formatToUS(sharePrice)}</p>
            <p>{formatToUS(availableFunds)}</p>
            <p>{currentOwnedShares}</p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non fuga omnis a sed impedit explicabo accusantium nihil doloremque consequuntur.
            </p>
            <div className="actions">
                <button 
                    className="toggle-button"
                    onClick={toggleModal}
                >
                    OK
                </button>
            </div>
        </div>

    </div>
    )
}

export default Modal;