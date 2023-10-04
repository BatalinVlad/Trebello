import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';

import MainNavBar from '../cmps/MainNavBar';
import BoardsList from '../cmps/BoardsList';
import utils from '../services/utils';

import { loadBoards, loadTemplateBoards, createBoard } from '../actions/BoardActions'
import { getLoggedInUser } from '../actions/UserActions'
import HomePageFooter from '../cmps/HomePageFooter';

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const boards = useSelector(state => state.boards.boards);
  const templateBoards = useSelector(state => state.templateBoards.templateBoards);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadBoards());
    dispatch(loadTemplateBoards());
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
    navigate(`/board/board/${newBoard._id}`);
  }

  const createdBoardMessage = (board) => {
    const username = (loggedInUser) ? loggedInUser.username : 'Guest';
    let msg = `The Board was created by ${username}`;
    board.history.push({ id: utils.getRandomId(), msg: msg, time: Date.now() });
  }

  return (
    <div className="home-page relative">
      {isLogin && <div className="screen" onClick={toggleLoginHandler}></div>}
      <MainNavBar isLogin={isLogin} toggleLoginHandler={toggleLoginHandler} />
      <div className="home-page-container flex wrap">
        <div className="get-started-container flex column" style={{ marginBottom: '30px' }}>
          <h1>TREBELLO</h1>
          <h2 style={{ width: '65%' }}>Manage your tasks in a fun and easy way</h2>
          <Fab variant="extended" style={{ marginTop: '35px' }}>
            <p className="uppercase" onClick={createBoardHandler}>
              get started
            </p>
          </Fab>
        </div>
        {templateBoards && <BoardsList templateBoards={templateBoards} />}
        {boards && <BoardsList boards={boards} user={loggedInUser} />}
      </div>
      <HomePageFooter />
    </div>
  )
}

export default Home
