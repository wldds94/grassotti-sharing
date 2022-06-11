import React, { useRef, useState, useEffect } from "react";
import { RiUpload2Fill } from 'react-icons/ri';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import {
    FileUploadContainer,
    FormField,
    DragDropText,
    UploadFileBtn,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    PreviewList,
    FileMetaData,
    RemoveFileIcon,
    InputLabel
} from "./Uploader.styles";

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;
const KILO_BYTES_PER_BYTE = 1000;

const convertNestedObjectToArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) =>
    Math.round(bytes / KILO_BYTES_PER_BYTE);

const Uploader = ({
    label,
    // accept,
    onLoading,
    maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
    initFiles,
    ...otherProps
}) => {

    const fileInputField = useRef(null);
    const [files, setFiles] = useState({});

    useEffect(() => {
        // console.log('Files: ', files);
        // console.log('initFiles: ', initFiles);
        setFiles(initFiles);
    }, [initFiles]);

    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size < maxFileSizeInBytes) {
                if (!otherProps.multiple) {
                    return { file };
                }
                files[file.name] = file;
            }
        }
        return { ...files };
    };

    const callUpdateFilesCb = (files) => {
        const filesAsArray = convertNestedObjectToArray(files);
        // console.log('Files: ', filesAsArray);
        onLoading(filesAsArray);
    };

    const handleNewFileUpload = (e) => {
        const { files: newFiles } = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles); // console.log('Files 2: ', updatedFiles);
            setFiles(updatedFiles);
            callUpdateFilesCb(updatedFiles);
        }
        // onLoading(e)
    };

    const removeFile = (fileName) => {
        delete files[fileName]; // console.log('Files: ', files);
        setFiles({ ...files });
        callUpdateFilesCb({ ...files });
    };

    return (
        <>
            <FileUploadContainer>
                {/* <InputLabel>{label}</InputLabel> */}
                <DragDropText>Drag and drop your files anywhere or</DragDropText>
                <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
                    <i className="fas fa-file-upload" />
                    <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
                </UploadFileBtn>
                <FormField
                    type="file"
                    ref={fileInputField}
                    onChange={handleNewFileUpload}
                    title=""
                    value=""
                    {...otherProps}
                />
            </FileUploadContainer>
            <FilePreviewContainer>
                {/* <span>To Upload</span> */}
                <PreviewList>
                    {Object.keys(files).map((fileName, index) => {
                        let file = files[fileName];
                        let isImageFile = file.type.split("/")[0] === "image";
                        return (
                            <PreviewContainer key={fileName}>
                                <div>
                                    {isImageFile && (
                                        <ImagePreview
                                            src={URL.createObjectURL(file)}
                                            alt={`file preview ${index}`}
                                        />
                                    )}
                                    <FileMetaData isImageFile={isImageFile}>
                                        <span>
                                            {file.name.length > 15 ? file.name.substring(0, 15) + '..' : file.name}
                                        </span>
                                        <aside>
                                            <span>{convertBytesToKB(file.size)} kb</span>
                                            <RemoveFileIcon
                                                className="fas fa-trash-alt"
                                                onClick={() => removeFile(fileName)}
                                            />
                                        </aside>
                                    </FileMetaData>
                                </div>
                            </PreviewContainer>
                        );
                    })}
                </PreviewList>
            </FilePreviewContainer>
        </>
    );

}

export default Uploader;