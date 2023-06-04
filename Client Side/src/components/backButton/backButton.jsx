import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button variant="outline-dark" onClick={goBack}>
      <BsFillArrowLeftCircleFill />
    </Button>
  );
};
export default BackButton;
