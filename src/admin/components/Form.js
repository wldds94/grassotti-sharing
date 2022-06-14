import React, { Component } from 'react'
import axios from 'axios';
import Uploader from './Uploader/Uploader';

export class Form extends Component {
    constructor(props) {
        super(props);

        this.isNew = props.isNew ? true : false

        const { post } = props
        let stateAux = post ? post : {
            id: '',
            name: '',
            email: '',
            title: '',
            message: '',
            files: [],
            status: '',
        };
        this.state = stateAux
        // console.log('Form state Files: ', this.state.files);

        this.handleChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFiles = this.handleFiles.bind(this);
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log(props, state);
    //     const { post } = props
    //     if (post && post != state) {
    //         return post
    //     }
    //     // if (state.remoteValueMemo !== props.remoteValue) {
    //     //     return {
    //     //         remoteValueMemo: props.remoteValue,
    //     //         internalValue: props.remoteValue};
    //     // }
    //     return null;
    // }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name;

        this.setState({
            [name]: value
        });
        // console.log('Change detected. State updated' + name + ' = ' + value);
    }

    handleFiles(files) {
        /* const target = event.target // const { files } = event.target // const files = target.files // Array.from(target[0].files) */ // console.log(files);
        this.setState({ files: files })
    }

    async handleSubmit(event) {
        // alert('A form was submitted: ' + this.state.name + ' // ' + this.state.email);
        event.preventDefault();
        // console.log(this.state);

        if (this.props.onLoading) {
            this.props.onLoading(true)
        }

        const formData = new FormData();
        formData.append("id", this.state.id);
        formData.append("name", this.state.name);
        formData.append("email", this.state.email);
        formData.append("title", this.state.title);
        formData.append("message", this.state.message);
        Array.from(this.state.files).map((value, index) => {
            formData.append("files[" + index + "]", value);
        })
        formData.append("status", this.state.status);

        formData.append("action", 'graxsh_route');
        formData.append("wlank_graxsh_nonce", wlninja_graxsh_admin_vars.wl_nonce);
        formData.append("route", 'api/v1/post/save');

        try {
            const req = await axios({
                method: 'POST',
                url: wlninja_graxsh_admin_vars.ajax_url, // url: `${wlninja_graxsh_admin_vars.site_url}/?rest_route=/graxsh/v1/post/save`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }, // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(res => {
                const response = res.data;
                console.log(response);
                if (this.isNew) {
                    this.setState({
                        id: '',
                        name: '',
                        email: '',
                        title: '',
                        message: '',
                        files: [],
                    });
                }
                
                if (this.props.onLoading) {
                    this.props.onLoading(false)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const entry = {}
        let counter = 1;
        this.state.files.map((item, key) => {
            entry[counter + '-' + item.name] = item // console.log(item.name);
            counter++
        })

        return (
            <div>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data" >
                    <input type="hidden" name="id" value={this.state.name} onChange={this.handleChange} className="form-control" id="idImput" placeholder="Name" />
                    <div className="form-group">
                        <label htmlFor="nameImput">Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" id="nameImput" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailImput">Email</label>
                        <input name="email" type="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="emailImput" placeholder="email@domain.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="titleImput">Title</label>
                        <input name="title" type="text" value={this.state.title} onChange={this.handleChange} className="form-control" id="titleImput" placeholder="Una meravigliosa giornata..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="titleImput">Your message</label>
                        <textarea className='form-control' id="messageInput" placeholder='Your message...' name='message' value={this.state.message} onChange={this.handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="filesImput">Uploads</label>
                        {/* <input type="file" className='form-control' id="filesImput" name='files' multiple ref={this.state.files} onChange={this.handleFiles} /> */}
                        <div className='uploader-container'>
                            <Uploader
                                accept=".jpg,.png,.jpeg,.svg"
                                initFiles={entry}
                                // initFiles={{ ...this.state.files }} // initFiles={this.state.files.reduceRight((all, item) => ({[item]: all}), {})}
                                multiple
                                onLoading={this.handleFiles.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="statusImput" className='mr-10'>Status:</label>
                        <div className="radio-container">
                            <span>
                                <label htmlFor="statusImput0">Bozza</label>
                                <input type="radio" name="status" value='0' onChange={this.handleChange} className="form-control" id="statusImput0" />
                            </span>
                            <span>
                                <label htmlFor="statusImput1">Publish</label>
                                <input type="radio" name="status" value='1' onChange={this.handleChange} className="form-control" id="statusImput1" />
                            </span>
                        </div>
                    </div>
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </form>
            </div>
        )
    }
}

export default Form