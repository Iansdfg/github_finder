import React, { useState, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

const App = () =>  {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  const searchUsers = async (text) => {
    setLoading(true);

    const res = await axios
    .get(`https://api.github.com/search/users?q=
    ${text}&clint_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&clint_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers(res.data.items);
    setLoading(false);


  };

  //get single user
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios
    .get(`https://api.github.com/users/${username}?clint_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&clint_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);

  }

  //get user repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios
    .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&clint_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&clint_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
  }

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({msg, type});
    setTimeout(() => setAlert(null), 2000)
  };

  return ( 
    <Router>
      <div className="App">
        <Navbar title = "Github Finder" icon = "fab fa-github" />
        <div className = 'container'>
          <Alert 
              alert = {alert}/>
          <Switch>
            <Route exact path = '/' render = {props => (
              <Fragment>
                <Search 
                    searchUsers = {searchUsers}
                    clearUsers = {clearUsers}
                    showClear = {users.length > 0 ? true:false}
                    setAlert = {showAlert}/>
                <Users 
                    loading = {loading}  
                    users = {users}/>
              </Fragment>
            )} />

            <Route exact path = '/about' component = {About}/> 

            <Route exact path = '/user/:login' render = {props =>(
              <User { ...props } 
                    getUser = {getUser} 
                    getUserRepos = {getUserRepos}
                    user = {user} 
                    repos = {repos}
                    loading = {loading}/>
            )}/>

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
