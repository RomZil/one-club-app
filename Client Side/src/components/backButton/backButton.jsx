import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import './backButton.css';

const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    // <Button variant="outline-dark" onClick={goBack}>
    <BsFillArrowLeftCircleFill className="backButton" onClick={goBack} />
    // </Button>
  );
};
export default BackButton;
