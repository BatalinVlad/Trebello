const bcrypt = require('bcryptjs');
const userService = require('../user/user.service');
const logger = require('../../services/logger.service');

const saltRounds = 10

async function login(email, password) {
    logger.debug(`auth.service - login with email: ${email}`)
    if (!email || !password) return Promise.reject('email and password are required!')
    let user = await userService.getByEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')
    delete user.password;
    return user;
}

async function signup(firstName, lastName, email, password, username , color ) {
    logger.debug(`auth.service - signup with email: ${email}, username: ${username}`)
    if (!firstName || !lastName || !email || !password || !username) return Promise.reject('email, username and password are required!')
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return userService.add({ firstName, lastName, email, password: hashedPassword, username , color})
}

module.exports = {
    signup,
    login
}