import React, {useEffect} from "react"

import { CSSTransition } from 'react-transition-group';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Login from '../cmps/Login';
import utils from '../services/utils';

import { useSelector, useDispatch } from 'react-redux';
import { logout, getLoggedInUser } from '../actions/UserActions'

const MainNavBar = ({ toggleLoginHandler , isLogin }) => {
    
    const loggedInUser = useSelector(state => state.user.loggedInUser);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getLoggedInUser());
    }, [dispatch]);

    const logoutHandler = () => {
        dispatch(logout());
    }
    return (
        <React.Fragment>
            <div className="home-page-login flex justify-end align-center">
                {loggedInUser &&
                    <div className="flex">
                        <div className="team-member-icon flex align-center uppercase" style={{ background: loggedInUser.color , boxShadow: '0px 0px 1px 0px #000000bf'}}>
                            <p className="uppercase">
                                {utils.createUserIcon(loggedInUser.firstName,
                                    loggedInUser.lastName)}
                            </p>
                        </div>
                        <p className="flex column" style={{ paddingRight: 10 }}>
                            <small>welcome back!</small>
                            {loggedInUser.username}
                        </p>
                    </div>
                }
                {loggedInUser ?
                    <ExitToAppIcon className="login-btn" onClick={logoutHandler} />
                    :
                    <div className="login-btn cursor-pointer flex" onClick={toggleLoginHandler}>
                        <PersonOutlineIcon />
                        <p>login</p>
                    </div>
                }
            </div>

            <CSSTransition
                in={isLogin}
                timeout={700}
                classNames="modal"
                unmountOnExit>
                <Login
                    className="home-page-login"
                    toggleLogin={toggleLoginHandler} />
            </CSSTransition>

        </React.Fragment>
    )
}

export default MainNavBar