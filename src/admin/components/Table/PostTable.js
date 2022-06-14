import React, { useState, useRef, useEffect } from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';
import { IoMdOpen } from 'react-icons/io';
import { AiOutlineEdit, AiFillFileAdd } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { BiWorld } from 'react-icons/bi';

import MaterialTable from "@material-table/core";
import { DetailPanel, Form } from '../../components';

// Style
import './PostTable.scss'

const api = axios.create({
    baseURL: wlninja_graxsh_admin_vars.ajax_url
})

function validateEmail(email) {
    const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
}

const PostTable = (props) => {
    const { onOpenModal } = props
    // const tableRef = forwardRef();

    const columns = [
        { title: "ID", field: "ID", /* editable: false hidden: true, */ },
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Title", field: 'post_title', },
        {
            title: "Status", field: 'post_status', align: 'center', lookup: {
                draft: <BsFillShieldLockFill />,
                publish: <BiWorld />,
            }
        },
    ]

    // Table Data
    const [data, setData] = useState([]); //table data

    // Selcted Rows
    const [selected, setSelected] = useState(false)
    const [selectedRowId, setSelectedRowId] = useState(null)
    const [currentRow, setCurrentRow] = useState({})

    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        // console.log('You useEffect...');
        const formData = new FormData();
        formData.append("action", 'graxsh_route');
        formData.append("wlank_graxsh_nonce", wlninja_graxsh_admin_vars.wl_nonce);
        formData.append("route", 'api/v1/post/list');

        api.post("", formData)
            .then(res => {
                const response = res.data;
                const list = response.response.data; console.log(response.response.data);
                setData(list)
            })
            .catch(error => {
                console.log("Error")
            })
    }, [])

    const handleRowUpdate = (newData, oldData, resolve) => {
        setData([]);
        resolve()
    }

    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if (newData.first_name === undefined) {
            errorList.push("Please enter first name")
        }

        if (errorList.length < 1) { //no error
            console.log('Sending');
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
    }

    const handleRowDelete = (oldData) => {
        // console.log(oldData);
        const formData = new FormData();
        formData.append("action", 'graxsh_route');
        formData.append("wlank_graxsh_nonce", wlninja_graxsh_admin_vars.wl_nonce);
        formData.append("route", 'api/v1/post/delete');
        formData.append("post_id", oldData.ID);

        api.post("", formData)
            .then(res => {
                const response = res.data;
                const list = response.response.data; console.log(response.response.data);
                setData([...list])
            })
            .catch(error => {
                setErrorMessages(["Delete failed! Server error"])
                setIserror(true)
            })
    }

    const handleRowEdit = (rowData) => {
        // e.peventDefault()
        console.log('RowData: ', rowData);
        const strippedMessage = rowData.post_content.replace(/(<([^>]+)>)/gi, "");

        onOpenModal(rowData.ID, () => {
            const post = {
                id: rowData.ID,
                name: rowData.name,
                email: rowData.email,
                title: rowData.post_title,
                message: strippedMessage,
                status: rowData.post_status,
                files: rowData.children.map((value) => {
                    // console.log('Value File: ', value);
                    var arr = value.blob.split(','),
                        mime = arr[0].match(/:(.*?);/)[1],
                        bstr = Buffer.from(arr[1], 'base64'), // bstrAtob = atob(arr[1]), n = bstr.length, 
                        u8arr = new Uint8Array(bstr); // new Uint8Array(n);
                    // console.log('bstr: ', bstr); // console.log('bstrAtob: ', bstrAtob);
    
                    const FileBlob = new File([u8arr], value.post_title, { type: mime, });
                    return FileBlob
                    // var temp = {
                    //     [value.post_title]: new File([value.blob], value.post_title)
                    // }
                    // return temp
                    // var temp = Object.assign({}, value); // console.log(temp, temp.key);
                    // return temp;
                    // return new File([value.blob], value.post_title, { type: value.post_mime_type, })
                }),
            }
            // console.log('Post Files: ', post.files);
            return (
                <div>
                    {/* <h5>Edit Panel</h5> */}
                    <Form post={post} />
                </div>
            )
        }, rowData.title)
    }

    const openModal = (e) => {
        // e.peventDefault()
        onOpenModal((new Date().valueOf()), () => {
            return (
                <div>
                    {/* <h5>Edit Panel</h5> */}
                    <Form isNew={true} />
                </div>
            )
        })
    }

    return (
        <div className='admin-section__table'>
            <div className='add-post'>
                <AiFillFileAdd onClick={openModal} />
            </div>

            <MaterialTable
                // ref={tableRef}
                title="Table Data"
                columns={columns}
                data={data}
                detailPanel={rowData => {
                    return (
                        <div>
                            <DetailPanel key={rowData.post_title} details={rowData} />
                        </div>
                    )
                }}
                actions={[
                    {
                        icon: () => <AiOutlineEdit />,
                        tooltip: 'Edit Index',
                        onClick: (event, rowData) => {
                            handleRowEdit(rowData)
                        }
                    },
                    {
                        icon: () => <RiDeleteBin5Fill />,
                        tooltip: 'Delete Index',
                        onClick: (event, rowData) => {
                            handleRowDelete(rowData)
                        }
                    },
                ]}
                options={{
                    // grouping: true, 
                    columnsButton: true,
                    actionsColumnIndex: -1,
                    addRowPosition: "first",
                    headerStyle: {
                        backgroundColor: '#e4e4e4',
                        color: '#000000',
                        fontSize: '12px',
                        fontWeight: 'bold',
                    },
                    rowStyle: (rowData) => ({
                        backgroundColor:
                            selectedRowId === rowData.tableData.id ? "#6ABAC9" : "#FFF",
                    }),
                }}
                onRowClick={(event, rowData) => {
                    // if the rowData.tableDate.id could be used on condidtional render
                    console.log(rowData);
                    setCurrentRow(rowData);
                    // console.log(this.state.tableRef);
                    if (rowData.tableData.id === selectedRowId) {
                        setSelected(false);
                        setSelectedRowId(null);
                    } else {
                        setSelected(true);
                        setSelectedRowId(rowData.tableData.id);
                    }
                }}
            />
        </div>
    )
}

export default PostTable