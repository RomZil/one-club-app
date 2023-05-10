import React from "react";
import { Card } from "react-bootstrap";
import "./item.css";

function Item({ name, img, perentId }) {
  const onClickItem = (perentId) => {
    perentId == null
      ? // TODO - categorie selected => goto business suitable page
        console.log("category selection")
      : // TODO - bussines selected => goto suitable item page
        console.log("business selection");
  };

  return (
    <Card className="item">
      <Card.Img
        className="card-img"
        onClick={() => onClickItem(perentId)}
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
