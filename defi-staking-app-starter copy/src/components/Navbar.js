import React, {Component} from 'react'
import logo from '../eth-logo.png'

class Navbar extends Component {
    // React code goes here
    render() {
        return (
            <nav className='navbar navbar-dark fixed-top shadow p-0' style={{backgroundColor:'black'}}>
                <a className='navbar-brand col-sm-3 col-md-2 mr-0'
                style={{color:'white'}}>
                <img src={logo} width='20' height='20' className='d-inline-block align-items-center' alt='bank logo'/>
                &nbsp; a Blockchain App
                </a>
                <ul className='navbar-nav mr-3'>
                    <li className='text-nowrap d-none nav-item d-sm-none d-sm-block'>
                        <small style={{color:'white'}}> Account Number: {this.props.account}
                        </small>

                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;