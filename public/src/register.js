import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'; 
import {useState} from 'react'
import { registerRoute } from './utils/APIRoutes';
import styled from 'styled-components'
import bg from './images/banner.jpg'

const Register = ( ) => {
    const navigate = useNavigate()

    const [value, setValue] = useState({
        name: "",
        phone: "",
        password: "",
        cPassword: "",
        email:""

    })

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

    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value })
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        if(handleValidation()){
            const {password,phone,name,email} = value
            const data = await axios.post(registerRoute,{
                name,
                phone,
                password,
                email
            })
            if(!data.data.status){
                toast.error(data.data.msg,toastOptions)
            }else{
                localStorage.setItem("PawPatrol", JSON.stringify(data.data.customer))
                navigate("/login") 
            }
        }
    }

    const handleValidation = () =>{
        const {name,phone,password,cPassword} = value
        if(name.length < 3){
            toast.error("Name must be atlest 3 letters long",toastOptions)
            return false
        }
        if(password.length < 8){
            toast.error("Password must be atleast 8 Characters", toastOptions)
            return false
        }
        if(password !== cPassword){
            toast.error("Password and Confirm Passwords do not match", toastOptions)
            return false
        }
        if(phone.length !== 10){
            toast.error("Enter a valid mobile number", toastOptions)
            return false
        }
        return true
        
    }

    return (
        <Container>
        <form onSubmit={(event) => handleSubmit(event)}>
            <p className='heading'>
                Register
            </p>
            <input type="text" name="name" placeholder="Full Name" onChange={(e) => handleChange(e)} />
            <input type="digit" name="phone" placeholder="Phone Number" onChange={(e) => handleChange(e)} />
            <input type="email" name="email" placeholder="Email Id" onChange={(e) => handleChange(e)} />
            <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)} />
            <input type="text" name="cPassword" placeholder="Confirm Password" onChange={(e) => handleChange(e)} />
            <button>Submit</button>
            <span>Already have an account? <Link to="/login">Login</Link></span>
        </form>
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
    form{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3));
        width: 400px;
        padding: 50px 30px;
        border-radius: 10px;
        box-shadow: 7px 7px 60px #000;
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
            text-align:center;
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
        }
        button:hover{
            cursor: pointer;
            opacity: 1;
            transition: 0.2s;
        }
        input:focus{
            opacity: 0.8;
        }
        input::placeholder{
            text-align:center;
        }
        span{
            color:white;
            a{
                text-decoration:none;
                color:white;
            }
        }
    }
`

export default Register

