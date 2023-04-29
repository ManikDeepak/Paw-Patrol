import React from 'react'
import Navbar from './navbar'
import styled from 'styled-components'
import paw from './images/paw2.png'
import dnc from './images/dnc.png'
import walley from './images/wally.png'
import { useNavigate } from 'react-router-dom'
import { keyframes } from 'styled-components'
import grooming from './images/grooming.webp'
import vet from './images/vet.webp'
import walking from './images/walking.webp'
import behive from './images/behaviourist.webp'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { AiTwotoneMail } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar/>
      <Container>
        <section className="header">
          <div className="stuff">
            <h1>Catch Phrase here. I dont Know Client Didnt Gave this requirement</h1>
            <p>some stupid text here supporting the catch phrase. Seriously what is the BA doing while taking the requirements. Hope the development Teams fixes these. I dont paid enough for these shits.</p>
            <button onClick={() => navigate('/register')}>
              Get Started
              <img src={paw} alt="" height="25px" className="paw" />
              </button>
          </div>
          <img src={dnc} height="350px" alt="" />
        </section>
        <section className="about_us">
          <div className="about">

            <h1>Again No req so here you go</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae reiciendis magnam, ea repellendus earum recusandae sapiente nobis, nihil fuga maxime iure id praesentium ducimus veritatis harum sunt modi! Possimus, deserunt tempora recusandae quas fugiat mollitia beatae facilis autem. Fugiat debitis quam quaerat, qui assumenda quasi nulla error voluptas sit voluptatibus ea, harum autem totam voluptatem exercitationem natus fugit in laboriosam?</p>
          </div>
          <div className="deco-tile">

            About us
          </div>

          <img src={walley} width="600px" alt="" />
          
        </section>
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

        <section className="footer">
          

          <div className="outlets">
            <h2>Our Outlets</h2>
            <ol>
              <li>Kormangala</li>
              <li>Jalahalli</li>
              <li>White Field</li>
              <li>Electronic City</li>
              <li>Majestic</li>
            </ol>
          </div>
          <div className="contactUs">
            <h2>Contact Us</h2>
            <div>

            <BsFillTelephoneFill />07412228875
            </div>
            <div>

            <BsFillTelephoneFill />9572701673
            </div>
            <a href="mailto:ppaw2207@gmail.com">

            <AiTwotoneMail /> PPaw2207@gmail.com
            </a>
            <a href="https://goo.gl/maps/KJQCVqrLLboRQpri6" target="blank">
              <GoLocation /> Bengaluru, Karnataka, 560058
            </a>
            
          </div>
        </section>

      </Container>
    </>
  )
}

const swing = keyframes`
0%{
    transform:rotate(-0.15turn)
  }

50%{
    transform:rotate(0.15turn)
}

100%{
    transform:rotate(-0.15turn)
}
`
const Container = styled.div`
font-family: 'Dosis', sans-serif;
box-sizing:border-box;
width:100vw;
overflow:hidden;
  
.header{
  padding-top:10vh;
  height:80vh;

  overflow:hidden;
  display:flex;
  align-items:center;
  justify-content:space-between;
  border:none;
  border-radius:10px;
  background: linear-gradient(#80d5ea,#79dcfc)  center no-repeat ;
  text-transform: capitalize;
  .stuff{
    margin-left:50px;
    color:#2a1e1e;
    max-width:50vw;
    display:flex;
    flex-direction:column;
    h1{
      font-size:50px;
    } 
    p{
      font-weight:600;
      font-size:20px;
      margin-bottom:20px;
    }
    button{
      width:200px;
      border:none;
      border-radius:15px;
      height:80px;
      background-color:#5cabc4;
      color:white;
      font-size:20px;
      font-weight:600;
      transition:ease-in 0.2s;
      &:hover{
        cursor:pointer;
        background-color: red;
        transition:ease-in 0.3s;
      }
      
      .paw{
        padding:0 3px;
        animation: ${swing} 1.5s infinite;
      }  
      
    }
  }

}
.about_us{
  display:flex;
  padding-top:30px;
  flex-direction:row-reverse;
  height:600px;
  overflow:hidden;
  align-items:normal;
  justify-content:center;
  border:none;
  border-radius:10px;
  margin:10px 0;
  background:linear-gradient(to right,#ffd6ff,#e7c6ff);
  .about{
    width:50%;
    color:#2a1e1e;
    max-width:40vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    h1{
      font-size:50px;
    }
    p{
      font-weight:600;
      font-size:20px;
    }
  }
  .deco-tile{
    overflow:visible;
    width:10%;
    font-size:7rem;
    font-weight:700;
    white-space:nowrap;
    line-height:0.5;
    color:transparent;
    -webkit-text-fill-color:transparent;
    -webkit-text-stroke:1p0x #3f3333;
    transform-origin:top left;
    transform: rotate(0.25turn);
  }
}
.our_services{
  display:flex;
  flex-direction:column;
  align-items:center;
  h1{
    text-align:center;
    font-size:50px;
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
      width:20%;
      display:flex;
      flex-direction:column;
      align-items:center;
      h3{
        color:#06a9a4
      }
    }
  }
}

  
  
.footer{
  box-sizing:border-box;
    background: linear-gradient(to right, rgb(5, 131, 127), rgb(118 147 196));
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    color:white;
    .outlets{
      width:50%;
      display:flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding:0 10px;
      h2{
        font-size:50px;
        font-weight:bold;
        font-family:'Sono';
      }
      ol{
        li{
          font-size:30px;
          margin:2px;
          font-family:'Kanit'
        }
      }
    }
    .contactUs{
      width:50%;
      display:flex;
      flex-direction:column;
      h2{
        font-size:50px;
        font-weight:bold;
        font-family:'Sono';
      }
      a{
        text-decoration:none;
        color:white;
      }
    }
  }

`
export default Home
