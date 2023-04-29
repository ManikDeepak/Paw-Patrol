import {useEffect, useState} from 'react'
import axios from 'axios'
import { appointmentRoute, getMyPetsRoute, petRegisterRoute, getAppointmentRoute } from './utils/APIRoutes'
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import dog from './images/avatars/dog.jpg'
import cat from './images/avatars/cat.jpg'
import horse from './images/avatars/horse.jpg'
import owl from './images/avatars/owl.jpg'
import pig from './images/avatars/pig.jpg'
import bagger from './images/avatars/bagger.jpg'
import grooming from './images/grooming.webp'
import vet from './images/vet.webp'
import walking from './images/walking.webp'
import behive from './images/behaviourist.webp'

const Dashboard = () =>{
  const navigate = useNavigate()
  const [showForm,setShowForm] = useState("none")
  const [serviceForm,setServiceForm] = useState("none")
  const [currentUsers,setCurrentUsers] = useState()
  const currentUser = localStorage.getItem("User")
  const [petDetail,setPetDetail] = useState({
    userid:currentUser
  })
  const [appointDetail,setAppointDetail] = useState({
    userid:currentUser,
  })
  const [appointments,setAppointments] = useState([]) 
  const [price,setPrice] = useState()
  const [mypets,setMypets] = useState([])

  const appointChange = (e) => {
    setAppointDetail({...appointDetail,price:price, [e.target.name]:e.target.value})
  }
  
  const avatars = [dog,cat,bagger,pig,horse,owl]
  const getpets = async () => {
    const response = await axios.post(getMyPetsRoute, { currentUser })
    setMypets(response.data)

  }

useEffect(() => {
  const getpets = async () => {
  const response = await axios.post(getMyPetsRoute, { currentUser })
  setMypets(response.data)
  
  }
  const getAppointments = async()=>{
    const response = await axios.post(getAppointmentRoute,{currentUser})
    setAppointments(response.data)
    
  }
  getpets()
  getAppointments()
  
},[currentUser])

useEffect(() => {
  if (!localStorage.getItem('PawPatrol')) {
    navigate('/login')}
  const load = async() =>{
    const answer = await JSON.parse(localStorage.getItem("PawPatrol"))
    setCurrentUsers(answer)
  }
  load()
},[])
  
  const services = [{
      name:"Boarding",
      price:500
    },{
      name:"Walk",
      price:300
    } ,{
      name:"Grooming",
      price:700
    }, {
      name:"Veterinary",
      price:800
    }]

  const outlets = ["Kormangala", "Yelahanka", "Jalahalli", "Majestic", "JP Nagar", "WhiteField" ]

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

  const toggleForm = () => {
    if(showForm === "none"){
      setShowForm('block')
    }else{
      setShowForm('none')
    }
  }
  const toggleServiceForm = () => {
    if(serviceForm === "none"){
      setServiceForm('block')
    }else{
      setServiceForm('none')
    }
  }

  const onPetSubmit = async (event) => {
    event.preventDefault()
    const {userid, petType, petName, petBreed,avatar} = petDetail
    const response  =  await axios.post(petRegisterRoute,{
      userid,
      petName,
      petType,
      petBreed,
      avatar
    })
    toast.success(response.data.msg, toastOptions)
    getpets()


  }

  const onPetChange =(event) => {
    setPetDetail({userid:currentUser,...petDetail,[event.target.name]:event.target.value})
  }

  const onAppointSubmit = async(e) => {
    e.preventDefault()
    const { date, outlet, service, price, petName, userid } = appointDetail
    const email = currentUsers.email;
    const response = await axios.post(appointmentRoute,{
      date,
      outlet,
      service,
      price,
      petName,
      userid,
      email
    })
    toast.success(response.data.msg,toastOptions)

  }

  return (
    <>
    { currentUsers ? 

      <Container>
        <div className="display">

      <div className="sidebar">
        <div className="profile">

        <p> { currentUsers.name } </p>
        <p>No of Pets: {mypets.length}</p>
        <p>No of Appointments: {appointments.length}</p>
        </div>
        <span>Appointments</span>
        <div className="apps">

        {
          appointments.map((appointment,index) =>{
            return(
              <div className='app'>
              <p>{appointment.service}</p><p> {appointment.date}</p>
              </div>
              )
            })
          }
          </div>
        <button onClick={() => toggleServiceForm()}> Book a service</button>
      </div>
      <div className="box">
        <p className="header">My Pets</p>
        <button className='logout' onClick={() => {
          localStorage.clear()
          navigate('/')
          }}>Logout</button>
      <div className="petSection">
      {mypets.map((pats,index) =>{
        return(
          <div className='pets'>
        <img src={pats.avatar} alt="logo" />
        <p>{pats.petName}</p>
        </div>
        )
      })}
      <button onClick={() => toggleForm()}> +</button>
      </div>
              <section className="our_services">
                <h1>Our Services</h1>
                <div className="services">
                  <div className="serviceCard">
                    <img src={grooming} alt="" />
                    <h3>Pet Grooming</h3>
                    <p>Service description Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, illum.</p>
                  </div>
                  <div className="serviceCard">
                    <img src={vet} alt="" />
                    <h3>Veterniary</h3>
                    <p>Service description Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, illum.</p>
                  </div>
                  <div className="serviceCard">
                    <img src={behive} alt="" />
                    <h3>Pet Behaviourist</h3>
                    <p>Service description Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, illum.</p>
                  </div>
                  <div className="serviceCard">
                    <img src={walking} alt="" />
                    <h3>Pet Walking</h3>
                    <p>Service description Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, illum.</p>
                  </div>
                </div>
              </section>
      
    </div>
    </div>


      <div>

      <div className="addPet" style={{ display: `${showForm}` }} >      
      <form onSubmit={(e) => onPetSubmit(e)}>
        <p className="header">Enter Pet Details</p>
        <div className="avatars">
          {
            avatars.map((avatar,index) =>{
              return(<img src={avatar} alt="avatar here" onClick={()=>{setPetDetail({...petDetail,avatar:avatar})
            }}/> )
            })
          }
        </div>
        <label htmlFor="petType">Pet Type</label>
        <input type="text" name="petType" required onChange={(e) => onPetChange(e)} />
        <label htmlFor="petName">Pet Name</label>
          <input type="text" name='petName' onChange={(e) => onPetChange(e)} />
        <label htmlFor="petBreed">Pet Breed</label>
          <input type="text" name='petBreed' onChange={(e) => onPetChange(e)} />
        <button>Submit</button>

      </form>
      <button onClick={() => toggleForm()}>X</button>
    </div>

      <div className="bookService" style={{ display: `${serviceForm}` }} >
      <form onSubmit={(e) => onAppointSubmit(e)}>
            <p className='header'>Please Select A Service</p>
            <select name="service"  onChange={(e) => {
              
              appointChange(e)
              setPrice(e.target.value.length*100)
            }}>
              <option value="" >choose a service</option>


            {
              services.map((service, index) => {
                return (
                  
                  <option value={service.name}  >{service.name}</option>
                  )
                })
              }
            
            </select>
              <p>Select your nearest outlet</p>
              <select name="outlet" onChange={(e) => appointChange(e)}>
              <option value="" >choose an outlet</option>


            {
              outlets.map((outlet, index) => {
                return (
                  <option value={outlet} >{outlet} </option>
                  )
                })
              }
            </select>
            <p>Choose your pet</p>
            <select name="petName" onChange={(e) => appointChange(e)}>
              <option value="" >choose a pet</option>
              {
                mypets.map((pat,index) => {
                  return(
                    <option value={pat.petName}  >{pat.petName}</option>
                    )
                  })
                }

            </select>
            <label htmlFor="startDate">Choose the Date</label>
            <input type="date" name='date' onChange={(e) => appointChange(e)} />
            <p>{price}</p>
            <button>Book appointment</button>
            
            
      </form>
        <button onClick={() => toggleServiceForm()}>X</button>
    </div>
    </div>

    <ToastContainer />  
    </Container>:<></>
                }
</>
  )

}



