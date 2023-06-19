import React, { useEffect, useState } from "react";
import "./footer.css";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { BsPersonCircle, BsPinMap, BsDoorOpen } from "react-icons/bs";
import emitter from "../../shared/emitter";
import { useNavigate } from "react-router-dom";

function Footer({ setIsMyClubs, isMyClubs }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, []);

  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, []);

  function handleMyClubsChange() {
    setIsMyClubs((prevState) => !prevState);
  }

  return (
    <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand
          onClick={() => {
            if (isLoggedIn) navigate("/Home", { state: { title: null } });
          }}
        >
          One Club
        </Navbar.Brand>
        {isLoggedIn ? (
          <>
            <Nav className="me-auto">
              <BootstrapSwitchButton
                className="switchButton"
                class="rounded-pill"
                checked={isMyClubs}
                width={75}
                onstyle="light"
                offstyle="dark"
                onlabel="Mine"
                offlabel="All"
                onChange={handleMyClubsChange}
              />
            </Nav>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="btnCollapse" id="responsive-navbar-nav">
              <Nav className="top-right-stick navbarCollapseDiv">
                <Nav.Link href="Profile">
                  <BsPersonCircle className="icons" />
                  <span className="icon-text">Profile</span>
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    localStorage.clear();
                  }}
                  href="/"
                >
                  <BsDoorOpen className="icons" />
                  <span className="icon-text">Log Out</span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="btnCollapse" id="responsive-navbar-nav">
              <Nav className="top-right-stick navbarCollapseDiv">
                <Nav.Link
                  onClick={() => {
                    JSON.parse(localStorage.getItem("isLoggedIn"))
                      ? navigate("/Home", { state: { title: null } })
                      : navigate("/LogIn");
                  }}
                >
                  <BsDoorOpen className="icons" />
                  <span className="icon-text">Log In</span>
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
