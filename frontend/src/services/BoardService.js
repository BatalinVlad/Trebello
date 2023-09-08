import {
  get as httpGet,
  put as httpPut,
  post,
  del
} from './HttpService';

function query(boardsType) {
  return httpGet(`board/boards/${boardsType}`);
}

function get(type, boardId) {
  return httpGet(`board/${type}/${boardId}`);
}

function put(board) {
  return httpPut(`board/${board._id}`, board);
}

function remove(boardId) {
  return del(`board/${boardId}`);
}

function add(board) {
  return post('board', board);
}

export { add, query, get, put, remove };