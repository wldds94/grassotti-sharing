import React, { createRef, useRef, useEffect, useState } from 'react'
import './Draggable.scss'
import { IoWarningOutline } from 'react-icons/io'
import Loader from '../Loader/Loader';

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
    posEnter,
    dimEnter = {
        width: '70%',
        height: '70%',
    },
    isLoading,
    // dimensions = { width: '70%', height: '70%' },
    ...props }) => {
    let showHideClassName = show ? "modal display-block draggable" : "modal display-none draggable";
    showHideClassName += active ? " active" : ''
    showHideClassName += isMaximized ? " maximized" : ''

    const boxRef = createRef()
    // const mountedRef = useRef();

    const [loading, setLoading] = useState(isLoading)
    // console.log(loading); // const loading = isLoading

    const [dragging, setDragging] = useState(false)
    useEffect(() => {
        // console.log('Check Drag..');
        // console.log('Ref: ', boxRef.current.dragging);
        // console.log('Dragging: ', dragging);
        if (dragging) {
            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        }       

        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }
    }, [dragging])

    const [rel, setRel] = useState(null)
    // useEffect(() => {
    //     mountedRef.current = rel
    // }, [rel])

    const [pos, setPos] = useState(posEnter)
    // const [dim, setPos] = useState(posEnter)
    useEffect(() => {
        // console.log('initPos: ', posEnter, pos);
        if (posEnter !== pos) {
            // console.log("Diversi");
            setPos(posEnter);
           
        } else { /* console.log("Uguali"); */ }

    }, [posEnter])

    const [dim, setDim] = useState(dimEnter)
    useEffect(() => {
        // console.log('initDim: ', dimEnter, dim);
        if (dimEnter === dim) {
            // console.log("Uguali");
        } else {
            // console.log("Diversi");
            setDim(dimEnter);
        }
        // setPos([pos]); // setDim([dim]);
    }, [dimEnter])

    const cancelPanel = (e) => {
        handleClose(indexModal)
    }

    const hidePanel = (e) => {
        handleMinimize(indexModal)
    }

    const maximizePanel = (e) => {
        handleMaximize(indexModal, isMaximized)
    }

    // const setLoader = (load) => {
    //     console.log('setLoader...');
    //     setLoading(load)
    // }

    // calculate relative position to the mouse and set dragging=true
    const onMouseDown = (e) => {
        // only left mouse button
        // console.log(e);
        if (e.button !== 0) return // console.log(this);  
        let posRel = {
            top: boxRef.current.offsetTop, // getOffsetY(),
            left: boxRef.current.offsetLeft // getOffsetX(),
        } // console.log(pos);
        // console.log('POSREL Verify: ', e.pageX, posRel.left, e.pageY, posRel.top);
        // console.log('POSREL: ', posRel);
        let newRel = {
            left: e.pageX - posRel.left,
            top: e.pageY - posRel.top
        }
        // console.log('POS-NEW-REL Verify: ', newRel);
        setRel(newRel)
        setDragging(true)
        e.stopPropagation()
        e.preventDefault()
    }

    // getOffsetY = () => {
    //     // console.log(this.myRef.current.offsetTop); 
    //     return boxRef.current.offsetTop
    // }

    // getOffsetX = () => {
    //     // console.log(this.myRef.current.offsetTop); 
    //     return boxRef.current.offsetLeft
    // }

    const onMouseMove = (e) => {
        if (!dragging) return
        // console.log('Mouse Moving'); // console.log('Old Pos: ', rel, 'Ref: ', mountedRef.current); // console.log('Pos Verify: ', e.pageX, rel.left, e.pageY, rel.top); // console.log('Pos Verify MINUS: ', Number(e.pageX) - Number(rel.left) );
        const newPos = {
            left: e.pageX - rel.left,
            top: e.pageY - rel.top
        }
        setPos(newPos) // console.log('New Pos: ', newPos); // console.log('New Pos CONSTANT: ', pos);
        e.stopPropagation()
        e.preventDefault()
    }

    const onMouseUp = (e) => {
        // console.log('Mouse Upping');
        e.stopPropagation()
        e.preventDefault()
        setDragging(false)
    }

    return (
        <div style={{
            left: pos.left + 'px',
            top: pos.top + 'px',
            width: dim.width,
            height: dim.height,
            position: 'absolute',
        }} className={showHideClassName} data-modal={indexModal} ref={boxRef}>
            {/* <div>{dim.width} - {dim.height}</div> */}
            <section className="modal-main">
                <div className="window__titlebar ui-draggable-handle" /* onDrag={handleDrag} */onMouseDown={onMouseDown} >
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

                <div className='admin-section'>
                    <div>
                        {children}
                    </div>
                    { loading ? <Loader /> : '' }
                   {/*  <Loader /> */}
                </div>

            </section>

        </div>
    )
}

export default Draggable