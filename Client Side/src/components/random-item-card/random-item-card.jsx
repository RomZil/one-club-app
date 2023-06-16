import { Card } from "react-bootstrap";
import ImageComponent from "../ImageComponent/ImageComponent";
import "./random-item-card.css";

export default function RandomItemCard({ item }) {
  return (
    <Card className="item-rand">
      <ImageComponent component={Card.Img} img={item.imageURL}></ImageComponent>
      <Card.Body className="card-body">
        <Card.Title className="card-desc">{item.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}
