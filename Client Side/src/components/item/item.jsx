import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import defult from "../../images/default.png";

import "./item.css";
import ImageComponent from "../ImageComponent/ImageComponent";

function Item({ title, img, perentId, id }) {
  const navigate = useNavigate();
  const onClickItem = () => {
    perentId == null
      ? navigate("/FilteresCategories", { state: { id } })
      : navigate("/ShowItem", { state: { id } });
  };
  return (
    <Card onClick={onClickItem} className="item">
      <ImageComponent component={Card.Img} img={img}></ImageComponent>
      <Card.Title className="card-desc">{title}</Card.Title>
    </Card>
  );
}

export default Item;
