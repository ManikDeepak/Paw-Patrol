const { register, login, resetPassword, bookAppointment, getAppointments } = require("../Controller/userController")

const router = require("express").Router()

router.post('/register',register)
router.post('/login',login)
router.post('/resetPassword',resetPassword)
router.post('/appointment',bookAppointment)
router.post('/getAppointment',getAppointments)

module.exports = router