import React, { Component } from 'react'
import './Draggable.scss'

export class Draggable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pos: this.props.initialPos,
            dragging: false,
            rel: null // position relative to the cursor
        }

        this.myRef = React.createRef();
    }

    // static getDerivedFromProps(props, state) {
    //     if (props.initialPos !== state.pos) {
    //         return {
    //             pos: props.initialPos,
    //         }
    //     } else {
    //         return null
    //     }
    // }

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

    render() {
        return (

            <div style={{
                left: this.state.pos.x + 'px',
                top: this.state.pos.y + 'px',
                width: this.state.pos.width,
                height: this.state.pos.height,
                position: 'absolute',
            }} className={this.props.className} onMouseDown={this.onMouseDown.bind(this)} ref={this.myRef} >
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