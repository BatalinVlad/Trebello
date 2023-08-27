import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

import MainNavBar from '../cmps/MainNavBar';
import BoardsList from '../cmps/BoardsList';
import utils from '../services/utils';

import { loadBoards, createBoard } from '../actions/BoardActions'
import { getLoggedInUser } from '../actions/UserActions'

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const boards = useSelector(state => state.boards.boards);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadBoards());
    dispatch(getLoggedInUser());
  }, [dispatch]);

  const toggleLoginHandler = () => {
    setIsLogin(prevIsLogin => !prevIsLogin);
  };

  const createBoardHandler = async () => {
    let board = {
      teamMembers: [],
      tasks: {},
      columns: {},
      columnOrder: [],
      style: {},
      boardBgImage: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjExMTc0M30',
      history: [],
      boardBgThumbnail: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjExMTc0M30',
      createdBy: loggedInUser || { _id: 'guest', username: 'guest' }
    };
    createdBoardMessage(board);

    const newBoard = await dispatch(createBoard(board));
    navigate(`/board/${newBoard._id}`);
  }

  // const duplicateBoard = async (board) => {
  //   let duplicatedBoard = JSON.parse(JSON.stringify(board));
  //   delete duplicatedBoard._id;
  //   delete duplicatedBoard.boardBgThumbnailTitleStyle;
  //   duplicatedBoard.history = [];
  //   duplicatedBoard.teamMembers = [];
  //   duplicatedBoard.title = '';
  //   duplicatedBoard.isTemplate = false;
  //   duplicatedBoard.createdBy = this.props.loggedInUser || { _id: 'guest', username: 'guest' };
  //   for (const task in duplicatedBoard.tasks) {
  //     duplicatedBoard.tasks[task].taskTeamMembers = [];
  //     duplicatedBoard.tasks[task].createdAt = Date.now();
  //   }
  //   createdBoardMessage(duplicatedBoard);
  //   const newBoard = await this.props.createBoard(duplicatedBoard);
  //   this.props.history.push(`/board/${newBoard._id}`);
  // }

  const createdBoardMessage = (board) => {
    const username = (loggedInUser) ? loggedInUser.username : 'Guest';
    let msg = `The Board was created by ${username}`;
    board.history.push({ id: utils.getRandomId(), msg: msg, time: Date.now() });
  }


  const sendMail = (mail) => {
    window.open('mailto:' + mail);
  }



  return (
    <div className="home-page">
      {isLogin && <div className="home-page screen" onClick={toggleLoginHandler}></div>}
      <MainNavBar isLogin={isLogin} toggleLoginHandler={toggleLoginHandler} />
      
      <section className="home-page-header">
        <div className="home-page-header-container flex">
          <div className="header-image flex align-center justify-center fill-width fill-height">
            <div className="login-get-started-container flex align-center justify-center align-center">
              <div className="home-page-logo-get-started flex column align-center">
                <div className="home-page-header-container-logo-img fill-width fill-height"></div>
                <div className="text-center">
                  <h2>Manage your tasks in a fun and easy way</h2>
                </div>
                <div className="get-started-btn">
                  <Fab variant="extended">
                    <p className="uppercase" onClick={createBoardHandler}>
                      get started
                    </p>
                  </Fab>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-page-boards-list flex wrap colum justify-center">
        <div className="home-page-boards-list-img fill-width flex justify-center">
          <h3>
            We, in Trebello, believe that simplicity and style must go together,
            that's why we made our brand simple and easy to use for everyone.<br /> <br />
            Maximize your team workflow and take them one step ahead.</h3>
        </div>
      </section>

      {
        boards && loggedInUser &&
        // duplicateBoard={duplicateBoard}
        <BoardsList boards={boards} user={loggedInUser} />
      }

      <section className="home-page-footer flex column align-center justify-center">
        <div className="fill-width">
          <h2 className="text-center uppercase"> about us  </h2>
        </div>
        <div className="home-page-footer-team-members-cards-container flex wrap justify-center">
          <div className="home-page-footer-team-member-card flex column align-center justify-center">
            <div className="home-page-footer-team-member-card-member-img vlad"></div>
            <div className="info fill-width flex space-between">
              <p>Vlad Batalin</p>
              <div className="flex">
                <a href="https://www.linkedin.com/in/vlad-batalin-647725180/" target="blank"><LinkedInIcon className="linkedInIcon"></LinkedInIcon></a>
                <EmailIcon onClick={() => sendMail('batalinvlad@gmail.com')} className="mail" />
              </div>
            </div>
            <span className="text-center fill-width capitalize">Full-stack development</span>
          </div>

          <div className="home-page-footer-team-member-card flex column align-center justify-center">
            <div className="home-page-footer-team-member-card-member-img margad"></div>
            <div className="info fill-width flex space-between">
              <p>Margad Taikhir</p>
              <div className="flex">
                {/* <a href="" target="blank"><LinkedInIcon className="linkedInIcon"></LinkedInIcon></a> */}
                <EmailIcon onClick={() => sendMail('mtaikhir@gmail.com')} className="mail" />
              </div>
            </div>
            <span className="text-center fill-width capitalize">Full-Stack development</span>
          </div>

          <div className="home-page-footer-team-member-card flex column align-center justify-center">
            <div className="home-page-footer-team-member-card-member-img paolo"></div>
            <div className="info fill-width flex space-between">
              <p>Paolo Groppi</p>
              <div className="flex">
                <a href="https://www.linkedin.com/in/paolo-groppi-6ba84117b" target="blank"><LinkedInIcon className="linkedInIcon"></LinkedInIcon></a>
                <EmailIcon onClick={() => sendMail('paolo.groppi@gmail.com')} className="mail" />
              </div>
            </div>
            <span className="text-center fill-width capitalize">Full-Stack development</span>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Home
