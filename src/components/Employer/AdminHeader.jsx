import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../images/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { logoutResponsecontext } from '../../context/contextApi';

function AdminHeader() {
    const {setauthoriseToken}=useContext(logoutResponsecontext)
    const navigate = useNavigate()

    const handleLogout = () => {
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("userToken")
    sessionStorage.removeItem("userData")
    setauthoriseToken(false)
    navigate('/')
  }
    
  return (
    <>
    {['lg'].map((expand) => (
  <Navbar key={expand} expand={expand} className="navbar bg-secondary py-3 px-3 border-none mb-0 shadow">
    <Container fluid>
    <Navbar.Brand >
     <Link to={'/'}>
        <img
          src={logo}
          width="150"
          height="50"
          className="d-inline-block align-top"
          alt=" logo"
        />
     </Link>
    </Navbar.Brand>
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand-${expand}`}
        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
            jobQuest
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link><Link  to={'/'} style={{textDecoration:'none',fontSize:'20px',color:"black"}}>Home</Link></Nav.Link>
            <Nav.Link><Link  to={'/admin-dashboard'} style={{textDecoration:'none',fontSize:'20px',color:"black"}}>Dashboard</Link></Nav.Link>
            <Nav.Link ><Link  to={'/all-candidates'}style={{textDecoration:'none',fontSize:'20px',color:"black"}}>All candidates</Link></Nav.Link>
          
          </Nav>                
            <div className='btn btn-danger p-2' onClick={handleLogout}>Logout</div>
         
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>
))}

  </>
  )
}

export default AdminHeader