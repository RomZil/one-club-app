import { Col, Image, Row } from "react-bootstrap";
import Search from "../../components/search/search";
import "./ShowItem.css";
import { useLocation } from "react-router-dom";
import { businesses } from "../../data/mockData";
import BackButton from "../../components/backButton/backButton";

const ShowItem = () => {
  const { state } = useLocation();
  const { id } = state;

  return (
    <div id="container">
      <BackButton />
      <br />
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
          ))}
      </Row>
    </div>
  );
};

export default ShowItem;
