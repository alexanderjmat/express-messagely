const express = require("express")
const router = new express.Router()
const expressError = require('../expressError')
const db = require("../db")
const bcrypt = require("bcrypt")
const {BCRYPT_WORK_FACTOR, secretKey} = require("../config")
const ExpressError = require("../expressError")
const jwt = require("jsonwebtoken")
const axios = require("axios")
const app = require("../app")
const User = require("../models/user")



/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post("/login", async(req, res, next) => {
    const {username, password} = req.body
    if (await User.authenticate(username, password)) {
        let token = jwt.sign({username}, secretKey)
        User.updateLoginTimestamp(username)
        return res.json({token})
    } {
        throw new ExpressError("Invalid username/password", 400)
    }

})


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

 router.post("/register", async(req, res, next) => {
    const {username, password, first_name, last_name, phone} = req.body
    const register = await User.register({username, password, first_name, last_name, phone})
    return res.json({
        username: username,
        first_name: first_name,
        last_name: last_name,
        phone: phone
    })

})

module.exports = router;
