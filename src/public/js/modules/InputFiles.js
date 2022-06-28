import { BackspaceTwoTone } from '@material-ui/icons';
import React, { Component } from 'react'
import { BiPlusMedical } from 'react-icons/bi'
// import './InputFiles.scss'

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 2000000;
const KILO_BYTES_PER_BYTE = 1000;

export class InputFiles extends Component {
    constructor(props) {
        super(props)

        this.settings = {
            maxFileSizeInBytes: DEFAULT_MAX_FILE_SIZE_IN_BYTES,
            kiloBytesForByte: KILO_BYTES_PER_BYTE,
            multiple: this.props.multiple ? this.props.multiple : true
        }

        this.state = {
            files: props.files,
        }

    }


    static getDerivedStateFromProps(props, state) {
        if (props.files !== state.files) {
            return {
                files: props.files
            }
            // this.setState({
            //     files: props.files
            // })
        }
        return null;
    }

    convertNestedObjectToArray(nestedObj) {
        return Object.keys(nestedObj).map((key) => nestedObj[key]);
    }

    convertBytesToKB(bytes) {
        return Math.round(bytes / this.settings.kiloBytesForByte);
    }
    // const handleUploadBtnClick = () => {
    //     fileInputField.current.click();
    // };

    addNewFiles(newFiles) {
        for (let file of newFiles) {
            if (file.size < this.settings.maxFileSizeInBytes) {
                if (!this.settings.multiple) {
                    return { file };
                }
                this.state.files[file.name] = file;
            }
        }
        return { ...this.state.files };
    };

    callUpdateFilesCb(files) {
        const filesAsArray = this.convertNestedObjectToArray(files);
        // console.log('Files: ', filesAsArray);
        this.props.onLoading(filesAsArray);
    };

    handleNewFileUpload(e) {
        const { files: newFiles } = e.target;
        if (newFiles.length) {
            let updatedFiles = this.addNewFiles(newFiles); // console.log('Files 2: ', updatedFiles);

            this.setState({ files: updatedFiles })
            // setFiles(updatedFiles);
            this.callUpdateFilesCb(updatedFiles);
        }
        // onLoading(e)
    };

    removeFile = (fileName) => {
        delete this.state.files[fileName]; // console.log('Files: ', files);
        this.setState({ ...this.state.files })
        // setFiles({ ...files });
        this.callUpdateFilesCb({ ...this.state.files });
    };

    render() {
        return (
            <div className='file-wrapper-container flex'>
                <div className="files-preview-container">
                    <div className="files-list">
                        {Object.keys(this.state.files).map((fileName, index) => {
                            let file = this.state.files[fileName]; // console.info('Uploader State Files: ', file)
                            let isImageFile = file.type.split("/")[0] === "image";
                            return (
                                <div key={fileName}
                                    className='preview-content'
                                    style={{
                                        backgroundImage: isImageFile ? `url(${URL.createObjectURL(file)})` : ''
                                    }}
                                >
                                    {/* {isImageFile && (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`file preview ${index}`}
                                        /> 
                                    )} */}
                                    <div className='preview-meta'>
                                        <span>
                                            {file.name.length > 10 ? file.name.substring(0, 10) + '..' : file.name}
                                        </span>
                                        <aside>
                                            <span>{this.convertBytesToKB(file.size)} kb</span>
                                            <i
                                                className="fas fa-trash-alt"
                                                onClick={() => this.removeFile(fileName)}
                                            />
                                        </aside>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="file-input">
                    <input type="file" name="file-input" id="file-input" className="file-input__input" onChange={this.handleNewFileUpload.bind(this)} multiple />
                    <label className="file-input__label" htmlFor="file-input">
                        <BiPlusMedical />
                    </label>
                </div>
            </div>
        )
    }
}

export default InputFiles