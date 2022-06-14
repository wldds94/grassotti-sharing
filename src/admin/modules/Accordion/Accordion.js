import React, { Component } from 'react'
import axios from 'axios';

import Panel from './_Panel'
import { ImNewspaper } from 'react-icons/im'
import { FiSettings } from 'react-icons/fi'
import { GrContact } from 'react-icons/gr'

import './Accordion.scss'
import { FormSettings } from '../../components';


export class Accordion extends Component {
    constructor(props) {
        super(props);

        // this.api = axios.create({
        //     baseURL: wlninja_graxsh_admin_vars.ajax_url
        // })

        // this.loadData = this.loadData.bind(this)
        // // this.props.panels = [
        // //     {
        // //         active: true,
        // //         label: 'Seriously, Don\'t Use Icon Fonts',
        // //         content: 'Icons are everywhere. These "little miracle workers" (as John Hicks described them) help us reinforce meaning in the interfaces we design and build. Their popularity in web design has never been greater; the conciseness and versatility of pictograms in particular make them a lovely fit for displays large and small. But icons on the web have had their fair share of challenges.',
        // //     },
        // //     {
        // //         active: true,
        // //         label: 'Screen Readers Actually Read That Stuff',
        // //         content: 'Most assistive devices will read aloud text inserted via CSS, and many of the Unicode characters icon fonts depend on are no exception. Best-case scenario, your "favorite" icon gets read aloud as "black favorite star." Worse-case scenario, it\'s read as "unpronounceable" or skipped entirely.',
        // //     },	
        // //     {
        // //         active: false,
        // //         label: 'They Fail Poorly and Often',
        // //         content: 'When your icon font fails, the browser treats it like any other font and replaces it with a fallback. Best-case scenario, you\'ve chosen your fallback characters carefully and something weird-looking but communicative still loads. Worse-case scenario (and far more often), the user sees something completely incongruous, usually the dreaded "missing character" glyph.',
        // //     },
        // //     {
        // //         active: false,
        // //         label: 'They\'re a Nightmare if You\'re Dyslexic',
        // //         content: 'Many dyslexic people find it helpful to swap out a website\'s typeface for something like OpenDyslexic. But icon fonts get replaced as well, which makes for a frustratingly broken experience.',
        // //     },
        // // ];

        this.state = {
            panels: [
                {
                    active: true,
                    label: () => {
                        return (
                            <div>
                                <GrContact />
                                Get in TOUCH
                            </div>
                        )
                    },
                    content: () => {
                        return (
                            <div className="dash-stats">
                                <div>
                                    <div className='dash-header'>
                                        NEWS
                                    </div>
                                    <div className='dash-content'>
                                        <ul>
                                            <li>
                                                <ImNewspaper />
                                                <span>8 storie nell'ultima settimana</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <div className='dash-header'>
                                        STATS
                                    </div>
                                </div>
                            </div>
                        )
                    },
                },
                {
                    active: true,
                    label: () => {
                        return (
                            <div>
                                <FiSettings />
                                SETTINGS
                            </div>
                        )
                    },
                    content: () => {
                        return (
                            <div>
                                <p>EMAIL SETTINGS ON SAVING / PUBLISHING</p>
                                <FormSettings /* data={this.state.settings} */ />
                            </div>
                        )
                    },
                },
            ],
            // // settings: {
            // //     send_response: false,
            // //     email_response: '',
            // //     send_content_custom: false,
            // //     email_content_custom: '',
            // // }
            // settings: {
            //     send_response: true,
            //     email_response: 'test@test.c',
            //     send_content_custom: true,
            //     email_content_custom: 'Test',
            // }
        };

        // this.activateTab = this.activateTab.bind(this);
    }

    // componentDidMount() {
    //     this.loadData()
    // }

    // loadData() {
    //     // console.log('You useEffect...');
    //     const formData = new FormData();
    //     formData.append("action", 'graxsh_route');
    //     formData.append("wlank_graxsh_nonce", wlninja_graxsh_admin_vars.wl_nonce);
    //     formData.append("route", 'api/v1/settings/read');

    //     this.api.post("", formData)
    //         .then(res => {
    //             const response = res.data;
    //             const list = response.response.data; console.log(response.response.data);
    //             this.setState({
    //                 settings: list
    //             })
    //             // setData(list)
    //         })
    //         .catch(error => {
    //             console.log("Error")
    //         })
    // }

    activateTab(index) {
        console.log('Activting Tab');
        const newPanels = this.state.panels.map((panel, key) => {
            var temp = Object.assign({}, panel);
            if (key === index) {
                temp.active = !panel.active
                //     console.log('Equal');
                // } else {
                //     console.log('Different');
            }
            return temp;
        })
        this.setState({
            panels: newPanels
        });
    }

    render() {
        const { panels } = this.state;
        // const { activeTab } = this.state;
        return (
            <div className='accordion' role='tablist'>
                {panels.map((panel, index) =>
                    <Panel
                        key={index}
                        activeTab={panel.active}
                        index={index}
                        {...panel}
                        activateTab={this.activateTab.bind(this)}
                        /* onUpdateData={this.loadData} */
                    />
                )}
            </div>
        );
    }
}

export default Accordion