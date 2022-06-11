import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IoMdOpen } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { BiWorld } from 'react-icons/bi';

// import MaterialTable from "material-table";
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
    {
      title: "Status", field: 'post_status', align: 'center', lookup: {
        draft: <BsFillShieldLockFill />,
        publish: <BiWorld />,
      }
    },
  ]
  const [data, setData] = useState([]); //table data

  // const tableRef = useRef();

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
    // resolve()
  }

  const handleRowAdd = (newData, resolve) => {
    // //validation
    // let errorList = []
    // if (newData.first_name === undefined) {
    //   errorList.push("Please enter first name")
    // }
    // if (newData.last_name === undefined) {
    //   errorList.push("Please enter last name")
    // }
    // if (newData.email === undefined || validateEmail(newData.email) === false) {
    //   errorList.push("Please enter a valid email")
    // }

    // if (errorList.length < 1) { //no error
    //   api.post("/users", newData)
    //     .then(res => {
    //       let dataToAdd = [...data];
    //       dataToAdd.push(newData);
    //       setData(dataToAdd);
    //       resolve()
    //       setErrorMessages([])
    //       setIserror(false)
    //     })
    //     .catch(error => {
    //       setErrorMessages(["Cannot add data. Server error!"])
    //       setIserror(true)
    //       resolve()
    //     })
    // } else {
    //   setErrorMessages(errorList)
    //   setIserror(true)
    //   resolve()
    // }
    resolve()
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
        // ref={tableRef}
        title="Table Data"
        columns={columns}
        data={data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setData([])
              handleRowAdd(newData, resolve)
              // handleRowUpdate(newData, oldData, resolve);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setData([])
              handleRowAdd(newData, resolve)
            }),
        }}
        detailPanel={rowData => {
          return (
            <div><DetailPanel details={rowData} /></div>
          )
        }}
        actions={[
          // {
          //   icon: () => <AiOutlineEdit />,
          //   tooltip: 'Edit Index',
          //   onClick: (event, rowData) => {
          //     setData([])
          //   }
          // },
          {
            icon: () => <RiDeleteBin5Fill />,
            tooltip: 'Delete Index',
            onClick: (event, rowData) => {
              handleRowDelete(rowData)
            }
          },
        ]}
        options={{
          // filtering: true,
          // grouping: true, 
          // columnsButton: true,
          selection: true,
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
        onSelectionChange={(event, rowData) => {
          console.log(event);
          alert('You selected ' + rowData.length + ' rows')
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
// const data = [
//   { id: 1, name: "Neeraj", email: 'neeraj@gmail.com', post_title: 9876543210, post_content: "Bangalore" },
//   { id: 2, name: "Raj", email: 'raj@gmail.com', post_title: 9812345678, post_content: "Chennai" },
//   { id: 3, name: "David", email: 'david342@gmail.com', post_title: 7896536289, post_content: "Jaipur" },
//   { id: 4, name: "Vikas", email: 'vikas75@gmail.com', post_title: 9087654321, post_content: "Hyderabad" },
// ]

/** ------- CLASS COMPONENTS --------- **/
// export class Stories extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       columns: columns,
//       data: [],
//       tableRef: React.createRef(),
//       selected: false,
//       selectedRowId: null,
//       c: "blue",
//       currentRow: {}
//     };
//   }

//   async componentDidMount() {
//     console.log('Recupero DATI by API');
    // const formData = new FormData();
    // formData.append("action", 'graxsh_route');
    // formData.append("wlank_graxsh_nonce", wlninja_graxsh_admin_vars.wl_nonce);
    // formData.append("route", 'api/v1/post/list');
//     // Fectch call
//     try {
//       // Update state
//       const req = await axios({
//         method: 'POST',
//         url: wlninja_graxsh_admin_vars.ajax_url, // url: `${wlninja_graxsh_admin_vars.site_url}/?rest_route=/graxsh/v1/post/save`,
//         data: formData,
//         headers: { "Content-Type": "multipart/form-data" }, // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       }).then(res => {
//         const response = res.data;
//         const list = response.response.data; console.log(response.response.data);
//         this.setState({
//           data: list
//         })
//       })
//     } catch (error) {
//       console.log(error)
//     }

//     // this.setState({ data })
//   }

//   handleRowDelete(oldData, resolve) {
//     console.log('Called... WITH:');
//     console.log(oldData);
//     this.setState({data: oldData})
//     // resolve()
//   }

//   render() {
//     return (
//       <div className='admin-section'>
//         <h5>Stories</h5>
//         <MaterialTable
//           title="Table Data"
//           columns={columns}
//           data={this.state.data}
//           editable={{
//             onRowAdd: (newRow) => new Promise((resolve, reject) => {
//               console.log(newRow, data);
//               const updatedRows = [...this.state.data, { id: Math.floor(Math.random() * 100), ...newRow }]
//               console.log(updatedRows);
//               this.setState({ data: updatedRow })
//               resolve()
//               // setTimeout(() => {
//               //   this.setState({ data: updatedRow })
//               //   resolve()
//               // }, 2000)
//             }),
//             onRowDelete: selectedRow => new Promise((resolve, reject) => {
//               // this.handleRowDelete(selectedRow, resolve).bind(this).then(resolve())
//               setTimeout(() => {
//                 this.setState({ data: [] })
//                 resolve()
//               }, 2000)


//               // const formData = new FormData();
//               // formData.append("action", 'graxsh_route');
//               // formData.append("wlank_graxsh_nonce", wlninja_graxsh_admin_vars.wl_nonce);
//               // formData.append("route", 'api/v1/post/list');

//               // axios({
//               //   method: 'POST',
//               //   url: wlninja_graxsh_admin_vars.ajax_url, // url: `${wlninja_graxsh_admin_vars.site_url}/?rest_route=/graxsh/v1/post/save`,
//               //   data: formData,
//               //   headers: { "Content-Type": "multipart/form-data" }, // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//               // }).then(res => {
//               //   const response = res.data;
//               //   const list = response.response.data; // console.log(response.response.data);
//               //   this.setState({ data: list })
//               //   console.log(this.state.data);
//               //   console.log('Testing');
//               //   resolve()
//               // })
//               // const index = selectedRow.tableData.id;
//               // const updatedRows = [...data]
//               // updatedRows.splice(index, 1)
//               // setTimeout(() => {
//               //   this.setState({ updatedRow })
//               //   // setData(updatedRows)
//               //   resolve()
//               // }, 2000)
//             }),
//             onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
//               console.log(newRow, data);
//               const updatedRows = [...this.state.data, { id: Math.floor(Math.random() * 100), ...newRow }]
//               console.log(updatedRows);
//               setTimeout(() => {
//                 // this.setState({ data: updatedRow })
//                 resolve()
//               }, 2000)
//               // const index = oldRow.tableData.id;
//               // const updatedRows = [...data]
//               // updatedRows[index] = updatedRow
//               // setTimeout(() => {
//               //   this.setState({ updatedRow })
//               //   resolve()
//               // }, 2000)
//             })

//           }}
//           actions={[
//             {
//               icon: () => <IoMdOpen />,
//               tooltip: 'Open Story',
//               onClick: (event, rowData) => {
//                 // Do save operation
//               }
//             }
//           ]}
          // options={{
          //   actionsColumnIndex: -1, addRowPosition: "first"
          // }}
//         // onRowClick={(event, rowData) => {
//         //   // if the rowData.tableDate.id could be used on condidtional render
//         //   console.log(rowData);
//         //   this.setState({ currentRow: rowData });
//         //   console.log(this.state.tableRef);
//         //   if (rowData.tableData.id === this.state.selectedRowId) {
//         //     this.setState({ selected: false });
//         //     this.setState({ selectedRowId: null });
//         //   } else {
//         //     this.setState({ selected: true });
//         //     this.setState({ selectedRowId: rowData.tableData.id });
//         //   }
//         // }}
//         />
//       </div>
//     )
//   }
// }

// export default Stories


