import React, { useState } from 'react'
import './Modal.scss'

import { Draggable } from '../../modules';

const Modal = ({ handleClose, handleMinimize, handleMaximize, title = 'New Panel', layout = { left: 0, top: 0, width: '70%', height: '70%' }, children, ...props/* , show = false, active = false, indexModal */ }) => {
    const { show, active, isMaximized, indexModal } = { ...props }
    let showHideClassName = show ? "modal display-block draggable" : "modal display-none draggable";
    showHideClassName += active ? " active" : ''
    showHideClassName += isMaximized ? " maximized" : ''
    // const showHideClassName = "modal display-none";

    const cancelPanel = (e) => {
        handleClose(indexModal)
    }

    const hidePanel = (e) => {
        handleMinimize(indexModal)
    }

    const maximizePanel = (e) => {
        handleMaximize(indexModal, isMaximized)
    }

    const handleDrag = (e) => {
        console.log('Dragged...');
    }

    return (
        // const classBoxName = showHideClassName + ' draggable'
        <Draggable handle="#handle" initialPos={{ x: layout.left, y: layout.top, width: layout.width, height: layout.height }} className={showHideClassName} >
            {/* <div className={showHideClassName} data-modal={indexModal}> */}
                {/*  */}
                <section className="modal-main">
                    <div className="window__titlebar ui-draggable-handle" onDrag={handleDrag} >

                        <div className="actions-container window__controls window__controls--right">
                            <div className="window__controls window__controls--left">
                                <a className="window__icon" href="#"><i className="fa fa-folder"></i></a>
                            </div>
                            <span className="window__title">
                                {title}
                            </span>
                            <div className="window__controls window__controls--right">
                                <a className="window__minimize" href="#" onClick={hidePanel}><i className="fa fa-minus"></i></a>
                                <a className="window__resize" href="#" onClick={maximizePanel}>
                                    {isMaximized ? <i className="fa fa-window-restore"></i> : <i className="fa-solid fa-maximize"></i>}
                                </a>
                                {/* <a className="window__maximize" href="#" onClick={maximizePanel}></a> */}
                                <a className="window__close" href="#" onClick={cancelPanel}><i className="fa fa-close"></i></a>
                            </div>

                        </div>
                    </div>
                    {/* <div className='actions-container'>
                        <div className='panel-resize'>-</div>
                        <div className='panel-close' onClick={cancelPanel}>X</div>
                    </div> */}
                    <div className='admin-section'>
                        <div>
                            {children}
                        </div>
                    </div>
                </section>
                {/* </Draggable> */}
            {/* </div> */}
        </Draggable>
    );
};

export default Modal

// const Draggable = ({children, ...props}) => {
//     const [position, setPosition] = useState({ x: 0, y: 0 });

//     const trackPos = (data) => {
//         setPosition({ x: data.x, y: data.y });
//     };

//     return(
//         <Draggable onDrag={(e, data) => trackPos(data)}>
//             {children}
//            {/*  <div className="box">
//                 <div>Here's my position...</div>
//                 <div>
//                         x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
//                 </div>
//             </div> */}
//         </Draggable>
//     )
// }