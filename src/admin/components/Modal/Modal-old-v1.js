import React, { useState } from 'react'
import './Modal.scss'

const Modal = ({ handleClose, show = false/* , children */ }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div>
            Modal
            {/* <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button type="button" onClick={handleClose}>
                    Close
                </button>
            </section>
        </div> */}
        </div>
    );
};

export default Modal