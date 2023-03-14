import React from 'react';
import './Modal.scss';

const Modal = props => {
    return(
    <div className="modal-div" id="modal">
        <div className="content">
            <h2>Modal Window</h2>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non fuga omnis a sed impedit explicabo accusantium nihil doloremque consequuntur.
            </p>
            <div className="actions">
                <button 
                    className="toggle-button"
                    onClick={props.toggleModal}
                >
                    OK
                </button>
            </div>
        </div>

    </div>
    )
}

export default Modal;