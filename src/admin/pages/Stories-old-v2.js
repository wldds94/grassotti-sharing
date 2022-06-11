import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdOpen } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { BiWorld } from 'react-icons/bi';

import MaterialTable from "@material-table/core";
import { DetailPanel } from '../components';

const api = axios.create({
  baseURL: wlninja_graxsh_admin_vars.ajax_url
})

function validateEmail(email) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

function Stories(props) {
  const columns = [
    { title: "ID", field: "ID", editable: false /* hidden: true, */ },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Title", field: 'post_title', },
    { title: "Status", field: 'post_status', align: 'center', lookup: {
      draft: <BsFillShieldLockFill />,
      publish: <BiWorld />,
    }},
    // {
    //   title: "Message", field: "post_content",
    //   render: rowData => (
    //     <div dangerouslySetInnerHTML={{ __html: rowData.post_content }} />
    //   ),
    // },
  ]

  // Table Data
  const [data, setData] = useState([]); //table data

  // Selcted Rows
  const [ selected, setSelected ] = useState(false)
  const [ selectedRowId, setSelectedRowId ] = useState(null)
  const [ currentRow, setCurrentRow ] = useState({})

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
    // //validation
    // let errorList = []
    // if (newData.first_name === "") {
    //   errorList.push("Please enter first name")
    // }
    // if (newData.last_name === "") {
    //   errorList.push("Please enter last name")
    // }
    // if (newData.email === "" || validateEmail(newData.email) === false) {
    //   errorList.push("Please enter a valid email")
    // }

    // if (errorList.length < 1) {
    //   api.patch("/users/" + newData.id, newData)
    //     .then(res => {
    //       const dataUpdate = [...data];
    //       const index = oldData.tableData.id;
    //       dataUpdate[index] = newData;
    //       setData([...dataUpdate]);
    //       resolve()
    //       setIserror(false)
    //       setErrorMessages([])
    //     })
    //     .catch(error => {
    //       setErrorMessages(["Update failed! Server error"])
    //       setIserror(true)
    //       resolve()

    //     })
    // } else {
    //   setErrorMessages(errorList)
    //   setIserror(true)
    //   resolve()
    // }
    setData([]);
    resolve()
  }

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = []
    if (newData.first_name === undefined) {
      errorList.push("Please enter first name")
    }
    // if (newData.last_name === undefined) {
    //   errorList.push("Please enter last name")
    // }
    // if (newData.email === undefined || validateEmail(newData.email) === false) {
    //   errorList.push("Please enter a valid email")
    // }

    if (errorList.length < 1) { //no error
      // api.post("/users", newData)
      //   .then(res => {
      //     let dataToAdd = [...data];
      //     dataToAdd.push(newData);
      //     setData(dataToAdd);
      //     resolve()
      //     setErrorMessages([])
      //     setIserror(false)
      //   })
      //   .catch(error => {
      //     setErrorMessages(["Cannot add data. Server error!"])
      //     setIserror(true)
      //     resolve()
      //   })
      console.log('Sending');
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
    // setData([])
    // resolve()
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

  return (
    <div className='admin-section'>
      <h5>Stories</h5>
      <MaterialTable
        title="Table Data"
        columns={columns}
        data={data}
        editable={{
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve) => {
        //       handleRowUpdate(newData, oldData, resolve);

        //     }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve)
            }),
        //   onRowDelete: (oldData) =>
        //     new Promise((resolve) => {
        //       handleRowDelete(oldData, resolve)
        //     }),
        }}
        detailPanel={rowData => {
          // console.log(rowData);
          return (
            <div>
              <DetailPanel details={rowData} />
            </div>
          )
        }}
        actions={[
          {
            icon: () => <AiOutlineEdit />,
            tooltip: 'Edit Index',
            onClick: (event, rowData) => {
              setData([])
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
  );
}

export default Stories
