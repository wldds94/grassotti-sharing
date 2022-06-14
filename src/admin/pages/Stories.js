import React, { useState } from 'react'
import { PostTable, Modal } from '../components';
import { BsFileEarmarkSpreadsheet } from 'react-icons/bs';

import { Draggable } from '../modules';

const Stories = () => {
  const [listModals, setListModals] = useState([
    {
      key: 0,
      components: () => { return (<h1>Test 1</h1>) },
      show: true,
      active: true,
      isMaximized: false,
      posEnter: {
        top: 0,
        left: 0,
      },
      dimEnter: {
        width: '70%',
        height: '70%',
      },
    },
    /* {
      key: 1,
      components: () => { return (<h1>Test 2</h1>) },
      show: false,
      active: false,
      isMaximized: false,
    } */
  ])
  // const [activeModal, setActiveModal] = useState(null);

  // const showModal = () => {
  //   console.log('Showing Modal...');
  //   setShow(true)
  // }

  const resizeModal = (keyModal, isMaximized) => {
    console.log('Resizing Modal...');

    const newModals = listModals.map((value) => {
      var temp = Object.assign({}, value); // console.log(temp, temp.key);
      if (Number(temp.key) === Number(keyModal)) {
        temp.isMaximized = !isMaximized; // console.log('Change Value');
        // temp.show = false;
        if (!isMaximized) {
          temp.posEnter = {
            top: 0,
            left: 0,
          }
          temp.dimEnter = {
            width: '100%',
            height: '100%',
          }
          console.log('Have To Maximize: ');
        } else {
          console.log('Have To Minimize: ');
          temp.dimEnter = {
            width: '70%',
            height: '70%',
          }
        }
      }
      return temp;
    })
    setListModals(prevState => {
      return newModals
    })
  }

  const hideModal = (keyModal) => {
    console.log('Hiding Modal...');

    const newModals = listModals.map((value) => {
      var temp = Object.assign({}, value); // console.log(temp, temp.key);
      if (Number(temp.key) === Number(keyModal)) {
        temp.active = false; // console.log('Change Value');
        temp.show = false;
      }
      return temp;
    })
    setListModals(prevState => {
      return newModals
    })
    // setShow(false)
  }


  const createModal = (keyModal, content, title = 'New Panel') => {
    console.info('Creating Modal');
    // const old = listModals
    // const isOpened = old.filter((value) => {
    //   var temp = Object.assign({}, value); console.log(keyModal, temp.key);
    //   if (Number(temp.key) === Number(keyModal)) {
    //     return true; // console.log('Change Value');
    //   }
    //   // return false;
    // })    
    // // console.log('isOpened: ', isOpened, 'OLD: ', old);

    // // let newModals = null
    // let newModals = listModals.map((value) => {
    //   var temp = Object.assign({}, value); // console.log(temp, temp.key);
    //   if (Number(temp.key) === Number(keyModal)) {
    //     temp.active = true; // console.log('Change Value');
    //     temp.show = true;
    //   } else {
    //     temp.active = false // console.log('Not Change Value');
    //   }
    //   return temp;
    // })
    // if (!isOpened.length > 0) {
    //   const newModal = {
    //     key: keyModal,
    //     title: title,
    //     components: content,
    //     show: true,
    //     active: true,
    //     isMaximized: false,
    //     pos: {
    //       top: 0,
    //       left: 0,
    //     },
    //     dim: {
    //       width: '70%',
    //       height: '70%',
    //     },
    //   }

    //   setListModals([...newModals, newModal])
    // } else {
    //   setListModals(newModals)
    // }
    // // setListModals(prevState => {
    // //   return newModals
    // // })
    // // console.log('New Modal: ', newModal);

    // // // console.log(listModals); // old.push(newModal) // setListModals(old)
    // // setListModals(prevState => {
    // //   // return old
    // //   return [
    // //     ...prevState,
    // //     newModal
    // //   ] // prevState.push(newModal)
    // // })
  }

  const cancelModal = (keyModal) => {
    console.log('cancel Modal...');

    const newModals = listModals.filter((value, index) => {
      // console.log(value.key, keyModal);
      return value.key !== keyModal
    })
    // console.log(newModals);
    setListModals(prevState => {
      return newModals // return old // prevState.push(newModal)
    })
  }

  const handleClickThumb = (e) => {
    let keyModal = e.target.dataset.index // console.log('You clicked Thumb with KEY: ', keyModal);

    const newModals = listModals.map((value) => {
      var temp = Object.assign({}, value); // console.log(temp, temp.key);
      if (Number(temp.key) === Number(keyModal)) {
        temp.active = true; // console.log('Change Value');
        temp.show = true;
      } else {
        temp.active = false // console.log('Not Change Value');
      }
      return temp;
    })
    setListModals(prevState => {
      return newModals
    }) // console.log(newModals);
  }

  return (
    <div className='admin-section padding-0'>
      <div className='admin-section inner'>
        <h5>Stories</h5>
        <div>
          <PostTable onOpenModal={createModal} />
        </div>
        {listModals.map((value, key) => {
          console.log('Value: ', value.dimEnter); console.log('Key: ', key);
          return (
            <Draggable key={value.key} show={value.show} active={value.active} indexModal={value.key} isMaximized={value.isMaximized} 
              handleClose={cancelModal} handleMinimize={hideModal} handleMaximize={resizeModal} 
              title={value.title} posEnter={value.posEnter} dimEnter={value.dimEnter} >
              {value.components()}
              {/* <Modal key={value.key} show={value.show} active={value.active} indexModal={value.key} isMaximized={value.isMaximized} handleClose={cancelModal} handleMinimize={hideModal} handleMaximize={resizeModal} 
                title={value.title} layout={value.layout} >
                <div>
                  {value.components()}
                </div>
              </Modal> */}
            </Draggable>
            
          )
        })}
      </div>
      
      <div className='thumbnail-panel-container'>
        {listModals.map((value, key) => {
          return (
            <div key={value.key} className={value.active ? 'thumb active' : 'thumb'} onClick={handleClickThumb} data-index={value.key}>
              {/* <BsFileEarmarkSpreadsheet /> <i className="fa fa-folder" data-index={value.key}></i>*/}<i className="fa-solid fa-folder-plus" data-index={value.key}></i>
            </div>
          )
        })}
      </div>
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
