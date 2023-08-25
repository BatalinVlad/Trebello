// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   getLoggedInUser,
//   login,
//   logout,
//   signup
// } from '../actions/UserActions';

// const Login = props => {
//   const [msg, setMsg] = useState('');
//   const [loginCred, setLoginCred] = useState({ email: '', password: '' });
//   const [signupCred, setSignupCred] = useState({
//     firstName: '',
//     lastName: '',
//     username: '',
//     email: '',
//     password: ''
//   });


//   return (
//     <div className="board-page-nav-bar flex align-center space-between">
//     <div className="board-page-nav-bar-logo" onClick={goBackHandler}> </div>
//     <div className="flex align-center">
//       {loggedInUser &&
//         <div className="flex">
//           <div className="team-member-icon-wrapper flex align-center justify-center" style={{ backgroundColor: 'rgba(223, 225, 230, 0.8)', color: '#172b4d' }} >
//             <div className="team-member-icon">
//               <p>
//                 {utils.createUserIcon(loggedInUser.firstName,
//                   loggedInUser.lastName)}
//               </p>
//             </div>
//           </div>

//           {!mobileMod &&
//             <div className="logged-in-user flex column">
//               <small>Logged as:</small>
//               <p> {loggedInUser.username}</p>
//             </div>
//           }
//         </div>
//       }
//       {
//         !loggedInUser ? <ExitToAppIcon onClick={logOutHandler} /> :
//           <div className="login-btn flex"
//             onClick={ev => toggleLogin(ev)}>
//             <PersonOutlineIcon />
//             <p>login</p>
//           </div>
//       }
//     </div>
//   </div>
//   );
// }


// export default Login;
