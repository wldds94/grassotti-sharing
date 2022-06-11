import React, { Component } from 'react'

export class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: true
        }
    }

    openMenu = (e) => {
        const opening = !this.state.isOpen
        this.setState({
            isOpen: opening
        })
        this.props.onChangeNav(opening)
    }

    render() {
        return (
            <div className='admin-header admin-section'>
                <div className='open-close-menu'>
                    <label className='hamb-menu' htmlFor="check">
                        <input type="checkbox" id="check" checked={this.state.isOpen} onChange={this.openMenu.bind(this)} />
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>
                <span className='logo font-weight-bold'>WLDDS</span>
            </div>
        )
    }
}

export default Header