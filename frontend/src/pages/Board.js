import React, { useState, useEffect, useRef } from 'react';
import { store } from 'react-notifications-component';
// import FastAverageColor from 'fast-average-color';
import { CSSTransition } from 'react-transition-group';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';


import LoadPage from '../cmps/LoadPage';
import BoardColumns from '../cmps/BoardColumns';
import BoardHistory from '../cmps/BoardHistory';
import BoardTeamMembers from '../cmps/BoardTeamMembers';
import ColumnAddForm from '../cmps/ColumnAddForm';
import Login from '../cmps/Login';
// import Sort from '../cmps/Sort';
import SplashMenu from '../cmps/SplashMenu';
import TaskDetails from '../cmps/TaskDetails';
import DynamicMiniComponent from '../cmps/dynamics/DynamicMiniComponent';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import utils from '../services/utils';
import SocketService from '../services/SocketService';

import { useSelector, useDispatch } from 'react-redux';
import { loadBoard, updateBoard, setBoard } from '../actions/BoardActions';
import { logout, getLoggedInUser, getUsers } from '../actions/UserActions';
import NavBarFilters from '../cmps/NavBarFilters';

const Board = () => {
  const [filteredBoard, setFilteredBoard] = useState(null);
  const [showColAddForm, setShowColAddForm] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showMiniTaskDetails, setShowMiniTaskDetails] = useState(false);
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleSplashMenu, setToggleSplashMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [toggleBoardTeamMembers, setToggleBoardTeamMembers] = useState(false);
  const [showTopMenuOptions, setShowTopMenuOptions] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // const [sortBy, setSortBy] = useState(null);
  // const [sortOrder, setSortOrder] = useState(null);
  const [filterBy, setFilterBy] = useState(null);

  const [miniTaskDetails, setMiniTaskDetails] = useState({});
  const [currColumnId, setCurrColumnId] = useState('');
  const [isBoardLoaded, setIsBoardLoaded] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true); // change it later with new package
  const [filterIconMod, setFilterIconMod] = useState(false);
  const [mobileMod, setMobileMod] = useState(false);
  const [currTaskDetails, setCurrTaskDetails] = useState(null)
  const loadedBoard = useSelector(state => state.boards.board);
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const users = useSelector(state => state.user.users);

  const prevProps = useRef(loadedBoard);

  const boardToShow = (filteredBoard) ? filteredBoard : loadedBoard;
  // we will have state and useEffect for filter..

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const boardId = useParams().id;
  const boardType = useParams().type;


  useEffect(() => {
    dispatch(getUsers());
    dispatch(getLoggedInUser());
    // check if board  is template or ...
    dispatch(loadBoard(boardType, boardId));
    resize();
    window.addEventListener('resize', resize);

    SocketService.setup();
    SocketService.emit('boardId', boardId);
    SocketService.on('updateBoard', (loadedBoard) => dispatch(setBoard(loadedBoard)));
    SocketService.on('getNotification', (notification) => store.addNotification(notification));

    return () => {
      window.removeEventListener('resize', resize);
      SocketService.off('updateBoard');
      SocketService.off('getNotification');
      SocketService.terminate();
    };
  }, [dispatch, boardId]);

  useEffect(() => {
    // if (isBoardLoaded) {
    //   if (prevProps.board.boardBgImage !== board.boardBgImage) {
    //     isDarkBackground();
    //   }
    // } else
    if (boardId === loadedBoard._id) {
      setIsDarkBackground(true);
      setIsBoardLoaded(true);
      // isDarkBackground();
    }
    if (prevProps.loadedBoard !== loadedBoard && filterBy) {
      filterBoard(filterBy);
    }
    // if (prevProps.board !== board && sortOrder) {
    //   sortBoard();
    // }

    // isDarkBackground
    // for depen..
  }, [isBoardLoaded, prevProps.loadedBoard, loadedBoard, boardId, filterBy]);

  const updateBoardHandler = (board, msg, notificationType) => {
    dispatch(updateBoard(board, msg, notificationType));
  }

  const toggleAddColumn = () => {
    setShowColAddForm(prevState => !prevState);
  }

  const goBackHandler = () => {
    navigate('/')
  }

  const toggleLoginHandler = (ev) => {
    ev.stopPropagation();
    setToggleLogin(prevToggleLogin => !prevToggleLogin);
    setShowHistory(false);
    setToggleBoardTeamMembers(false);
    setToggleSplashMenu(false);
  };

  const closeAllTabs = (ev) => {
    ev.stopPropagation();
    setToggleLogin(false);
    setToggleSplashMenu(false);
    setShowHistory(false);
    setToggleBoardTeamMembers(false);
    setShowTopMenuOptions(false);
    setShowAddForm(false);
  };

  const toggleTaskDetails = (currTask) => {
    setShowTaskDetails(prevState => !prevState);
    if (currTask) setCurrTaskDetails(currTask)
  };

  const onAddImg = async (ev) => {
    const file = ev.target.files[0];
    try {
      const res = await utils.uploadImg(file);
      const newBoard = { ...loadBoard };
      newBoard.boardBgImage = res;
      newBoard.boardBgThumbnail = res;
      const msg = `${loggedInUser} changed background image`;
      const notificationType = 'success';
      updateBoardHandler(newBoard, msg, notificationType);
    } catch (error) {
      console.error(error);
    }
  };

  // const onSortHandler = (sortBy, sortOrder) => {
  //   setSortBy(sortBy);
  //   setSortOrder(sortOrder);
  //   sortBoard();
  // };

  const toggleMiniDetails = (miniTask) => {
    if (miniTask) {
      setShowMiniTaskDetails(prevShowMiniTaskDetails => !prevShowMiniTaskDetails);
      setMiniTaskDetails(miniTask);
    } else {
      setShowMiniTaskDetails(prevShowMiniTaskDetails => !prevShowMiniTaskDetails);
    }
  };

  const openAddForm = (colId) => {
    setShowAddForm(true);
    setCurrColumnId(colId);
    closeEditColumn();
  };

  const closeAddForm = () => {
    setShowAddForm(false);
  };

  const openEditColumn = (colId) => {
    setShowTopMenuOptions(true);
    setCurrColumnId(colId);
    closeAddForm();
  };

  const closeEditColumn = () => {
    setShowTopMenuOptions(false);
  };

  // isDarkBackground = async (img) => {
  //   // const fac = new FastAverageColor();
  //   let backgroundImage = new Image();
  //   backgroundImage.crossOrigin = 'anonymous';
  //   backgroundImage.src = img || board.boardBgImage;
  //   try {
  //     const color = await fac.getColorAsync(backgroundImage, { algorithm: 'dominant' });
  //     (color.isDark) ? setState({ isDarkBackground: true }) : setState({ isDarkBackground: false });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const filterBoard = (filterBy) => {
    if (!filterBy.title && !filterBy.teamMembers) {
      setFilteredBoard(null);
      return;
    }

    setFilterBy(filterBy);
    const clonedBoard = _.cloneDeep(loadBoard);
    const tasks = clonedBoard.tasks;
    const columns = { ...clonedBoard.columns };
    const matchedIds = [];
    const unmatchedIds = [];

    for (const taskKey in tasks) {
      let task = tasks[taskKey];
      let filterTitle = filterBy.title.toLowerCase();
      let title = task.title.toLowerCase();

      (title.includes(filterTitle)) ? matchedIds.push(taskKey) : unmatchedIds.push(taskKey);
    }

    if (filterBy.teamMembers) {
      for (const id of matchedIds) {
        let task = tasks[id];
        let teamMember = filterBy.teamMembers;
        let taskTeamMembers = task.taskTeamMembers;
        if (taskTeamMembers.length === 0) {
          unmatchedIds.push(id);
        } else {
          if (taskTeamMembers.every((taskTeamMember) => (taskTeamMember.username !== teamMember))) unmatchedIds.push(id);
        }
      }
    }

    for (const column in columns) {
      for (const unmatchedId of unmatchedIds) {
        if (columns[column].taskIds.includes(unmatchedId))
          columns[column].taskIds = columns[column].taskIds.filter(id => id !== unmatchedId);
      }
    }

    setFilteredBoard(clonedBoard);
  };

  const resize = () => {
    setFilterIconMod(window.innerWidth < 1075);
    setMobileMod(window.innerWidth < 550);
  };

  const logOutHandler = () => {
    dispatch(logout())
  }

  return (
    <React.Fragment>
      {!loadedBoard._id && <LoadPage />}
      {loadedBoard._id &&
        <div className="screen" onClick={closeAllTabs}>
         
         {/* nav bar to change! */}
          <div className="board-page fill-height flex column" style={{ backgroundImage: 'url(' + loadedBoard.boardBgImage + ')', backgroundAttachment: 'fixed' }}>
            <div className="board-page-nav-bar flex align-center space-between">
              <div className="board-page-nav-bar-logo" onClick={goBackHandler}> </div>
              <div className="flex align-center">
                {loggedInUser &&
                  <div className="flex">
                    <div className="team-member-icon-wrapper flex align-center justify-center" style={{ backgroundColor: 'rgba(223, 225, 230, 0.8)', color: '#172b4d' }} >
                      <div className="team-member-icon">
                        <p>
                          {utils.createUserIcon(loggedInUser.firstName,
                            loggedInUser.lastName)}
                        </p>
                      </div>
                    </div>

                    {!mobileMod &&
                      <div className="logged-in-user flex column">
                        <small>Logged as:</small>
                        <p> {loggedInUser.username}</p>
                      </div>
                    }
                  </div>
                }
                {
                  loggedInUser ? <ExitToAppIcon onClick={logOutHandler} /> :
                    <div className="login-btn flex"
                      onClick={toggleLoginHandler}>
                      <PersonOutlineIcon />
                      <p>login</p>
                    </div>
                }
              </div>
            </div>

            <NavBarFilters
              isDarkBackground={isDarkBackground}
              goBackHandler={goBackHandler}
              loadedBoard={loadedBoard}
              filterBoard={filterBoard}

              setToggleBoardTeamMembers={setToggleBoardTeamMembers}
              setShowHistory={setShowHistory}
              setToggleSplashMenu={setToggleSplashMenu}
              setToggleLogin={setToggleLogin}
            />

            <CSSTransition
              in={toggleSplashMenu}
              timeout={700}
              classNames="modal"
              unmountOnExit
            >
              <SplashMenu
                board={loadedBoard}
                updateBoard={updateBoardHandler}
                closeAllTabs={closeAllTabs}
                onAddImg={onAddImg}
                showUploadBgImg={closeAllTabs}
                isDarkBackground={isDarkBackground}
                user={loggedInUser ? loggedInUser.username : 'Guest'}
              />
            </CSSTransition>

            <div className="board-page-columns-container">
              <div className="flex align-start fill-height">
                <CSSTransition
                  in={toggleLogin}
                  timeout={700}
                  classNames="modal"
                  unmountOnExit
                >
                  <Login
                    variant="outlined"
                    className="home-page-login"
                    toggleLogin={(ev) => toggleLoginHandler(ev)}
                    toggleState={toggleLogin} />
                </CSSTransition>
                {
                  // boardToShow._id &&
                  <BoardColumns
                    board={loadedBoard}
                    boardToShow={loadedBoard} // BoardToShow now temporery 
                    updateBoard={updateBoardHandler}
                    toggleTaskDetails={toggleTaskDetails}
                    toggleMiniDetails={toggleMiniDetails}
                    user={loggedInUser ? loggedInUser.username : 'Guest'}
                    currColumnId={currColumnId}
                    openAddForm={openAddForm}
                    closeAddForm={closeAddForm}
                    openEditColumn={openEditColumn}
                    closeEditColumn={closeEditColumn}
                    showTopMenuOptions={showTopMenuOptions}
                    showAddForm={showAddForm}
                  />
                }
                <div className="flex column align-center">
                  {!showColAddForm &&
                    <button className={`board-page-add-another-column-btn
                  ${(isDarkBackground) ? 'dark' : 'light'}`}
                      onClick={toggleAddColumn}>
                      <span className="add-icon">+</span>Add another list</button>
                  }
                  {showColAddForm && <ColumnAddForm board={loadedBoard} updateBoard={updateBoardHandler}
                    toggleAddForm={toggleAddColumn} user={loggedInUser ? loggedInUser.username : 'Guest'} />}
                </div>
              </div>
            </div>

            {
              showTaskDetails &&
              <TaskDetails
                taskId={currTaskDetails.id}
                board={loadedBoard}
                column={currTaskDetails.column}
                updateBoard={updateBoardHandler}
                toggleTaskDetails={toggleTaskDetails}
                user={loggedInUser ? loggedInUser.username : 'Guest'}
              />}
            {showMiniTaskDetails &&
              <DynamicMiniComponent
                miniTask={miniTaskDetails}
                updateBoard={updateBoardHandler}
                onToggle={toggleMiniDetails}
                board={loadedBoard}
                user={loggedInUser ? loggedInUser.username : 'Guest'}
              />}
            <CSSTransition
              in={showHistory}
              timeout={700}
              classNames="modal"
              unmountOnExit
            >
              <BoardHistory variant="outlined"
                className="home-page-login" history={loadedBoard.history} />
            </CSSTransition>
            <CSSTransition
              in={toggleBoardTeamMembers}
              timeout={700}
              classNames="modal"
              unmountOnExit
            >
              <BoardTeamMembers board={loadedBoard}
                users={users}
                updateBoard={updateBoardHandler} />
            </CSSTransition>
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default Board;