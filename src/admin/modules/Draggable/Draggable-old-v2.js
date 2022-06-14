import React, { useState, useEffect, useRef } from 'react'
import './Draggable.scss'

const Draggable = ({
    handleClose,
    handleMinimize,
    handleMaximize,
    title = 'New Panel',
    children,
    show = false,
    active = false,
    indexModal,
    isMaximized,
    // dimensions = { width: '70%', height: '70%' },
    ...props }) => 
{

    const [dimensions, setDimensions] = useState({ width: '70%', height: '70%' })
    const [layout, setLayout] = useState({ left: 0, top: 0 })
    const [rel, setRelativeLayout] = useState(null)
    const [dragging, setDragging] = useState(false)
    const myRef = React.createRef()

    const className = () => {
        let showHideClassName = show ? "modal display-block draggable" : "modal display-none draggable";
        showHideClassName += active ? " active" : ''
        showHideClassName += isMaximized ? " maximized" : ''

        return showHideClassName
    }

    useEffect(() => {
        console.log('Checking Dragging');
        if (dragging) {
            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        } else {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }
    }, []);

    const getOffsetY = () => {
        // console.log(this.myRef.current.offsetTop); 
        return myRef.current.offsetTop
    }

    const getOffsetX = () => {
        // console.log(this.myRef.current.offsetTop); 
        return myRef.current.offsetLeft
    }

    // calculate relative position to the mouse and set dragging=true
    const onMouseDown = (e) => {
        // only left mouse button
        if (e.button !== 0) return // console.log(this);  
        let pos = {
            top: getOffsetY(),
            left: getOffsetX(),
        } 
        // console.log(pos);
        // var pos = $(React.findDOMNode(this)).offset()
        setDragging(true)
        setRelativeLayout({
            left: e.pageX - pos.left,
            top: e.pageY - pos.top
        })
        // this.setState({
        //     dragging: true,
        //     rel: {
        //         x: e.pageX - pos.left,
        //         y: e.pageY - pos.top
        //     }
        // })
        e.stopPropagation()
        e.preventDefault()
    }

    const onMouseUp = (e) => {
        setDragging(false)
        e.stopPropagation()
        e.preventDefault()
    }

    const onMouseMove = (e) => {
        if (!dragging) return
        console.log({
            left: e.pageX - rel.left,
            top: e.pageY - rel.top
        });
        setLayout({
            left: e.pageX - rel.left,
            top: e.pageY - rel.top
        })
        e.stopPropagation()
        e.preventDefault()
    }

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
        <div style={{
            left: layout.left + 'px',
            top: layout.top + 'px',
            width: dimensions.width,
            height: dimensions.height,
            position: 'absolute',
        }} className={className()} onMouseDown={onMouseDown} ref={myRef} >
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
                            {/* <a className="window__maximize" href="#" onClick={maximizePanel}></a> // */}
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
            {/* <React.StrictMode > 
            {this.props.children style={{
                left: this.state.pos.x + 'px',
                top: this.state.pos.y + 'px'
            }} onMouseDown={this.onMouseDown}} */}
            {/* {this.props.children} */}
            {/* </React.StrictMode> */}
        </div>
    );
};

export default Draggable;