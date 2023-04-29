const { email } = require("../Controller/emailController")


const router = require("express").Router()

router.post('/email', email)

module.exports = router