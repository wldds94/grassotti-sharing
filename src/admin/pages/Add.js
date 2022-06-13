import React, { Component } from 'react'
import { Form } from '../components'

export class Add extends Component {
    render() {
        return (
            <div className='admin-section inner'>
                <h5>Add</h5>
                <Form />
            </div>
        )
    }
}

export default Add