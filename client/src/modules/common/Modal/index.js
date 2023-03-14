import React from 'react';
import './Modal.scss';

const Modal = props => {
    return(
    <div className="modal-div" id="modal">
        <h2>Modal Window</h2>
        <div className="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non fuga omnis a sed impedit explicabo accusantium nihil doloremque consequuntur.</div>
        <div className="actions">
            <button className="toggle-button">OK</button>
        </div>
    </div>
    )
}

export default Modal;