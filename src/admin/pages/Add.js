import React, { Component } from 'react'
import { Form } from '../components'
import { Loader } from '../modules'

export class Add extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }
    }

    setLoading(load) {
        console.log('Set Loading...');
        this.setState({
            loading: load
        })
    }

    render() {
        return (
            <div className='admin-section inner'>
                <h5>Add</h5>
                <Form isNew={true} onLoading={this.setLoading.bind(this)} />
                { this.state.loading ? <Loader /> : '' } 
            </div>
        )
    }
}

export default Add