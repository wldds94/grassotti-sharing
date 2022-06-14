import React, { Component, createRef } from 'react'
import axios from 'axios';
import './FormSettings.scss'
import { Loader } from '../../modules';

import JoditEditor from "jodit-react";


export class FormSettings extends Component {
    constructor(props) {
        super(props)

        this.config = {
            readonly: false, // all options from https://xdsoft.net/jodit/doc/,
            placeholder: 'Insert your custom content here...'
        }

        this.state = {
            send_response: this.props.data ? (this.props.data.send_response ?? false) : false,
            email_response: this.props.data ? (this.props.data.email_response ?? '') : '', // '',
            send_content_custom: this.props.data ? (this.props.data.send_content_custom ?? false) : false, // false,
            email_content_custom: this.props.data ? (this.props.data.email_content_custom ?? '') : '', // '',
            loading: false,
        }

        this.editorRef = createRef()

        this.handleChange = this.handleInputChange.bind(this)
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // componentDidUpdate((props, state) => {
        
    // })

    onEditorStateChange(editorState) {
        this.setState({
            email_content_custom: editorState
        })
        console.log(editorState);
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

    async handleSubmit(event) {
        // alert('A form was submitted: ' + this.state.name + ' // ' + this.state.email);
        event.preventDefault();
        // console.log(this.state);

        if (this.props.onLoading) {
            this.props.onLoading(true)
        } else {
            this.setState({
                loading: true
            })
        }

        const formData = new FormData();
        formData.append("response_check", this.state.send_response);
        formData.append("response_email", this.state.email_response);
        formData.append("content_check", this.state.send_content_custom);
        formData.append("response_content", this.state.email_content_custom);

        formData.append("action", 'graxsh_route');
        formData.append("wlank_graxsh_nonce", wlninja_graxsh_admin_vars.wl_nonce);
        formData.append("route", 'api/v1/settings/save');

        console.log(formData);
        try {
            const req = await axios({
                method: 'POST',
                url: wlninja_graxsh_admin_vars.ajax_url, // url: `${wlninja_graxsh_admin_vars.site_url}/?rest_route=/graxsh/v1/post/save`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }, // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(res => {
                const response = res.data;
                console.log(response);
                
                // this.setState({
                //     id: '',
                //     name: '',
                //     email: '',
                //     title: '',
                // });
                
                if (this.props.onLoading) {
                    this.props.onLoading(false)
                } else {
                    this.setState({
                        loading: false
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className='form-container-wrapper'>
                <div className='settings-form-container'>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3 form-check">
                            <input value={this.state.send_response} onChange={this.handleChange} type="checkbox" name="send_response" className="form-check-input" id="emailResponseCheck" defaultChecked={this.state.send_response} />
                            <label className="form-check-label" htmlFor="emailResponseCheck">Send me response after publish story</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input value={this.state.email_response} onChange={this.handleChange} type="email" name="email_response" className="form-control" id="emailResponse" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3 form-check">
                            <input value={this.state.email_content_custom} onChange={this.handleChange} type="checkbox" name="send_content_custom" className="form-check-input" id="emailCustomContentCheck"  defaultChecked={this.state.send_content_custom} />
                            <label className="form-check-label" htmlFor="emailCustomContentCheck">Use custom content in email response</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Custom Email Content</label>
                            <JoditEditor
                                ref={this.editorRef}
                                value={this.state.email_content_custom}
                                config={this.config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={this.onEditorStateChange} // preferred to use only this option to update the content for performance reasons
                                onChange={this.onEditorStateChange}
                            />
                        </div>
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </form>
                </div>

                { this.state.loading ? <Loader /> : '' }
            </div>
        )
    }
}

export default FormSettings