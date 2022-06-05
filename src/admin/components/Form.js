import React, { Component } from 'react'

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            title: '',
            message: '',
            files: [],
            status: ''
        };

        this.handleChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log('Change detected. State updated' + name + ' = ' + value);
    }

    handleFiles(event) {
        const target = event.target
        const files = Array.from(target.files)

        this.setState({
            files: files
        });
    }

    handleSubmit(event) {
        alert('A form was submitted: ' + this.state.name + ' // ' + this.state.email);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
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
                        <input type="file" className='form-control' id="filesImput" name='files' multiple value={this.state.files} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="statusImput" className='mr-10'>Status:</label>
                        <span>
                            <label htmlFor="statusImput0">Bozza</label>
                            <input type="radio" name="status" value='0' onChange={this.handleChange} className="form-control" id="statusImput0" />
                        </span>
                        <span>
                            <label htmlFor="statusImput1">Publish</label>
                            <input type="radio" name="status" value='1' onChange={this.handleChange} className="form-control" id="statusImput1" />
                        </span>
                    </div>
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </form>
            </div>
        )
    }
}

export default Form