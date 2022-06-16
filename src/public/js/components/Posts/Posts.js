import React, { Component } from 'react';
// import './Posts.scss';
// http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png
// http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png
// http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png

export class Posts extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <div className='graxsh-posts-container'>
                    <span className='h4 text-red text-uppercase text-normal'>YOUR OPINION</span>
                    <h2 className='text-uppercase'>Produced to be delicious on its own on the rocks.</h2>
                    <div className='graxsh-post-content grid'>
                        <div className='images-container grid'>
                            <div>
                                {/* <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png" alt="Girl in a jacket" /> */}
                                <div className='image-content bg-image' 
                                    style={{
                                        backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png')`,}} >
                                    {/* <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/vertical.png" alt="Girl in a jacket" /> */}
                                </div>
                            </div>
                            <div className='grid horizontal'>
                                <div className='image-content bg-image' 
                                    style={{
                                        backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png')`,}} >
                                </div>
                                <div className='image-content bg-image' 
                                    style={{
                                        backgroundImage: `url('http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png')`,}} >
                                </div>
                                {/* <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-1.png" alt="Girl in a jacket" />
                                <img src="http://grax.it/wp-content/plugins/grassotti-sharing/src/public/js/components/Posts/horizontal-2.png" alt="Girl in a jacket" /> */}
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
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Posts