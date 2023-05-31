import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <BsFillArrowLeftCircleFill onClick={goBack}>
        Go Back
      </BsFillArrowLeftCircleFill>
    </div>
  );
};
export default BackButton;
