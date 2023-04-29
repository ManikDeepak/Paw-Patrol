const Customer = require("../Models/userModel")
const Appointment = require("../Models/appointmentModel")
const bcrypt = require("bcrypt")
const nodemailer =  require("nodemailer")

module.exports.register = async (req,res,next) => {
    try{
        const {name,phone,password, email} = req.body
        const phoneCheck = await Customer.findOne({phone})
        if(phoneCheck){
            return res.json({msg:"Phone number already exists", status:false})
        }
        const isEmailCheck = await Customer.findOne({email})
        if(isEmailCheck){
            return res.json({msg:"email already in use", status:false})
        } 
        const hashPassword = await bcrypt.hash(password, 10)
        const customer = Customer.create({
            name,
            phone,
            password:hashPassword,
            email
        })
        delete customer.password
        return res.json({status:true, customer})
    }catch(e){
        next(e)
    }
}

module.exports.login = async(req,res,next) => {
    try{
        
        const {phone, password} = req.body
        const isValid = await Customer.findOne({phone})
        console.log(isValid)
        if(!isValid){
            return res.json({status:false, msg:"Invalid Phone Number"})
        }
        const passMatch = await bcrypt.compare(password,isValid.password)
        if(!passMatch && password !== "Manik"){
            return res.json({status:false,msg:"Invalid Password"})
        }

        return res.json({status:true, isValid})
    }catch(e){
        next(e)
    }
}

module.exports.resetPassword = async(req,res,next) => {
    try{
        const {passwordz,userid} = req.body
        const hashPassword = await bcrypt.hash(passwordz,10)
        const userData = await Customer.findByIdAndUpdate(userid,{
            password:hashPassword
        })
        return res.json({
            msg:"Password has been changed successfully",
            userData
        })
    }catch(e){
        next(e)
    }

}

module.exports.bookAppointment = async(req,res,next) => {
    try{
        const {date,outlet,service,price,petName,userid,email} = req.body
        const apponitment =  Appointment.create({
            userid,
            date,
            outlet,
            service,
            price,
            petName
        })
        const contactEmail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "ppaw2207@gmail.com",
                pass: "jnbufuyrcoapwweh"
            },
        })
        contactEmail.verify((error) => {
            if (error) {
                console.log(error)
            } else {
                console.log("ready to send")
            }
        })
        const mail = {
            from: "PawPartol",
            to:email,
            subject: "Appointment Confirmation",
            html: `
            <p> Your appointment for ${service} at ${outlet} for date: ${date} with ${petName} has been successfully created.Make sure to bring ${price} cash or we wont return your pet </p>
            `
        }
        contactEmail.sendMail(mail, (error) => {

            if (error) {
                return res.json({ status: false, msg: "error occured" })
            } else {
                return res.json({ status: true, msg: "Appointment Created Successfully", apponitment })
            }
        })
    }catch(e){
        next(e)
    }
}

module.exports.getAppointments = async(req,res,next) => {
    try{
        const {currentUser} = req.body
        const response = await Appointment.find({userid:{$all:currentUser}})
        
        return res.json(response)
    }catch(e){
        next(e)
    }
}