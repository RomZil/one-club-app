import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import defult from "../../images/default.png";

import "./item.css";
import ImageComponent from "../ImageComponent/ImageComponent";

function Item({ title, img, perentId, id }) {
  const navigate = useNavigate();
  const onClickItem = () => {
    if (perentId == null) {
      navigate("/FilteresCategories", { state: { id } });
      // TODO ADD INCREACE CATEGORY
    } else {
      navigate("/ShowItem", { state: { id } });
      // TODO ADD INCREACE DEAL
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
