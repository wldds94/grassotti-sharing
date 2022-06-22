import React, { Component } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

export class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sliders: [
                () => {
                    return (<div className='graxsh-slider-content grid relative'>
                        <div className='left'>
                            <div className='images-container grid'>
                                <div>
                                    {/* <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png" alt="Girl in a jacket" /> */}
                                    <div className='image-content bg-image'
                                        style={{
                                            backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png')`,
                                        }} >
                                        {/* <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png" alt="Girl in a jacket" /> */}
                                    </div>
                                </div>
                                <div className='grid horizontal'>
                                    <div className='image-content bg-image'
                                        style={{
                                            backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png')`,
                                        }} >
                                    </div>
                                    <div className='image-content bg-image'
                                        style={{
                                            backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png')`,
                                        }} >
                                    </div>
                                    {/* <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png" alt="Girl in a jacket" />
                                <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png" alt="Girl in a jacket" /> */}
                                </div>
                            </div>
                            <div className='date-container small text-normal text-uppercase'>
                                sunday 05/05/21
                            </div>
                        </div>

                        <div className='message-container flex fl-col'>
                            <h2 className='text-uppercase'>SHARE YOUR MOMENTS</h2>
                            <p>Grassotti Vermouth di Torino Red is the brainchild and long time passion of two Italian gents from Turin, Vittorio Zoppi wine&spirits huntsman, and Filippo Antonelli wine grower.
                                Their love for vermouths and aromatized wines in general ultimately turned into a business in 2016.</p>
                            <div className='reference-container'>
                                <span className='text-bold'>FRIENDS</span>
                                <span className='text-normal'>MANAROLA</span>
                            </div>
                        </div>
                    </div>)
                },
                () => {
                    return (<div className='graxsh-slider-content grid relative active'>
                        <div className='left'>
                            <div className='images-container grid'>
                                <div>
                                    {/* <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png" alt="Girl in a jacket" /> */}
                                    <div className='image-content bg-image'
                                        style={{
                                            backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png')`,
                                        }} >
                                        {/* <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png" alt="Girl in a jacket" /> */}
                                    </div>
                                </div>
                                <div className='grid horizontal'>
                                    <div className='image-content bg-image'
                                        style={{
                                            backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png')`,
                                        }} >
                                    </div>
                                    <div className='image-content bg-image'
                                        style={{
                                            backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png')`,
                                        }} >
                                    </div>
                                    {/* <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png" alt="Girl in a jacket" />
                                        <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png" alt="Girl in a jacket" /> */}
                                </div>
                            </div>
                            <div className='date-container small text-normal text-uppercase'>
                                sunday 05/05/21
                            </div>
                        </div>

                        <div className='message-container flex fl-col'>
                            <h2 className='text-uppercase'>SHARE YOUR MOMENTS</h2>
                            <p>Grassotti Vermouth di Torino Red is the brainchild and long time passion of two Italian gents from Turin, Vittorio Zoppi wine&spirits huntsman, and Filippo Antonelli wine grower.
                                Their love for vermouths and aromatized wines in general ultimately turned into a business in 2016.</p>
                            <div className='reference-container'>
                                <span className='text-bold'>FRIENDS</span>
                                <span className='text-normal'>MANAROLA</span>
                            </div>
                        </div>
                    </div>)

                },
                () => {
                    return (<div className='graxsh-slider-content grid relative'>
                        <div className='left'>
                            <div className='images-container grid'>
                                <div>
                                    {/* <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png" alt="Girl in a jacket" /> */}
                                    <div className='image-content bg-image'
                                        style={{
                                            backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png')`,
                                        }} >
                                        {/* <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png" alt="Girl in a jacket" /> */}
                                    </div>
                                </div>
                                <div className='grid horizontal'>
                                    <div className='image-content bg-image'
                                        style={{
                                            backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png')`,
                                        }} >
                                    </div>
                                    <div className='image-content bg-image'
                                        style={{
                                            backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png')`,
                                        }} >
                                    </div>
                                    {/* <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png" alt="Girl in a jacket" />
                                        <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png" alt="Girl in a jacket" /> */}
                                </div>
                            </div>
                            <div className='date-container small text-normal text-uppercase'>
                                sunday 05/05/21
                            </div>
                        </div>

                        <div className='message-container flex fl-col'>
                            <h2 className='text-uppercase'>SHARE YOUR MOMENTS</h2>
                            <p>Grassotti Vermouth di Torino Red is the brainchild and long time passion of two Italian gents from Turin, Vittorio Zoppi wine&spirits huntsman, and Filippo Antonelli wine grower.
                                Their love for vermouths and aromatized wines in general ultimately turned into a business in 2016.</p>
                            <div className='reference-container'>
                                <span className='text-bold'>FRIENDS</span>
                                <span className='text-normal'>MANAROLA</span>
                            </div>
                        </div>
                    </div>)
                }

            ],
            activeIndex: 0,
            next: 1
        }
    }

    prevSlide(e) {
        this.setState({
            activeIndex: this.state.activeIndex - 1,
            next: this.state.next - 1 // this.props.sliderWidth not working for some reason
        })
        // if (this.state.activeIndex === 1) {
        //     this.setState({
        //         activeIndex: this.state.activeIndex + this.state.slider.length - 1,
        //         left: this.state.left - this.props.sliderWidth * (this.state.slider.length - 1)
        //     })
        // }
    }

    nextSlide(e) {
        console.log(e);
        this.setState({
            activeIndex: this.state.activeIndex + 1,
            next: this.state.next + 1,
        })
        // if (this.state.activeIndex === this.state.slider.length) {
        //     this.setState({
        //         activeIndex: this.state.activeIndex - this.state.slider.length + 1,
        //         left: 0
        //     })
        // }
    }

    render() {
        return (
            <React.Fragment>
                <div className='graxsh-posts-container'>
                    <div className='graxsh-posts-content'>
                        <span className='h4 text-red text-uppercase text-normal'>YOUR OPINION</span>
                        <h2 className='text-uppercase'>Produced to be delicious on its own on the rocks.</h2>
                        <div className='graxsh-post-content graxsh-story-sliders-container relative'>

                            {this.state.sliders.map((slideFn, index) => {
                                console.log(index, this.state.activeIndex);
                                <div className={index === this.state.activeIndex ? 'graxsh-slider-content grid relative active' : 'graxsh-slider-content grid relat'}>
                                    
                                    TEST
                                </div>
                            })}

                            <span className='navigation grid'>
                                <span className='pagination small text-uppercase text-bold block'>
                                    01/05
                                </span>

                                <div className='sliding grid'>
                                    <span className='prev small text-uppercase text-bold block'>
                                        <BsArrowLeft /> GUARDA IL PRECEDENTE
                                    </span>
                                    <span className='next small text-uppercase text-bold block relative' onClick={this.nextSlide.bind(this)}>
                                        GUARDA IL PROSSIMO <BsArrowRight />
                                    </span>
                                </div>

                            </span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Posts