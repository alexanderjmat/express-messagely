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

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get("/", async(req, res, next) => {
    const results = await User.all()
    return res.json({results})
})


/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get("/:username", async(req, res, next) => {
    const user = req.params.username
    const results = await User.get(user)
    return res.json({results})
})


/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/to", async(req, res, next) => {
    const user = req.params.username
    const results = await User.messagesTo(user)
    return res.json({results})
})


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/from", async(req, res, next) => {
    const user = req.params.username
    const results = await User.messagesFrom(user)
    return res.json({results})
})

 module.exports = router;