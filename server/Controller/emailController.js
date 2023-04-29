const Customer = require("../Models/userModel")
const nodemailer = require("nodemailer")

module.exports.email = async(req,res,next) => {
    try{
        const {phone,otp} = req.body
        console.log(phone)
        const user = await Customer.findOne({phone})
        if(!user){
            return res.json({status:false, msg:"Enter a valid phone number"})
        }
        const contactEmail = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:"ppaw2207@gmail.com",
                pass:"jnbufuyrcoapwweh"
            },
        })
        contactEmail.verify((error) => {
            if(error){
                console.log(error)
            }else{
                console.log("ready to send")
            }
        })
        const mail = {
            from: "PawPartol",
            to: user.email,
            subject: "Verification link for Reset Password",
            html:`
            <p>  ${otp}</p>
            <p> You forgot the password to a fake website...... anyways use the above otp to reset your password.</p>
            `
        }
        contactEmail.sendMail(mail,(error)=>{
            
            if(error){
                return res.json({status:false,msg:"error occured"})
            }else{
                return res.json({status:true, msg:"Email sent",user})
            }
        })
    }catch(e){
        next(e)
    }
}