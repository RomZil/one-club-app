import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./item.css";

function Item({ title, img, perentId, id }) {
  const navigate = useNavigate();
  const onClickItem = () => {
    perentId == null
      ? navigate("/FilteresCategories", { state: { id } })
      : navigate("/ShowItem", { state: { id } });
  };

  return (
    <Card className="item">
      <Card.Img
        className="card-img"
        onClick={onClickItem}
        variant="top"
        // src={img[0].url}
      />
      <Card.Body className="card-body">
        <Card.Title className="card-desc">{title}</Card.Title>
      </Card.Body>
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
