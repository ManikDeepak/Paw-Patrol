import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { emailRoute, passwordReset } from './utils/APIRoutes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bg from './images/banner.jpg'
import styled from 'styled-components'


const ForgotPassword = ( ) => {
    const navigate = useNavigate()
    const [value,setvalue] = useState({})
    const [inputOtp, setInputOtp] = useState()
    const [passwords,setPassword] = useState({
        passwordz:"",
        cPassword: ""
    })
    const [userid,setUserid] = useState()
 
    const handleNewPass = (e) => {
        setPassword({...passwords,[e.target.name]:e.target.value})
    }

    const SubmitPass = async(e) => {
        e.preventDefault()
        const {passwordz} = passwords
        if(ValidatePassword()){
            const data = await axios.post(passwordReset,{
                passwordz,
                userid
            })
            toast.success(data.data.msg,toastOptions)
            navigate('/login')

            

        }

    }

    const ValidatePassword = () => {
        const { passwordz, cPassword } = passwords
        if(passwordz !== cPassword){
            toast.error("passwords doesnt match", toastOptions)
            return false

        }
        if(passwordz.length< 8){
            toast.error("passwords must be atleast 8 characters", toastOptions)
            return false

        }
        return true
    }

    const generateOtp = () => {
        return Math.floor(Math.random() * 100000 +100000)
    }
    const handleChange = (event) => {
        setvalue({phone:event.target.value,otp:generateOtp()})
    }

    const handleOtp = (e) =>{
        setInputOtp(e.target.value)
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        const {phone, otp} = value
        const data = await axios.post(emailRoute, {
            phone,
            otp
        })
        setUserid(data.data.user._id)
        toast.success(data.data.msg,toastOptions)
    }

    const handleOtpSubmit = (e) => {
        e.preventDefault()
        if(inputOtp == value.otp){
            toast.success("OTP Verified",toastOptions)
            setDisplay("block")
        }else{

            toast.error("Enter a valid OTP",toastOptions)
        }
    }
    const [display,setDisplay] = useState("none")
    


    const toastOptions = {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }

    return ( 
        <Container>
            <div className='box'>

        <form action="" onSubmit={(e) => handleSubmit(e)}>
            <p className="heading">Forgot password</p>
        <span>Enter the registered phone number</span>
        <input type="number" name="phone" onChange={(e) => handleChange(e)} />
        <button>Send OTP</button>
        </form>
        <form action="" onSubmit={(e) => handleOtpSubmit(e)}>
            <input type="number" name="otp" onChange={(e) => handleOtp(e)}/>
            <button>Verify OTP</button>
        </form >
        <form action="" onSubmit={(e) => SubmitPass(e)}>
            <input type="text" style={{display:`${display}`}} name="passwordz" placeholder="New Password" onChange={(e) => handleNewPass(e)}/>
            <input type="text" style={{ display: `${display}` }} name="cPassword" placeholder="Confirm Password" onChange={(e) => handleNewPass(e)} />
            <button style={{ display: `${display}` }}>Reset Password</button>
        </form>
        <span>Sign in to your account <Link to="/login">Login</Link></span>
            </div>
        <ToastContainer />
        </Container>
    )

}

const Container = styled.div`
    position:relative;
    height: 100vh;
    width: 100%;
    background: url(${bg});
    background-size: cover;
    background-position: center center;
    .box{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3));
        width: 400px;
        padding: 50px 30px;
        border-radius: 10px;
        box-shadow: 7px 7px 60px #000;
    }
    span{
            color:white;
            a{
                text-decoration:none;
                color:white;
            }
        }
    form{
        color:white;    
        display:flex;
        flex-direction:column;
        .heading{
            text-transform: uppercase;
            text-align: center;
            font-size: 2em;
            font-weight: 600;
            margin-bottom: 15px;
            color:white;
            font-family:'Sono';
        }
        input{
            height: 50px;
            width: 100%;
            margin-bottom: 10px;
            opacity: 0.6;
            border-radius: 4px;
        }
        button{
            height: 45px;
            width: 100%;
            font-size: 15px;
            color: #fff;
            font-weight: 600;
            opacity: 0.6;
            background-color: crimson;
            transition: 0.2s;
            margin-bottom:3px;
        }
        button:hover{
            cursor: pointer;
            opacity: 1;
            transition: 0.2s;
        }
        input:focus{
            opacity: 0.8;
        }
        
    }
`

export default ForgotPassword