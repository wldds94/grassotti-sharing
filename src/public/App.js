import React, { Component } from 'react'
import { Form, Posts } from './js/components'

export class App extends Component {
  render() {
    return (
      <div className='graxsh-app-container graxsh-body'>
        <Form />
        <Posts />
      </div>
    )
  }
}

export default App