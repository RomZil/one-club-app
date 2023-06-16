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

    // <div className="row product">
    //   <div className="col-md-2">
    //     <img src={img[0].url} alt={name} />
    //   </div>
    //   <div className="col-md-8 product-detail">
    //     <h4>{name}</h4>
    //     {/* <div dangerouslySetInnerHTML={{ __html: description }}></div> */}
    //   </div>
    // </div>
  );
}

export default Item;
