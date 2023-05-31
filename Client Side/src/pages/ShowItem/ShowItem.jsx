import { Col, Image, Row } from "react-bootstrap";
import Search from "../../components/search/search";
import "./ShowItem.css";
import { useLocation } from "react-router-dom";
import { businesses } from "../../data/mockData";

const ShowItem = () => {
  const { state } = useLocation();
  const { id } = state;

  return (
    <div id="container">
      <Col>
        <Row>
        {businesses
            .filter((businesse) => businesse.id == id)
            .map((businesse) => (
              <div>
                <img
                  src={businesse.img[0].url}
                  className="img-fluid shadow-4 imgItem"
                  alt="..."
                />
              </div>
            ))}</Row>
      </Col>
    </div>
  );
};

export default ShowItem;