const Container = styled.div`
  background:rgba(240,240,240,0.3);
  .apps::-webkit-scrollbar-track {
    background: #e9e6e6;
  }

  .apps::-webkit-scrollbar-thumb {
    background-color: #e9e6e6;
    border-radius: 4px;
    border: 3px none #ffffff;
  }
  .apps::-webkit-scrollbar-thumb:hover {
    background-color:#effeff;
  }

.display{
  display:flex;
  flex-direction:row;
  .sidebar{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
    width:20vw;
    height:100vh;
    background:#e9e6e6;
    span{
      font-size:30px;
    }
    .profile{
      color:black;
      border-bottom:1px solid black;
      border-radius:9px;
      width:95%;
      text-align:center;
      font-weight:700;
    }
    .apps{
      max-height:60vh;
      overflow:auto;
      width:90%;
      border:1px solid grey;
      box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
      border-radius:10px;
      .app{
        justify-content:space-around;
        display:flex;
        flex-direction:row;
        font-weight:500;
        border-bottom:1px solid grey;
        width:90%
        text-align:center;
      }
    }
    span{

    }
    button{
      margin:10px 2px;
      width:80%;
      border:none;
      border-radius:10px;
      background:#f0a1bc;
      color:white;
      font-family:'Sono';
      font-size:20px;
      height:40px;
      transition:0.2s ease-in;
      &:hover{
        cursor:pointer;
        transform:scale(1.12);
        background:#ff0000;

      }
    }
  }
  .logout{
    position:absolute;
    top:2vh;
    left:90vw;
    background:#d07b7b;
    border:none;
    height:40px;
    width:100px;
    border-radius:20px;
    color:white;
    font-family:'Sono';
    transition:0.2s ease-in;
    &:hover{
      cursor:pointer;
      transform:scale(1.2);
      transition:0.2s ease-in;
    }

  }
  .header{
    font-family:'Sono';
    font-size:32px;
    text-align:center;
    color:#f6a7aa;
    
  }
  .our_services{
  display:flex;
  background: rgb(182 172 172 / 30%);
  flex-direction:column;
  max-height:58vh;
  overflow:hidden;
  align-items:center;
  h1{
    text-align:center;
    font-size:28px;
    font-weight:600;
    border:none;
    border-bottom:2px solid grey;
    border-radius: 10px;
    width:400px;
    color:#d07b7b;
  }
  .services{
    display:flex;
    flex-direction:row;
    justify-content: space-evenly;
    .serviceCard{
      width:16%;
      img{
        width:120px;
      }
      display:flex;
      flex-direction:column;
      align-items:center;
      h3{
        color:#06a9a4
      }
    }
  }
}
  .box{
    border:none;
    border-radius:10px;
    width:80vw;
    height:100vh;
    .petSection{
      display:flex;
      flex-direction:row;
      overflow-Y:auto;
      background:rgba(240,240,240,0.3);
      .pets{
        padding:0 10px;
        img{
          width:150px;
          border-radius:75px;
        }
      }
      button{
        width:150px;
        height:150px;
        border-radius:75px;
        font-size:120px;
        font-weight:700;
        font-family:'Sono';
        background:#f0a6ca;
        color:#ffe7fa;
        &:hover{
          cursor:pointer;
        }
      }
    }

  }

}

  .addPet,.bookService{
    
    position:absolute;
    top: 0;
    left: 0;
    right:0;
    bottom:0;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    background: linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8));
    button{
      color:white;
      background-color:red;
      padding:5px;
      border:none;
      &:hover{
        cursor:pointer;
        border-bottom:1px solid black;
        border-right:1px solid black;
      }
    }
    form{
      width:330px;
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      display:flex;
      flex-direction:column;
      background:#443f3f;
      padding:12px;
      border-radius:10px;
      align-items:center;
      color:white;
      select{
        width:320px;
        height:30px;
      }
      input{
        width:60%;
        height:20px;
        border:none;
        border-radius:4px;
        transition:0.2s ease-in;
      }
      input:focus{
        transition:0.2s ease-in;
        width:80%;
      }
      label{
        font-family:'Sono';
      }
      .header{
        text-align:center;
        font-family:'Sono';
        font-size:30px;
      }
      .avatars{
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        justify-content:space-around;
        img{
          height:100px;
          border:3px solid whitesmoke;
          border-radius:75px;
          padding:0 1px;
          &:hover{
            cursor:pointer;
            border: 3px solid green;
          }
        }
      }
    }
  }

`
export default Dashboard