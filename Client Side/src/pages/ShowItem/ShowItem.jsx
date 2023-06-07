import { Col, Image, Row } from "react-bootstrap";
import Search from "../../components/search/search";
import "./ShowItem.css";
import { useLocation } from "react-router-dom";
// import { businesses } from "../../data/mockData";
import BackButton from "../../components/backButton/backButton";
import { useQuery } from "@apollo/client";
import { GET_DEAL } from "../../components/queries/dealQueries";
import Spinner from "../../components/spinner/spinner";
import defult from "../../images/default.png";

const ShowItem = () => {
  const { state } = useLocation();
  const { id } = state;
  const { loading, error, data } = useQuery(GET_DEAL, {
    variables: { id: id },
  });

  if (error) return <p> Somthing wrong</p>;
  if (loading) return <Spinner />;

  return (
    <div id="container">
      <BackButton />
      <br />
      <Row>
        {/* {businesses
          .filter((businesse) => businesse.id == id)
          .map((businesse) => ( */}
        <div>
          <p>{data.deal.description}</p>
          <img
            src={data.deal.img || defult}
            className="img-fluid shadow-4 imgItem"
            alt="..."
          />
        </div>
        {/* ))} */}
      </Row>
    </div>
  );
};

export default ShowItem;
