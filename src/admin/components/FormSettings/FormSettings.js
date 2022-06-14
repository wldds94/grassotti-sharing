import React, { Component } from 'react'
import './FormSettings.scss'

export class FormSettings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            send_response: false,
            email_response: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name;

        this.setState({
            [name]: value
        });
        // console.log('Change detected. State updated' + name + ' = ' + value);
    }

    render() {
        return (
            <div className='form-container-wrapper'>
                <div className='settings-form-container'>
                    <form>
                        <div className="mb-3 form-check">
                            <input value={this.state.send_response} onChange={this.handleInputChange} type="checkbox" name="send_response" className="form-check-input" id="emailResponseCheck" />
                            <label className="form-check-label" htmlFor="emailResponseCheck">Send me response after publish story</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input value={this.state.email_response} onChange={this.handleInputChange} type="email" name="email_response" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default FormSettings