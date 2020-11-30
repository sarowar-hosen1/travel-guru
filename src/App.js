import './App.css';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Booking from './Components/Booking/Booking';
import Login from './Components/Login/Login';
import { createContext, useState } from 'react';
import Destinations from './Components/Destinations/Destinations';
import Contacts from './Components/Contacts/Contacts';
import Blog from './Components/Blog/Blog';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  return (
    <UserContext.Provider value={[loggedIn, setLoggedIn, name, setName, area, setArea]}>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>

          <Route path='/booking/:id'>
            <Booking></Booking>
          </Route>

          <Route exact path='/login'>
            <Login></Login>
          </Route>

          <PrivateRoute exact path ='/destination'>
            <Destinations></Destinations>
          </PrivateRoute>

          <Route exact path='/contact'>
            <Contacts></Contacts>
          </Route>
          <Route exact path='/blog'> 
            <Blog></Blog>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
