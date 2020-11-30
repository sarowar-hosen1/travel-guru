import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/Logo1.png';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebaseConfig';
import './Navbar.css';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Navbar = () => {
    const [loggedIn, setLoggedIn, name, setName] = useContext(UserContext);

    //To set booking start button link
    const history = useHistory()

    //Handle sign out
    const signOutHandle = () => {
        if (loggedIn) {
            firebase.auth().signOut().then(function () {
                setLoggedIn(false);
                setName('');
            }).catch(function (error) {
                // An error happened.
            });
        }
    }

    return (
        <nav class="navbar navbar-expand-lg ">
            <div className="container">
                <img onClick={() => history.push('/')} src={logo} alt="" />
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li className='nav-item'>
                            <form class="form-inline my-2 my-lg-0">
                                <input class="form-control mr-sm-2" placeholder="Search your destination"></input>
                            </form>
                        </li>
                        <li class="nav-item">
                            <Link to='/' class="nav-link">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link">News</Link>
                        </li>
                        <li class="nav-item">
                            <Link to='/destination' class="nav-link">Destination</Link>
                        </li>
                        <li class="nav-item">
                            <Link to='/contact' class="nav-link">Contact</Link>
                        </li>
                        <li class="nav-item">
                            <Link to='/blog' class="nav-link">Blog</Link>
                        </li>
                        {loggedIn && <li className='nav-item'>
                            <Link className='nav-link text-warning text-capitalize'>{name}</Link>
                        </li>}
                        <li class="nav-item login">
                            <Link 
                            onClick={signOutHandle} 
                            to={!loggedIn && '/login'} 
                            class="nav-link">
                            {loggedIn ? "Sing Out" : "Login"}
                        </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;