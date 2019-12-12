import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeDash from './components/home/DashBoardHome';
import Nav from './components/nav/Nav'
import Members from './components/members/members';
import Inventory from './components/inventory/inventory'
import AuthProvider from './components/home/auth';
import PrivateRoute from './components/home/privateRoute'
import SignUp from './components/home/sign-up'
import Login from './components/home/login.js'
import Home from './components/home/home'


function App() {
  return (
    
    <div className="App">
    <header>
      <h1>Small Gym CRM</h1>
    </header>
    <Router>
      <Nav />
      <Route path='/' exact component={HomeDash} />
      <Route path='/members' component={Members} />
      <Route path='/inventory' component={Inventory} /> 
      
      <AuthProvider>
        <Router>
       <div>
      <PrivateRoute exact path='/home' component={Home}/>
      <Route exact path='/sign' component={SignUp}/>
      
      <Route exact path='/login' component={Login}/>
      </div>


      </Router>
      </AuthProvider>
      

    </Router>
    </div>
  );
}

export default App;
