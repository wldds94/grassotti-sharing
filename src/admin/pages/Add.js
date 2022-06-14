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
            <div className='admin-section padding-0 no-overflow'>
                <div className='admin-section__header'>
                    <h5>Add</h5>
                </div>
                <div className='admin-section inner'>
                    <Form isNew={true} onLoading={this.setLoading.bind(this)} />
                    {this.state.loading ? <Loader /> : ''}
                </div>
            </div>
        )
    }
}

export default Add