import React, { useState } from 'react'
import { PostTable, Modal } from '../components';

const Stories = () => {
  const [show, setShow] = useState(false);

  const showModal = () => {
    console.log('Showing Modal...');
    setShow(true)
  }

  const hideModal = () => {
    console.log('Hiding Modal...');
    setShow(false)
  }

  return (
    <div className='admin-section'>
      <h5>Stories</h5>
      <div>
        <PostTable onOpenModal={showModal} />
      </div>
      <Modal show={show} handleClose={hideModal}>
        <p>Modal</p>
      </Modal>
    </div>
  )
}

export default Stories

// import React, { Component } from 'react'
// import { PostTable, Form } from '../components';
// import { Modal } from '../components'

// export class Stories extends Component {
//   render() {
//     return (
//       <div className='admin-section'>
//         <h5>Stories</h5>
//         <PostTable />
//       </div>
//     )
//   }
// }

// export default Stories

// import React, { useState, useEffect } from 'react';
// import { PostTable, Form } from '../components';
// import { Modal } from '../components'

// function Stories(props) {
//   // Modals List
//   // const [modals, setModals] = useState([]); //table data
//   // Modal
//   const [show, setShow] = useState(false);

  // hideModal = () => {
  //   setShow(false)
  // }

//   return (
//     <div className='admin-section'>
//       <h5>Stories</h5>
//       {/* <PostTable /> */}

//       {/* <Form /> */}
//       {/* <Modal show={show} handleClose={hideModal}>
//         <p>Modal</p>
//       </Modal> */}
//     </div>
//   );
// }

// export default Stories
