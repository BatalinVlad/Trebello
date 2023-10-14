let localLoggedinUser = null;
if (localStorage.userData) localLoggedinUser = JSON.parse(localStorage.userData);

const initialState = {
  loggedInUser: localLoggedinUser,
  users: []
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user };
    case 'SET_USERS':
      return {...state, users: action.users};
    default:
      return state;
  }
}
