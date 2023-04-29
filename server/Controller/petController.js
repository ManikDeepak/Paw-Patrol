const Pet = require("../Models/petModel")

module.exports.petRegister =  (req,res,next) => {
    try{
        const {userid, petType, petName, petBreed,avatar} = req.body
        const pet =  Pet.create({
            userid,
            petType,
            petName,
            petBreed,
            avatar
        })

        return res.json({
            msg:"Pet created successfully",
            pet
        })
    }catch(e){
        next(e)
    }
}

module.exports.getMyPets = async(req,res,next) =>{
    try{
        const {currentUser} = req.body
        const userid = currentUser
        const myPets = await Pet.find({userid:{$all:userid}})
        console.log(myPets)
        return res.json(myPets)
    }catch(e){
        next(e)
    }
}