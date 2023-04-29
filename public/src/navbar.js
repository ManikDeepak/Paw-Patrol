import React, { useState, useEffect} from 'react'
import { debounce } from './utils/debounce'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import image from '../src/images/paw-patrol-logo.png'

const Navbar = ( ) => {

    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)

    const handleScroll = debounce(() => {
        const currentScrollPos = window.scrollY

        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10)
        setPrevScrollPos(currentScrollPos)
    },60)

    useEffect(() => {
        window.addEventListener('scroll',handleScroll)

        return () => window.removeEventListener('scroll',handleScroll)
    },[prevScrollPos, visible, handleScroll])

    const NavbarStyle = {
        position: 'fixed',
        height: '10vh',
        width: '100%',
        textAlign: 'center',
        transition: 'top 0.2s',
        overflow:'hidden'
        // backgroundColor: '#fff8c9'

    }
    
    return (
        <div style={{...NavbarStyle, top:visible?'0px':'-15vh'}}>
            <Container>
                <h3>Home</h3>
                <h3>About Us</h3>
                <h3>Services</h3>
                <h2>Paw Patrol</h2>
                <h3>Contact Us</h3>
                <h3><Link to='/register'>Register</Link></h3>
                <h3><Link to='/login'>
                    Login
                    </Link> 
                    </h3>
            </Container>
            
        </div>
    )
}

const Container = styled.div`
background: rgba(255, 255, 255, 0.2);
display:flex;
align-items: center;
justify-content: space-between;
padding:8px 5%;
border:none;
border-radius:5px;
h3{
    font-family: Sono;
    font-size:20px;
    color:black;
    color:black;
      transition: 0.15s ease;

   a{
      color:black;
      text-decoration:none;
      font-weight:bold;
      transition: 0.15s ease;
      &:hover{
        cursor:pointer;
        color:white;
      transition: 0.15s ease;

    }
    }
    &:hover{
        cursor:pointer;
      transition: 0.15s ease;
        color:white;
    }
}
h2{
    font-family:'Rubik Iso';
    font-size:35px;
    pointer-events: none;
    color:black;
}
z-index:999;
`

export default Navbar