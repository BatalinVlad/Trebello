import { get, post } from './HttpService';


async function login(userCred) {
    try {
        const user = await post('auth/login', userCred);
        return user;
    } catch (err) {
        console.log('UserService: err in login', err);
    }
}

async function signup(userCred) {
    try {
        const user = await post('auth/signup', userCred);
        return user;
    } catch (err) {
        console.log('UserService: err in signup', err);
    }
}

async function logout() {
    try {
        await post('auth/logout');
    } catch (err) {
        console.log('UserService: err in logout', err);
    }
}

async function getLoggedInUser() {
    try {
        const user = await get('auth/user');
        return user;
    } catch (err) {
        console.log('UserService: err in getting loggedInUser', err);
    }
}

async function getUsers() {
    try {
        const users = await get('user');
        return users;
    } catch (err) {
        console.log('UserService: err in getting users', err);
    }
}

export {
    login,
    logout,
    signup,
    getLoggedInUser,
    getUsers
}
