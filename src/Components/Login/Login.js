import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation} from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import './Login.css';
import { UserContext } from '../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    //Conditionally toggle input form
    const [newUser, setNewUser] = useState(true)
    const [loggedIn, setLoggedIn, name, setName] = useContext(UserContext)
    
    //To redirect children component
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    //To store data when create account
    const [user, setUser] = useState({
        isSignIn: false,
        firstName: '',
        lastName: '',
        name:'',
        email: '',
        password: '',
        success: false,
        error: '',

    })
    const fullName = `${user.firstName} ${user.lastName}`

    //Input field validation
    const fieldValidation = (e) => {
        let isFormValid = true;
        if (e.target.name == "firstName") {
            isFormValid = e.target.value
        }
        if (e.target.name == 'lastName') {
            isFormValid = e.target.value
        }
        if (e.target.name == 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name == 'password') {
            isFormValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(e.target.value)
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }

    //Password matching message
    const passwordMatch = () => {
        const password = document.getElementById('password');
        const confirmPass = document.getElementById("confirmPass")
        const passwordMatchMessage = document.getElementById('password-message');
        if (password.value !== confirmPass.value) {
            passwordMatchMessage.innerText = "Password not match yet";
            passwordMatchMessage.style.color = 'red'
        } if (password.value == confirmPass.value) {
            passwordMatchMessage.innerText = 'Password matched';
            passwordMatchMessage.style.color = 'green'
        }
    }

    //Create an account with email and password
    const accountSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.isSignIn = true;
                    newUserInfo.error = "";
                    setUser(newUserInfo)
                    updateUserInfo(fullName)
                    setLoggedIn(true)
                    const currentUser = firebase.auth().currentUser
                    setName(currentUser.email)
                    history.replace(from);
                })
                .catch(error => {
                    var errorMessage = error.message;
                    const newUserInfo = { ...user };
                    newUserInfo.isSignIn = false;
                    newUserInfo.error = errorMessage;
                    setUser(newUserInfo)
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user }
                    newUserInfo.isSignIn = true;
                    newUserInfo.error = "";
                    setUser(newUserInfo);
                    setLoggedIn(true)
                    const currentUser = firebase.auth().currentUser
                    setName(currentUser.displayName)
                    history.replace(from);
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    const newUserInfo = { ...user };
                    newUserInfo.isSignIn = false;
                    newUserInfo.error = errorMessage;
                    setUser(newUserInfo)
                });
        }
        e.preventDefault()
    }

    //Sign in with google provider
    const googleSignInHandle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (res) {
            const { displayName, email } = res.user;
            setUser({
                name: displayName,
                email: email
            })
            setLoggedIn(true)
            const currentUser = firebase.auth().currentUser
            setName(currentUser.displayName)
            history.replace(from);
        }).catch(function (error) {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    //Sing in with facebook provider
    const fbSignInHandle = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (res) {
            const {displayName, email} = res.user;
            setUser({
                name:displayName,
                email:email
            })
            setLoggedIn(true)
            const currentUser = firebase.auth().currentUser
            setName(currentUser.displayName)
            history.replace(from);
        }).catch(function (error) {
            const errorMessage = error.message;
            const newUserInfo = {...user};
            newUserInfo.error = errorMessage;
            setUser(newUserInfo)
        });
    }

    const updateUserInfo = (name) => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

    return (
        <div className='login'>
            <div className="create-account">
                <h3>Create an account</h3>
                <form onSubmit={accountSubmit} className='form-group'>
                    {newUser &&
                        <input onBlur={fieldValidation} type="text" name="firstName" className='form-control' placeholder='First Name' required />
                    }
                    {newUser &&
                        <input onBlur={fieldValidation} type="text" name="lastName" className='form-control' placeholder='Last Name' required />
                    }
                    <input onBlur={fieldValidation} type="text" name="email" className='form-control' placeholder="Email address" required />
                    <input onBlur={fieldValidation} type="password" name="password" id='password' className='form-control' placeholder='Password' required />
                    {newUser &&
                        <input onBlur={fieldValidation} onChange={passwordMatch} type="password" name="password" id='confirmPass' className='form-control' placeholder='Confirm Password' required />
                    }
                    <label id='password-message'></label>
                    {!newUser && <input type="checkbox" name="rebember" id="" className='mr-2' />}
                    {!newUser && <label>Rebember Me</label>}
                    {!newUser && <Link className='float-right text-warning'>Forgate Password</Link>}
                    <input type="submit" value={newUser ? "Create an account" : "Sign In"} />
                </form>

                <p className='text-center'>
                    {newUser ? "Alrady have a account?" : "Don't have an account"}
                    <span onClick={() => setNewUser(!newUser)} className='btn btn-link text-warning'>{newUser ? 'Login' : 'Create an account'}</span>
                </p>
            </div>
            {user.isSignIn && <p className='text-center text-success mt-3'>Account {newUser ? "Created" : "LoggedIn"} successfully</p>}
            <p className='text-center text-danger mt-3'>{user.error}</p>
            <p className='mx-auto text-center my-3 border-bottom w-25'>Or</p>
            <button onClick  = {fbSignInHandle}>
                <i class="fa fa-facebook-official"></i>
                Continue with Facebook
            </button>
            <button onClick={googleSignInHandle}>
                <i className='fa fa-google text-success'></i>
                Continue with Google</button>
        </div>
    );
};

export default Login;