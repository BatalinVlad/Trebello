import { get, post } from './HttpService';


async function login(userCred) {
    try {
        const user = await post('auth/login', userCred);
        let tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7); //exp in 1week
        localStorage.setItem('userData',
            JSON.stringify({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                expiration: tokenExpirationDate.toISOString()
            }));
        return user;
    } catch (err) {
        console.log('UserService: err in login', err);
    }
}

async function signup(userCred) {
    try {
        const user = await post('auth/signup', userCred);
        let tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7); //exp in 1week
        localStorage.setItem('userData',
            JSON.stringify({
                userId: user._id,
                token: user.token,
                expiration: tokenExpirationDate.toISOString()
            }));
        return user;
    } catch (err) {
        console.log('UserService: err in signup', err);
    }
}

async function logout() {
    try {
        await post('auth/logout');
        localStorage.removeItem('userData')
    } catch (err) {
        console.log('UserService: err in logout', err);
    }
}

async function getLoggedInUser(userId) {
    try {
        const user = await get('auth/user', userId);
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
