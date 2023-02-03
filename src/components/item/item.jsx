import React from "react";
import { Card } from "react-bootstrap";
import "./item.css";

function Item(props) {
  return (
    <Card onClick={props.nextFuncName} className="item" style={{ width: "30%", height: "30%" }}>
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.text}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Item;
