import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import defult from "../../images/default.png";

import "./item.css";
import ImageComponent from "../ImageComponent/ImageComponent";
import { useMutation } from "@apollo/client";

function Item({ title, img, perentId, id }) {
  const [increasePopularCategory] = useMutation(increasePopularCategory);

  const navigate = useNavigate();
  const onClickItem = () => {
    if (perentId == null) {
      increasePopularCategory({ variables: { categoryID: id } });
      navigate("/FilteresCategories", { state: { id } });
    } else {
      navigate("/ShowItem", { state: { id } });
    }
  };
  return (
    <Card onClick={onClickItem} className="item">
      <ImageComponent component={Card.Img} img={img}></ImageComponent>
      <Card.Title className="card-desc">{title}</Card.Title>
    </Card>
  );
}

export default Item;
