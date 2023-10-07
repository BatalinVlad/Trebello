import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MainNavBar from '../cmps/MainNavBar';
import BoardsList from '../cmps/BoardsList';

import { loadBoards, loadTemplateBoards } from '../actions/BoardActions'
import { getLoggedInUser } from '../actions/UserActions'
import HomePageFooter from '../cmps/HomePageFooter';
import NewBoardModal from '../cmps/NewBoardModal';

const Home = () => {
  const [toggleNewBoardModal, setToggleNewBoardModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const boards = useSelector(state => state.boards.boards);
  const templateBoards = useSelector(state => state.templateBoards.templateBoards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBoards());
    dispatch(loadTemplateBoards());
    dispatch(getLoggedInUser());
  }, [dispatch]);

  const toggleLoginHandler = () => {
    setIsLogin(prevIsLogin => !prevIsLogin);
  };

  const toggleNewBoardModalHandler = () => {
    setToggleNewBoardModal(prevState => !prevState);
  };

  const closeAll = () => {
    setIsLogin(false);
    setToggleNewBoardModal(false);
  }

  return (
    <div className="home-page relative">
      {isLogin && <div className="screen" onClick={closeAll}></div>}
      {toggleNewBoardModal && <div className="screen" onClick={closeAll}></div>}

      {toggleNewBoardModal && <NewBoardModal loggedInUser={loggedInUser} />}
      <MainNavBar isLogin={isLogin} toggleLoginHandler={toggleLoginHandler} />
      <div className="home-page-container flex column relative">
        <div className="get-started-container flex justify-center">
          <div className='content flex column'>
            <h1>TREBELLO</h1>
            <h2>Manage your tasks in a fun and easy way</h2>
            <button className='get-started-btn' style={{ marginTop: '35px' }} onClick={toggleNewBoardModalHandler}>
              <p className="uppercase">
                get started
              </p>
            </button>
          </div>
          <div className='get-started__img wrapper'>
            <img src='https://res.cloudinary.com/dzeycmkct/image/upload/v1696616042/get_started_img_wvhw22.png' alt='none'
              className='fill obj-contain' style={{ paddingLeft: '20px' }} />
          </div>
        </div>
        <BoardsList templateBoards={templateBoards} />
        <BoardsList boards={boards} user={loggedInUser} toggleNewBoardModal={toggleNewBoardModalHandler} />
      </div>
      <div className='footer-bgimg fill-width absolute'></div>
      <HomePageFooter />
    </div>
  )
}

export default Home
