import React, { Component, createRef } from 'react'
import './Draggable.scss'

export class Draggable extends Component {
    constructor(props) {
        super(props)

        const { title, children } = props

        let showHideClassName = this.props.show ? "modal display-block draggable" : "modal display-none draggable";
        showHideClassName += this.props.active ? " active" : ''
        showHideClassName += this.props.isMaximized ? " maximized" : ''
        this.state = {
            pos: this.props.pos,
            dim: this.props.dim,
            dragging: false,
            rel: null, // position relative to the cursor
            className: showHideClassName,
            isMaximized: this.props.isMaximized,
            show: this.props.show,
            active: this.props.active
        }

        this.myRef = createRef();

        console.log('Construct Draggable...');
    }

    componentDidUpdate(props, state) {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onMouseMove.bind(this))
            document.addEventListener('mouseup', this.onMouseUp.bind(this))
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onMouseMove.bind(this))
            document.removeEventListener('mouseup', this.onMouseUp.bind(this))
        }

        // if (!this.state.dragging && state.dragging) {
        //     document.removeEventListener('mousemove', this.onMouseMove.bind(this))
        //     document.removeEventListener('mouseup', this.onMouseUp.bind(this))
        // }
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

    getOffsetY() {
        // console.log(this.myRef.current.offsetTop); 
        return this.myRef.current.offsetTop
    }

    getOffsetX() {
        // console.log(this.myRef.current.offsetTop); 
        return this.myRef.current.offsetLeft
    }

    render() {
        const { pos, dim } = this.props
        return (
            <div style={{
                left: this.state.pos.left,
                top: this.state.pos.top,
                width: this.state.dim.width,
                height: this.state.dim.height,
                position: 'absolute',
            }} className={this.state.className} onMouseDown={this.onMouseDown.bind(this)} ref={this.myRef} >
                <section className="modal-main">
                    <div className="window__titlebar ui-draggable-handle" onDrag={this.handleDrag.bind(this)} >

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
                                {/* <a className="window__maximize" href="#" onClick={maximizePanel}></a> // */}
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
            </div>
        )
    }
}

export default Draggable