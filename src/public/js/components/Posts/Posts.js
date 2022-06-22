import React, { Component } from 'react';
// import Carousel from '../../modules/Carousel';
import Slider from 'react-touch-drag-slider'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

export class Posts extends Component {
    constructor(props) {
        super(props)

        this.swithcDesk = 600

        this.sliderWidth = 100
        this.sliderHeight = 100

        this.state = {
            sliders: [
                () => {
                    const images = ['http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png', 'http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png', 'http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png']

                    return (
                        <React.Fragment>
                            <div className='left graxsh-boxed-sm background-sec-col-var'>
                                <div className='images-container grid'>
                                    {!this.state.isDesktop ? (
                                        <Slider
                                            onSlideComplete={(i) => {
                                                console.log('finished dragging, current slide is', i)
                                            }}
                                            onSlideStart={(i) => {
                                                console.log('started dragging on slide', i)
                                            }}
                                            activeIndex={0}
                                            threshHold={100}
                                            transition={0.5}
                                            scaleOnDrag={true}
                                        >
                                            {images.map((i, _i) => (
                                                <div key={_i} className='image-content bg-image'
                                                    style={{
                                                        backgroundImage: `url(${i})`,
                                                    }} >
                                                </div>
                                                
                                            ))}
                                            {/* <img src={i} key={_i} /> */}
                                        </Slider>
                                    ) : (<>
                                        <div>
                                            <div className='image-content bg-image'
                                                style={{
                                                    backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png')`,
                                                }}>
                                            </div>
                                        </div>
                                        <div className='grid horizontal'>
                                            <div className='image-content bg-image'
                                                style={{
                                                    backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png')`,
                                                }}>
                                            </div>
                                            <div className='image-content bg-image'
                                                style={{
                                                    backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png')`,
                                                }}>
                                            </div>
                                        </div>
                                    </>)
                                    }

                                </div>
                                <div className='date-container small text-normal text-uppercase'>
                                    sunday 05/05/21
                                </div>
                            </div>

                            <div className='message-container flex fl-col relative'>
                                <h2 className='text-uppercase graxsh-boxed-sm background-sec-col-var relative block'>
                                    SHARE YOUR MOMENTS
                                    {!this.state.isDesktop ?
                                        (<div className='reference-container'>
                                            <span className='text-bold'>FRIENDS</span>
                                            <span className='text-normal'>MANAROLA</span>
                                        </div>) : ('')}

                                </h2>
                                <p className='graxsh-boxed-sm'>Grassotti Vermouth di Torino Red is the brainchild and long time passion of two Italian gents from Turin, Vittorio Zoppi wine&spirits huntsman, and Filippo Antonelli wine grower.
                                    Their love for vermouths and aromatized wines in general ultimately turned into a business in 2016.</p>
                                {this.state.isDesktop ?
                                    (<div className='reference-container desk'>
                                        <span className='text-bold'>FRIENDS</span>
                                        <span className='text-normal'>MANAROLA</span>
                                    </div>) : ('')}

                            </div>
                            {/* </div> */}
                        </React.Fragment>
                    )
                },
                () => {
                    const images = ['http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png', 'http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png', 'http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png']

                    return (
                        <React.Fragment>
                            <div className='left graxsh-boxed-sm background-sec-col-var'>
                                <div className='images-container grid'>
                                    {!this.state.isDesktop ? (
                                        <Slider
                                            onSlideComplete={(i) => {
                                                console.log('finished dragging, current slide is', i)
                                            }}
                                            onSlideStart={(i) => {
                                                console.log('started dragging on slide', i)
                                            }}
                                            activeIndex={0}
                                            threshHold={100}
                                            transition={0.5}
                                            scaleOnDrag={true}
                                        >
                                            {images.map((i, _i) => (
                                                <div key={_i} className='image-content bg-image'
                                                    style={{
                                                        backgroundImage: `url(${i})`,
                                                    }} >
                                                </div>
                                                
                                            ))}
                                            {/* <img src={i} key={_i} /> */}
                                        </Slider>
                                    ) : (<>
                                        <div>
                                            <div className='image-content bg-image'
                                                style={{
                                                    backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png')`,
                                                }}>
                                            </div>
                                        </div>
                                        <div className='grid horizontal'>
                                            <div className='image-content bg-image'
                                                style={{
                                                    backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png')`,
                                                }}>
                                            </div>
                                            <div className='image-content bg-image'
                                                style={{
                                                    backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png')`,
                                                }}>
                                            </div>
                                        </div>
                                    </>)
                                    }

                                </div>
                                <div className='date-container small text-normal text-uppercase'>
                                    sunday 05/05/21
                                </div>
                            </div>

                            <div className='message-container flex fl-col relative'>
                                <h2 className='text-uppercase graxsh-boxed-sm background-sec-col-var relative block'>
                                    SHARE YOUR MOMENTS
                                    {!this.state.isDesktop ?
                                        (<div className='reference-container'>
                                            <span className='text-bold'>FRIENDS</span>
                                            <span className='text-normal'>MANAROLA</span>
                                        </div>) : ('')}

                                </h2>
                                <p className='graxsh-boxed-sm'>Grassotti Vermouth di Torino Red is the brainchild and long time passion of two Italian gents from Turin, Vittorio Zoppi wine&spirits huntsman, and Filippo Antonelli wine grower.
                                    Their love for vermouths and aromatized wines in general ultimately turned into a business in 2016.</p>
                                {this.state.isDesktop ?
                                    (<div className='reference-container desk'>
                                        <span className='text-bold'>FRIENDS</span>
                                        <span className='text-normal'>MANAROLA</span>
                                    </div>) : ('')}

                            </div>
                            {/* </div> */}
                        </React.Fragment>
                    )
                },
                () => {
                    const images = ['http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png', 'http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png', 'http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png']

                    return (
                        <React.Fragment>
                            <div className='left graxsh-boxed-sm background-sec-col-var'>
                                <div className='images-container grid'>
                                    {!this.state.isDesktop ? (
                                        <Slider
                                            onSlideComplete={(i) => {
                                                console.log('finished dragging, current slide is', i)
                                            }}
                                            onSlideStart={(i) => {
                                                console.log('started dragging on slide', i)
                                            }}
                                            activeIndex={0}
                                            threshHold={100}
                                            transition={0.5}
                                            scaleOnDrag={true}
                                        >
                                            {images.map((i, _i) => (
                                                <div key={_i} className='image-content bg-image'
                                                    style={{
                                                        backgroundImage: `url(${i})`,
                                                    }} >
                                                </div>
                                                
                                            ))}
                                            {/* <img src={i} key={_i} /> */}
                                        </Slider>
                                    ) : (<>
                                        <div>
                                            <div className='image-content bg-image'
                                                style={{
                                                    backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png')`,
                                                }}>
                                            </div>
                                        </div>
                                        <div className='grid horizontal'>
                                            <div className='image-content bg-image'
                                                style={{
                                                    backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png')`,
                                                }}>
                                            </div>
                                            <div className='image-content bg-image'
                                                style={{
                                                    backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png')`,
                                                }}>
                                            </div>
                                        </div>
                                    </>)
                                    }

                                </div>
                                <div className='date-container small text-normal text-uppercase'>
                                    sunday 05/05/21
                                </div>
                            </div>

                            <div className='message-container flex fl-col relative'>
                                <h2 className='text-uppercase graxsh-boxed-sm background-sec-col-var relative block'>
                                    SHARE YOUR MOMENTS
                                    {!this.state.isDesktop ?
                                        (<div className='reference-container'>
                                            <span className='text-bold'>FRIENDS</span>
                                            <span className='text-normal'>MANAROLA</span>
                                        </div>) : ('')}

                                </h2>
                                <p className='graxsh-boxed-sm'>Grassotti Vermouth di Torino Red is the brainchild and long time passion of two Italian gents from Turin, Vittorio Zoppi wine&spirits huntsman, and Filippo Antonelli wine grower.
                                    Their love for vermouths and aromatized wines in general ultimately turned into a business in 2016.</p>
                                {this.state.isDesktop ?
                                    (<div className='reference-container desk'>
                                        <span className='text-bold'>FRIENDS</span>
                                        <span className='text-normal'>MANAROLA</span>
                                    </div>) : ('')}

                            </div>
                            {/* </div> */}
                        </React.Fragment>
                    )
                },
            ],
            activeIndex: 0,
            left: 0,
            isDesktop: false
            // next: 1
        }

        this.updatePredicate = this.updatePredicate.bind(this);
    }

