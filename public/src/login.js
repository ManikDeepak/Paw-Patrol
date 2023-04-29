import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { loginRoute } from './utils/APIRoutes';
import styled from 'styled-components'
import banner from './images/banner.jpg'

const Login  = ( ) => {
    const navigate = useNavigate()
    const [value, setValue] = useState({})

    const handleChange = (event) => {
        setValue({...value,[event.target.name]:event.target.value})
    }

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

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { phone, password } = value
        if(handleValidation()){

            const data = await axios.post(loginRoute,{
                phone,
                password
            })
            
            if(data.data.status){
                localStorage.setItem("PawPatrol", JSON.stringify(data.data.isValid))
                localStorage.setItem("User",JSON.stringify(data.data.isValid._id))
                navigate('/dashboard')
            }else{  
                toast.error(data.data.msg,toastOptions)
            }
        }
    }

    const handleValidation = () => {
        const {phone, password } = value
        if(phone.length !== 10){
            toast.error("Enter a valid phone number")
            return false
        }
        if(password===""){
            toast.error("Password cant be blank")
            return false
        }
        return true
    }

    return (
        <Container>
            <div className="box">

        <form action="" onSubmit={(e) => handleSubmit(e)}>
            <p className="heading">

        Login form
            </p>
            <input  type="digit" name="phone" placeholder="Phone Number" required onChange={(e) => handleChange(e)} />
            <input type="password" name="password" placeholder="Password" required onChange={(e) => handleChange(e)} />
            <button className='btn'>Submit</button>
            <span><Link to="/forgotPassword">Forgot Password?</Link></span>
            <span>New User? <Link to="/register">Register</Link></span>
        </form>
            </div>
        <ToastContainer/>
        </Container>
    )
}

const Container = styled.div`
background:url(${banner});
height:100vh;
background-size:cover;
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
    form{
        display:flex;
        flex-direction:column;
        .heading{
            text-transform: uppercase;
            text-align: center;
            font-size: 2em;
            font-weight: 600;
            margin-bottom: 15px;
            color:white;
        }
        input{
             height: 50px;
            width: 100%;
            margin-bottom: 10px;
            opacity: 0.6;
            border-radius: 4px;
            &:focus{
                opacity:0.8;
            }
        }
        .btn{
            height: 45px;
            width: 100%;
            font-size: 15px;
            color: #fff;
            font-weight: 600;
            opacity: 0.6;
            background-color: crimson;
            transition: 0.2s;
        }
        .btn:hover{
            cursor: pointer;
            opacity: 1;
            transition: 0.2s;
        }
        span{
            color:white;
            a{
                color:white;
                text-decoration:none;
            }
        }
    }
}
`

export default Login