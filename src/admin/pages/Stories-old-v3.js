import React, { useState, useEffect } from 'react';
// import PostTable from '../components/Table/PostTable';
// import Modal from '../components/Modal/Modal'

function Stories(props) {

  // Modals List
  // const [modals, setModals] = useState([]); //table data

  // Modal
  // const [show, setShow] = useState(false); //table data
  // const [hideModal, setHideModal] = useState([]); //table data

  const openNewModal = () => {
    console.log('openModal');
    setShow(true)
  }

  hideModal = () => {
    setShow(false)
  }

  return (
    <div className='admin-section'>
      <h5>Stories</h5>
      {/* <PostTable /> */}
      {/* <Modal show={show} handleClose={hideModal}>
        <p>Modal</p>
      </Modal> */}
    </div>
  );
}

export default Stories
