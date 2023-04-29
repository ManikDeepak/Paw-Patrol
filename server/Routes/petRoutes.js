const { petRegister, getMyPets } = require("../Controller/petController")

const router = require("express").Router()

router.post("/addpet",petRegister)
router.post('/getPets',getMyPets)

module.exports = router