    componentDidMount() {
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > this.swithcDesk });
    }

    prevSlide(e) {
        if (this.state.activeIndex === 0) {
            this.setState({
                activeIndex: this.state.sliders.length - 1,
                left: this.state.left - this.sliderWidth * (this.state.sliders.length - 1)
            })
        } else {
            this.setState({
                activeIndex: this.state.activeIndex - 1,
                left: this.state.left + 100 // this.props.sliderWidth not working for some reason
            })
        }
    }

    nextSlide(e) {
        if (this.state.activeIndex === this.state.sliders.length - 1) {
            this.setState({
                activeIndex: 0,
                left: 0,
            })
        } else {
            this.setState({
                activeIndex: this.state.activeIndex + 1,
                left: this.state.left - 100,
                // next: this.state.next + 1,
            })
        }
    }

    render() {
        const style = {
            left: this.state.left + '%',
            width: this.sliderWidth + '%',
            height: this.sliderHeight + '%',
        };
        const isDesktop = this.state.isDesktop;

        return (
            <React.Fragment>
                <div className='graxsh-posts-container'>
                    <div className='graxsh-posts-content'>
                        <div className='graxsh-posts-header graxsh-boxed-sm background-sec-col-var'>
                            <span className='h4 text-red text-uppercase text-normal'>YOUR OPINION</span>
                            <h2 className='text-uppercase'>Produced to be delicious on its own on the rocks.</h2>
                        </div>

                        <div className='graxsh-story-sliders-container relative'>
                            <div className='graxsh-sliders-box relative'>
                                {this.state.sliders.map((slideFn, index) => {
                                    // console.log(index, this.state.activeIndex);
                                    return (
                                        <div key={index} className={index === this.state.activeIndex ? 'graxsh-slider-content grid relative active' : 'graxsh-slider-content grid relative'} style={style}>
                                            {slideFn()}
                                        </div>
                                    )

                                })}
                            </div>

                            <span className='navigation grid graxsh-boxed-sm'>
                                <span className='pagination small text-uppercase text-bold block'>
                                    {this.state.activeIndex + 1}/{this.state.sliders.length}
                                </span>

                                <div className='sliding grid'>
                                    <span className='prev block' onClick={this.prevSlide.bind(this)}>
                                        <BsArrowLeft /> {isDesktop ? (<span className="small text-uppercase text-bold inline-block">GUARDA IL PRECEDENTE</span>) : ('')}
                                    </span>
                                    <span className='next block' onClick={this.nextSlide.bind(this)}>
                                        {isDesktop ? (<span className="small text-uppercase text-bold inline-block">GUARDA IL PROSSIMO</span>) : ('')} <BsArrowRight />
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