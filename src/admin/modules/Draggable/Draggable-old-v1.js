import React, { Component } from 'react'
import './Draggable.scss'

export class Draggable extends Component {
    constructor(props) {
        super(props)

        let showHideClassName = this.props.show ? "modal display-block draggable" : "modal display-none draggable";
        showHideClassName += this.props.active ? " active" : ''
        showHideClassName += this.props.isMaximized ? " maximized" : ''
        this.state = {
            pos: this.props.layout,
            dragging: false,
            rel: null, // position relative to the cursor
            className: showHideClassName,
            isMaximized: this.props.isMaximized,
        }

        this.myRef = React.createRef();
    }

    static getDerivedFromProps(props, state) {
        if (props.initialPos !== state.pos) {
            return {
                pos: props.initialPos,
            }
        } else {
            return null
        }
    }

    componentDidUpdate(props, state) {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onMouseMove.bind(this))
            document.addEventListener('mouseup', this.onMouseUp.bind(this))
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onMouseMove.bind(this))
            document.removeEventListener('mouseup', this.onMouseUp.bind(this))
        }
    }

    getOffsetY() {
        // console.log(this.myRef.current.offsetTop); 
        return this.myRef.current.offsetTop
    }

    getOffsetX() {
        // console.log(this.myRef.current.offsetTop); 
        return this.myRef.current.offsetLeft
    }

    // calculate relative position to the mouse and set dragging=true
    onMouseDown(e) {
        // only left mouse button
        if (e.button !== 0) return // console.log(this);  
        let pos = {
            top: this.getOffsetY(),
            left: this.getOffsetX(),
        } // console.log(pos);
        // var pos = $(React.findDOMNode(this)).offset()
        this.setState({
            dragging: true,
            rel: {
                x: e.pageX - pos.left,
                y: e.pageY - pos.top
            }
        })
        e.stopPropagation()
        e.preventDefault()
    }

    onMouseUp(e) {
        this.setState({ dragging: false })
        e.stopPropagation()
        e.preventDefault()
    }

    onMouseMove(e) {
        if (!this.state.dragging) return
        this.setState({
            pos: {
                x: e.pageX - this.state.rel.x,
                y: e.pageY - this.state.rel.y
            }
        })
        e.stopPropagation()
        e.preventDefault()
    }

    cancelPanel(e) {
        this.props.handleClose(this.props.indexModal)
    }

    hidePanel(e) {
        this.props.handleMinimize(this.props.indexModal)
    }

    maximizePanel(e) {
        this.props.handleMaximize(this.props.indexModal, this.state.isMaximized)
    }

    handleDrag(e) {
        console.log('Dragged...');
    }

    render() {
        return (

            <div style={{
                left: this.state.pos.left,
                top: this.state.pos.top,
                width: this.state.pos.width,
                height: this.state.pos.height,
                position: 'absolute',
            }} className={this.state.className} onMouseDown={this.onMouseDown.bind(this)} ref={this.myRef} >
                <section className="modal-main">
                    <div className="window__titlebar ui-draggable-handle" onDrag={this.handleDrag} >

                        <div className="actions-container window__controls window__controls--right">
                            <div className="window__controls window__controls--left">
                                <a className="window__icon" href="#"><i className="fa fa-folder"></i></a>
                            </div>
                            <span className="window__title">
                                {this.props.title}
                            </span>
                            <div className="window__controls window__controls--right">
                                <a className="window__minimize" href="#" onClick={this.hidePanel.bind(this)}><i className="fa fa-minus"></i></a>
                                <a className="window__resize" href="#" onClick={this.maximizePanel.bind(this)}>
                                    {this.state.isMaximized ? <i className="fa fa-window-restore"></i> : <i className="fa-solid fa-maximize"></i>}
                                </a>
                                {/* <a className="window__maximize" href="#" onClick={maximizePanel}></a> */}
                                <a className="window__close" href="#" onClick={this.cancelPanel.bind(this)}><i className="fa fa-close"></i></a>
                            </div>

                        </div>
                    </div>
                    {/* <div className='actions-container'>
                        <div className='panel-resize'>-</div>
                        <div className='panel-close' onClick={cancelPanel}>X</div>
                    </div> */}
                    <div className='admin-section'>
                        <div>
                            {this.props.children}
                        </div>
                    </div>
                </section>
                {/* <React.StrictMode > 
                {this.props.children style={{
                    left: this.state.pos.x + 'px',
                    top: this.state.pos.y + 'px'
                }} onMouseDown={this.onMouseDown}} */}
                {this.props.children}
                {/* </React.StrictMode> */}
            </div>
        )
    }
}

export default Draggable