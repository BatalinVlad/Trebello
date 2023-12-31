import { add, query, get, put, remove } from '../services/BoardService';
import SocketService from '../services/SocketService';
import utils from '../services/utils';

export function loadBoards() {
  return async dispatch => {
    try {
      const boards = await query('board');
      dispatch(_setBoards(boards));
    } catch (err) {
      console.log('BoardActions: err in loadBoards', err);
    }
  };
}

function _setBoards(boards) {
  return {
    type: 'SET_BOARDS',
    boards
  };
}

export function loadTemplateBoards() {
  return async dispatch => {
    try {
      const templateBoards = await query('templates');
      dispatch(_setTemplateBoards(templateBoards));
    } catch (err) {
      console.log('BoardActions: err in loadBoards', err);
    }
  };
}

function _setTemplateBoards(templateBoards) {
  return {
    type: 'SET_TEMPLATE_BOARDS',
    templateBoards
  };
}

export function loadBoard(type, boardId) {
  return async dispatch => {
    try {
      const board = await get(type, boardId);
      dispatch(_boardUpdate(board)); // type UPDATE_BOARD , data: board
    } catch (err) {
      console.log('BoardActions: err in loadBoard', err);
    }
  };
}

export function setBoard(board) {
  return async dispatch => {
    try {
      dispatch(_boardUpdate(board));
    } catch (err) {
      console.log('BoardActions: err in setBoard', err);
    }
  }
}

export function updateBoard(board, msg, notificationType) {
  return async dispatch => {
    try {
      board.history.unshift({ id: utils.getRandomId(), msg: msg, time: Date.now() })
      dispatch(_boardUpdate(board));
      await put(board);
      SocketService.emit('boardUpdate', board);
      utils.emitNotification(msg, notificationType);
    } catch (err) {
      console.log('BoardActions: err in loadBoard', err);
    }
  };
}

function _boardUpdate(board) {
  return {
    type: 'UPDATE_BOARD',
    board
  }
}

export function createBoard(board) {
  return async dispatch => {
    try {
      const addedBoard = await add(board);
      dispatch(_addBoard(addedBoard));
      return addedBoard;
    } catch (err) {
      console.log('BoardActions: err in createBoard', err);
    }
  }

  function _addBoard(addedBoard) {
    return {
      type: 'ADD_BOARD',
      addedBoard
    };
  }
}

export function deleteBoard(boardId) {
  return async dispatch => {
    try {
      const boards = await remove(boardId);
      dispatch(_setBoards(boards));
      return boards;
    } catch (err) {
      console.log('BoardActions: err in deleting board', err);
    }
  }
}