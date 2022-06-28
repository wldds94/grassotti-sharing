import React, { Component, createRef, useRef } from 'react';
// import './Form.scss';
import ScrollContainer from 'react-indiana-drag-scroll'
import { BsArrowRight } from 'react-icons/bs'
import InputFiles from '../../modules/InputFiles';

export class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            location: '',
            title: '',
            message: '',
            files: [],
            privacy: false,
        }

        this.input = createRef(null)

        this.submitForm = this.submitForm.bind(this)
        this.handleChange = this.handleInputChange.bind(this)

    }

    handleInputChange(event) {
        console.log('Handle Input');
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

    // acceptPrivacy(e) {
    //     const target = e.target.checked
    //     this.setState({
    //         privacy: !target
    //     });
    // }

    submitForm(e) {
        e.preventDefault()
        e.stopPropagation()
        console.log('You Try to handler Submit...');

        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("email", this.state.email);
        formData.append("location", this.state.location);
        formData.append("title", this.state.title);
        formData.append("message", this.state.message);
        Array.from(this.state.files).map((value, index) => {
            formData.append("files[" + index + "]", value);
        })
        formData.append("privacy", this.state.privacy);

        formData.append("action", 'graxsh_pb_route');
        formData.append("wlank_graxsh_pb_nonce", wlninja_graxsh_public_vars.wl_nonce);
        formData.append("route", 'api/v1/priv/post/save');

        this.setState({
            name: '',
            email: '',
            location: '',
            title: '',
            message: '',
            files: [],
            privacy: false,
        });
    }

    onClick(event) {
        console.log('Handle Focues');
        // const input = useRef(null);

        if (event.target.tagName === "INPUT" /* || 
            ( event.target.dataset.typeTagName && event.target.dataset.typeTagName === "input" ) */ ) {
            this.input.current = event.target;
            event.target.focus();
            // event.target.click();
        } else {
            if (this.input.current) {
                this.input.current.blur();
                this.input.current = null;
            }
            // event.target.click();
        }

        // return true
        // event.target.blur();
    }

    render() {
        return (
            <React.Fragment>
                <div className='graxsh-form-container relative'>
                    <ScrollContainer
                        className="form-scroll-container"
                        vertical={false}
                        horizontal={true}
                        onClick={this.onClick.bind(this)} >
                        <form>
                            <div className='form-container grid'>
                                <div>
                                    <label htmlFor="name" className='latin-number'>1.</label>
                                    <div className='input-container'>
                                        <input value={this.state.name} onChange={this.handleChange} type="text" name="name" className="form-control" id="name" aria-describedby="namelHelp"
                                            placeholder='IL TUO NOME' />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className='latin-number'>2.</label>
                                    <div className='input-container'>
                                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp"
                                            placeholder='LA TUA EMAIL' />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="location" className='latin-number'>3.</label>
                                    <div className='input-container'>
                                        <input value={this.state.location} onChange={this.handleChange} type="text" name="location" className="form-control" id="location" aria-describedby="locationHelp"
                                            placeholder='LUOGO' />
                                    </div>
                                </div>
                                {/* </div> */}
                                <div>
                                    <label htmlFor="title" className='latin-number'>4.</label>
                                    <div className='input-container'>
                                        <input value={this.state.title} onChange={this.handleChange} type="email" name="title" className="form-control" id="title" aria-describedby="titleHelp"
                                            placeholder='TITOLO DEL POST' />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className='latin-number'>5.</label>
                                    <div className='input-container'>
                                        <input value={this.state.message} onChange={this.handleChange} type="email" name="message" className="form-control" id="message" aria-describedby="messageHelp"
                                            placeholder='TESTO DEL MESSAGGIO' />
                                    </div>
                                </div>
                                <div className='form-files'>
                                    <label className='latin-number'>6. <span>CARICA LE TUE IMMAGINI <small>( min.1 max 3 )</small></span></label>
                                    <div className='input-container'>
                                        {/* {this.state.files.map((file, key) => {
                                            return (
                                                <InputFiles key={key} file={file} />
                                            )
                                        })} */}
                                        <InputFiles
                                            files={this.state.files}
                                            onLoading={this.handleFiles.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className='form-privacy'>
                                    <label className='latin-number'><span className='placeholder relative text-uppercase'>Invia ora{/* <span>Invia ora</span> */}</span></label>
                                    <div className='input-container'>
                                        {/* <div className='checkbox-content block relative'>
                                            <input value={this.state.privacy} onChange={this.handleChange} type="checkbox" name="privacy" className="form-check-input" id="privacyCheck" checked={this.state.privacy} />
                                            <span className="checkmark" onClick={this.acceptPrivacy.bind(this)}></span>
                                        </div> */}
                                        <input value={this.state.privacy} onChange={this.handleChange} type="checkbox" name="privacy" className="form-check-input" id="privacyCheck" checked={this.state.privacy} />
                                        <label className="form-check-label" htmlFor="privacyCheck"><small>Inviando queste foto do il consenso a pubblicare e utilizzare il materiale. Per ulteriori informazioni clicca qui.</small></label>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </ScrollContainer>
                    <div className='graxsh-public-submit' onClick={this.submitForm}>
                        <BsArrowRight />
                    </div>
                </div>
            </React.Fragment>
        )
    }

        // componentDidMount() {
    //     if ("geolocation" in navigator) {
    //         console.log("geolocation Available");

    //         navigator.geolocation.getCurrentPosition(
    //         function (position) {
    //             // console.log('Geolocation Function');
    //             console.log("Latitude is :", position.coords.latitude);
    //             console.log("Longitude is :", position.coords.longitude);
    //         },
    //         function errorCallback(error) {
    //             console.log(error);
    //         },
    //         {
    //             timeout:1000
    //         },);
    //     } else {
    //         console.log("geolocation Not Available");
    //     }
    // }
}

export default Form