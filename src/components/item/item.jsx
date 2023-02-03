import React from "react";
import { Card } from "react-bootstrap";
import "./item.css";

function Item({ name , img , nextFuncName }) {
  return (
    <Card 
    //  onClick={nextFuncName} 
     className="item" 
    //  style={{ width: "30%", height: "30%" }}
    >
      <Card.Img className="card-img" 
       variant="top" 
       src={img[0].url} />
      <Card.Body className="card-body">
        <Card.Title className="card-desc">{name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Item;
