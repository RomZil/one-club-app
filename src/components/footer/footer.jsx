import React, { useState } from "react";
import "./footer.css";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { BsPersonCircle, BsPinMap } from "react-icons/bs";


function Footer() {

   const [isMyClubs , setIsMyClubs] = useState(true);
   const [isLogIn, setisLogIn] = useState(false);

   useEffect(() => {
    const storedCount = localStorage.getItem('isLogIn');
    if (storedCount) {
      setCount(parseInt(storedCount));
    }
  }, []);

  return (
    <Navbar
      className="navbar"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand onClick={}>One Club</Navbar.Brand>
        <Nav className="me-auto">
          <BootstrapSwitchButton
            className="switchButton"
            class="rounded-pill"
            checked={!isMyClubs}
            width={75} 
            onstyle="secondary" 
            offstyle="dark"
            onlabel="Mine"
            offlabel="All"
            onChange={(checked) => {
              setIsMyClubs((prvIsMyClubs) => !prvIsMyClubs);
              console.log("isMyClubs " + isMyClubs);
              console.log("checked " + checked);

            }}
          />
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="top-right-stick">
            <Nav.Link href="#map-page"><BsPinMap className="icons" /> 
            <span className="icon-text"> Around Me </span> 
            </Nav.Link>
            <Nav.Link href="#profile-page"><BsPersonCircle className="icons" /> 
            <span className="icon-text"> Profile </span>
            </Nav.Link>
            <Nav.Link href="/welcome"><BsPersonCircle className="icons" /> 
            <span className="icon-text" onClick={() => {localStorage.clear()}}> Log Out </span>
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Footer;
