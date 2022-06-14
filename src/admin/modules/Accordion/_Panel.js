import React, { Component, /* useRef,  */createRef } from 'react'

export class _Panel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0
        };

        this.pRef = createRef()
    }

    componentDidMount() {
        window.setTimeout(() => {
            // const el = ReactDOM.findDOMNode(this);
            if (!this.pRef.current) {
                console.log('ref not isset');
                return
            }
            const height = this.pRef.current.querySelector('.panel__inner').scrollHeight;
            this.setState({
                height
            });
        }, 333);
    }

    activateTabKey() {
        const { index, activateTab } = this.props;
        activateTab(index)
    }

    render() {
        const { label, content, activeTab, index, activateTab } = this.props;
        const { height } = this.state;
        const isActive = activeTab;
        const innerStyle = {
            height: `${isActive ? height : 0}px`
        }

        return (
            <div className='panel'
                role='tabpanel'
                aria-expanded={isActive} ref={this.pRef}>
                <button className='panel__label'
                    role='tab'
                    onClick={this.activateTabKey.bind(this)}>
                    {label()}
                </button>
                <div className='panel__inner'
                    style={innerStyle}
                    aria-hidden={!isActive}>
                    <div className='panel__content'>
                        {content()}
                    </div>
                </div>
            </div>
        );
    }
}

export default _Panel