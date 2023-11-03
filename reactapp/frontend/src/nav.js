import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function NavigationBar() {

    return (
        <div className="App">
            <Navbar className="navbar" variant="dark" >
                <Navbar.Brand href="/">Muse Mouse</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbartitle">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/favorites">About Us</Nav.Link>
                        <Nav.Link href="/ratings">Rate A Song</Nav.Link>
                        <Nav.Link href="/favorites">Artist Leaderboard</Nav.Link>
                        <Nav.Link href="/Music">Contact</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/favorites">Logout</Nav.Link>
                        <Nav.Link href="/newsignup">Sign Up</Nav.Link>
                        <NavDropdown title="Account" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/newlogin">Login</NavDropdown.Item>
                            <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavigationBar;


