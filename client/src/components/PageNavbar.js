import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Import bootstrap components
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

// Import helpers
import { getTokenFromLocalStorage, userIsAuthenticated } from '../helpers/auth'

// Import icon
import { FiLogOut } from 'react-icons/fi' 

const PageNavbar = () => {

  const navigate = useNavigate()

  // Remove the token from localstorage the button logout is pressed
  const handleLogoutBtn = () => {
    localStorage.removeItem('recipes-app')
    navigate('/')
  }

  return (
    <Navbar expand="md" className='py-4'>
      <Container className="px-0 justify-content-end">
        <Nav.Link className="home-btn" as={Link} to="/">Home</Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav.Link as={Link} to="/recipes/">Recipes</Nav.Link>
          {
            !userIsAuthenticated()
              ?
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className='nav-sign-up'>Sign up</Nav.Link>   
              </>
              :
              <>
                <Nav.Link as={Link} to="/recipes/add">Add +</Nav.Link>
                <Nav.Link onClick={handleLogoutBtn} className='logout-btn'>Logout <FiLogOut className='logout-icon' /></Nav.Link>  
              </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PageNavbar