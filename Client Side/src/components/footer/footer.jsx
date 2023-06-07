import React, { useEffect, useState } from "react";
import "./footer.css";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { BsPersonCircle, BsPinMap } from "react-icons/bs";
import emitter from "../../shared/emitter";
import { useNavigate } from "react-router-dom";

function Footer() {
  const [isMyClubs, setIsMyClubs] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();

  const handleMyClubsChange = (event) => {
    setIsMyClubs(event.target.value);
  };

  useEffect(() => {
    const storedIsLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    // if (storedIsLoggedIn) {
    //   setIsLoggedIn(storedIsLoggedIn === false);
    // }
    setIsLoggedIn(storedIsLoggedIn);

    // const eventHandler = (data) => {
    //   console.log("Received data:", data);
    //   // Handle the emitted data
    //   setIsLoggedIn(data);
    //   // TODO: dont forget when log out isLoggedIn = false;
    // };

    // // Subscribe to the event
    // emitter.on("isLoggedIn", eventHandler);

    // return () => {
    //   // Unsubscribe when the component unmounts
    //   emitter.off("isLoggedIn", eventHandler);
    // };
  }, []);
  // useEffect(() => {
  //   setIsLoggedIn(JSON.parse(localStorage.getItem("isLogIn")));
  // }, []);
  return (
    <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand
          onClick={() => {
            nav("/Home", { state: { title: null } });
          }}
        >
          One Club
        </Navbar.Brand>
        {isLoggedIn && (
          <>
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
                  handleMyClubsChange((prvIsMyClubs) => !prvIsMyClubs);
                  console.log("isMyClubs " + isMyClubs);
                  console.log("checked " + checked);
                }}
              />
            </Nav>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="top-right-stick">
                <Nav.Link href="#map-page">
                  <BsPinMap className="icons" />
                  <span className="icon-text"> Around Me </span>
                </Nav.Link>
                <Nav.Link href="Profile">
                  <BsPersonCircle className="icons" />
                  <span className="icon-text"> Profile </span>
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    localStorage.clear();
                  }}
                  href="/"
                >
                  <BsPersonCircle className="icons" />
                  <span className="icon-text">Log Out</span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default Footer;
