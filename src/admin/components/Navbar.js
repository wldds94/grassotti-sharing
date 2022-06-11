import React, { Component } from 'react'
import { TbLayoutDashboard } from 'react-icons/tb'
import { FaThList, FaPlus } from 'react-icons/fa'

export class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
          active: 'dash'
        }
    }

    clickMenu = (e) => {
        e.preventDefault()
        let ref = e.target.closest('li').dataset.ref.slice(1);
        let menu = ref.length ? ref : 'dash' // console.log(e, e.target, menu);
        this.setState({
            active: menu
        })
        this.props.onChangePage(menu)
    }

    render() {
        return (
            <div className={'nav-container ' + this.props.mode}>
                <div id='sidebar-nav' /* className='admin-section' */>
                    <ul>
                        <li className={this.state.active === 'dash' && 'active'} data-ref='#dash'>
                            <a href='#' onClick={this.clickMenu.bind(this)}>
                                <TbLayoutDashboard />
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className={this.state.active === 'list' && 'active'} data-ref='#list'>
                            <a href='#list' onClick={this.clickMenu.bind(this)}>
                                <FaThList />
                                <span>List</span>
                            </a>
                        </li>
                        <li className={this.state.active === 'add' && 'active'} data-ref='#add'>
                            <a href='#add' onClick={this.clickMenu.bind(this)}>
                                <FaPlus />
                                <span>Add</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Navbar