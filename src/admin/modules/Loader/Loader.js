import React, { Component } from 'react'
import './Loader.scss'

export class Loader extends Component {
    render() {
        return (
            <div id='loader-overlay'>
                <div id='loader-outer'>
                    <div id='middle'>

                        <div id='inner'>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Loader