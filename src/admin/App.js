import React, { Component } from 'react'
import { Navbar, Header } from './components';
import { Dashboard, Stories, Add } from './pages'

import 'bootstrap/dist/js/bootstrap.bundle';

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            panel: 'dash',
            nav: 'open',
        }
    }

    changeNav = (mode) => {
        this.setState({
            nav: mode ? 'open' : 'close'
        })
    }

    changePanel = (page) => {
        this.setState({
            panel: page
        })
    }

    render() {
        return (
            <div>
                <Header onChangeNav={this.changeNav} />
                <div className='admin-body'>
                    <Navbar mode={this.state.nav} onChangePage={this.changePanel.bind(this)} />
                    {this.state.panel === 'dash' &&
                        <Dashboard />}
                    {this.state.panel === 'list' &&
                        <Stories /> }
                    {this.state.panel === 'add' &&
                        <Add /> }
                </div>
            </div>
        )
    }
}

export default App