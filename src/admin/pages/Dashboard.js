import React, { Component } from 'react'
import { Accordion } from '../modules';
// import Employes from './Employes'

export class Dashboard extends Component {
    constructor(props) {
        super(props)

        // this.panels = [
        //     {
        //         active: true,
        //         label: 'Seriously, Don\'t Use Icon Fonts',
        //         content: 'Icons are everywhere. These "little miracle workers" (as John Hicks described them) help us reinforce meaning in the interfaces we design and build. Their popularity in web design has never been greater; the conciseness and versatility of pictograms in particular make them a lovely fit for displays large and small. But icons on the web have had their fair share of challenges.',
        //     },
        //     {
        //         active: true,
        //         label: 'Screen Readers Actually Read That Stuff',
        //         content: 'Most assistive devices will read aloud text inserted via CSS, and many of the Unicode characters icon fonts depend on are no exception. Best-case scenario, your "favorite" icon gets read aloud as "black favorite star." Worse-case scenario, it\'s read as "unpronounceable" or skipped entirely.',
        //     },	
        //     {
        //         active: false,
        //         label: 'They Fail Poorly and Often',
        //         content: 'When your icon font fails, the browser treats it like any other font and replaces it with a fallback. Best-case scenario, you\'ve chosen your fallback characters carefully and something weird-looking but communicative still loads. Worse-case scenario (and far more often), the user sees something completely incongruous, usually the dreaded "missing character" glyph.',
        //     },
        //     {
        //         active: false,
        //         label: 'They\'re a Nightmare if You\'re Dyslexic',
        //         content: 'Many dyslexic people find it helpful to swap out a website\'s typeface for something like OpenDyslexic. But icon fonts get replaced as well, which makes for a frustratingly broken experience.',
        //     },
        // ];
    }

    render() {
        return (
            <div className='admin-section padding-0 no-overflow'>
                <div className='admin-section__header'>
                    <h5>Dashboard</h5>
                </div>
                <div className='admin-section inner'>
                    {/* <Employes /> */}
                    {/* <div className='admin-section__inner'> */}
                        <Accordion /* panels={this.panels} */ />
                        {/* <Accordion panels={ panels }/> */}
                    {/* </div> */}
                </div>
            </div>

        )
    }
}

export default Dashboard