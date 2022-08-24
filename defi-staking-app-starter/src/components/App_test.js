import React, {Component} from 'react'
import './App.css'

class AppTest extends Component {
    // React code goes here
    render() {
        const newLocal = <div class="header" style = {{background: 'yellow'}}>
            <img src="https://cdn.pixabay.com/photo/2015/11/19/08/47/banner-1050615__340.jpg" class="headerImg"></img>
            <div class="bottom-left">Bottom Left</div>
            <div class="top-left">Top Left</div>
            <div class="top-right">Top Right</div>
            <div class="bottom-right">Bottom Right</div>
            <div class="centered">Centered</div>
        </div>;
        return (
            <div>
                <div className='text-center' style={{color: 'green', fontSize: '30px', backgroundColor: 'red'}}>
                    'Hello World!!!'
                </div> 
                {newLocal}   
            </div>
        )
    }
}

export default AppTest;