import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SplashMenu from './SplashMenu';
import utils from '../services/utils';

import { createBoard } from '../actions/BoardActions'

const NewBoardModal = ({ loggedInUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [boardTitle, setBoardTitle] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  // Function to handle changes in the input field
  const handleTitleChange = (e) => {
    setBoardTitle(e.target.value); // Update the board title state when the input changes
  };

  const setImageUrlHandler = (imageUrl) => {
    setImageUrl(imageUrl)
  }

  const createNewBoard = async () => {
    let board = {
      title: boardTitle || 'no title',
      teamMembers: [loggedInUser && loggedInUser],
      tasks: {},
      columns: {},
      columnOrder: [],
      style: {},
      boardBgImage: imageUrl.full || 'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjExMTc0M30',
      history: [],
      boardBgThumbnail: imageUrl.thumb || 'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjExMTc0M30',
      createdBy: loggedInUser || { _id: 'guest', username: 'guest' }
    };

    createdBoardMessage(board);

    const newBoard = await dispatch(createBoard(board));
    navigate(`/board/board/${newBoard._id}`);

  };

  const createdBoardMessage = (board) => {
    const username = (loggedInUser) ? loggedInUser.username : 'Guest';
    let msg = `The Board was created by ${username}`;
    board.history.push({ id: utils.getRandomId(), msg: msg, time: Date.now() });
  }


  return (
    <div className='new-board-modal fill flex center absolute'>
      <div className='container flex space-between column z4'>
        <div>
          <label>title</label>
          <input
            className='add-column-form-container'
            type='text'
            placeholder='title...'
            value={boardTitle} // Bind the input value to the state variable
            onChange={handleTitleChange} // Handle input changes
          />
        </div>
        <div className='choose_bg-container'>
          <label>choose background</label>
          {
            !imageUrl ? <SplashMenu perpage={10} setImageUrl={setImageUrlHandler} /> :
              <div className='fill-width'>
                <img src={imageUrl.full} alt=':( ...' className='fill-width obj-cover' style={{ height: '300px' }} />
              </div>
          }
        </div>
        <button className='action-btn' style={{ margin: '0 auto' }} onClick={createNewBoard}>Create Board</button>
      </div>
    </div >
  );
};

export default NewBoardModal;
