import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoggedInUser,
  login,
  logout,
  signup
} from '../actions/UserActions';

const Login = props => {
  const [msg, setMsg] = useState('');
  const [loginCred, setLoginCred] = useState({ email: '', password: '' });
  const [signupCred, setSignupCred] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [dispatch])

  const loginHandleChange = ev => {
    const { name, value } = ev.target;
    setLoginCred(prevLoginCred => ({
      ...prevLoginCred,
      [name]: value
    }));
  };

  const signupHandleChange = ev => {
    const { name, value } = ev.target;
    setSignupCred(prevSignupCred => ({
      ...prevSignupCred,
      [name]: value
    }));
  };

  const doLogin = async ev => {
    ev.preventDefault();
    const { email, password } = loginCred;
    if (!email || !password) {
      return setMsg('Please enter user/password');
    }
    const userCreds = { email, password };
    dispatch(login(userCreds));
    setLoginCred({ email: '', password: '' });
  };


  const doSignup = async ev => {
    ev.preventDefault();
    const { firstName, lastName, username, email, password } = signupCred;
    if (!firstName || !lastName || !email || !password || !username) {
      return setMsg('All inputs are required!');
    }
    const signupCreds = { firstName, lastName, username, email, password };
    dispatch(signup(signupCreds));
    setSignupCred({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    });
  };

  const doLogout = () => {
    dispatch(logout());
  };

  const doStopPropagation = ev => {
    ev.stopPropagation();
  };



  let signupSection = (
    <form className="login-container-signup text-center" onSubmit={doSignup}>
      <p>Not a member yet? Sign up!</p>
      <input
        type="text"
        name="firstName"
        value={signupCred.firstName}
        onChange={signupHandleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        value={signupCred.lastName}
        onChange={signupHandleChange}
        placeholder="Last Name"
      />
      <input
        type="text"
        name="email"
        value={signupCred.email}
        onChange={signupHandleChange}
        placeholder="Email"
      />
      <br />
      <input
        type="text"
        name="username"
        value={signupCred.username}
        onChange={signupHandleChange}
        placeholder="Username"
      />
      <br />
      <input
        name="password"
        type="password"
        value={signupCred.password}
        onChange={signupHandleChange}
        placeholder="Password"
      />
      <br />
      <button className="login-container-signup-btn">Signup</button>
    </form>
  );

  let loginSection = (
    <form className="login-container-login text-center" onSubmit={doLogin}>
      <p> Login: </p>
      <input
        type="text"
        name="email"
        value={loginCred.email}
        onChange={loginHandleChange}
        placeholder="Email"
      />
      <br />
      <input
        type="password"
        name="password"
        value={loginCred.password}
        onChange={loginHandleChange}
        placeholder="Password"
      />
      <br />
      <button className="login-container-login-btn">Login</button>
    </form>
  );

  return (
    <div className="login-container flex column align-center" onClick={doStopPropagation} >
      <div className="login-container-logo">
      </div>
      <h2>{msg}</h2>
      <div className={"login-container-form-container"}>
        {loggedInUser && (
          <div>
            <h2 className="login-container-loggedin-username"> <p>Welcome!</p> {loggedInUser.username} </h2>
            <div className="fill-width flex">
              <button className="login-container-form-container-logout" onClick={doLogout}>Logout</button>
            </div>
          </div>
        )}
        
        {!loggedInUser && loginSection}
        <hr />
        {!loggedInUser && signupSection}
      </div>
    </div>
  );
}


export default Login;
