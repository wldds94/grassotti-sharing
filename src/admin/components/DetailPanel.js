import React, { Component } from 'react'

export class DetailPanel extends Component {
    constructor(props) {
        super(props)
    }

    renderHtml(string) {
        return { __html: string };
    }

    render() {
        const { rowData } = this.props.details
        const { children } = rowData
        // console.log(this.props.details, rowData, children);
        return (
            <div className='detail-panel'>
                <div className='detail-content' dangerouslySetInnerHTML={this.renderHtml(rowData.post_content)} />
                <div className='detail-attach' >
                    {children.map(child => {
                        console.log('Url: ', child.meta);
                        return (
                            <div className='detail-attach__image' style={{
                                backgroundImage: `url(${child.meta})`
                            }}>
                            </div>
                        )
                    })}
                </div>
                {/* <div>
                    <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/C0DPdy98e4c"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    />
                </div> */}
            </div>
        )
    }
}

export default DetailPanel