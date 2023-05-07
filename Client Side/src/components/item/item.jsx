import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./item.css";

function Item({ name, img, perentId, id }) {
  const navigate = useNavigate();
  const onClickItem = () => {
    perentId == null
      ? navigate("/FilteresCategories", { state: { id } })
      : // TODO - bussines selected => goto suitable item page
        console.log("business selection");
  };

  return (
    <Card className="item">
      <Card.Img
        className="card-img"
        onClick={onClickItem}
        variant="top"
        src={img[0].url}
      />
      <Card.Body className="card-body">
        <Card.Title className="card-desc">{name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Item;
