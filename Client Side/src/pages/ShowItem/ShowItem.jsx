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
import { useState } from "react";

const ShowItem = () => {
  const { state } = useLocation();
  const { id } = state;

  const { loading, error, data } = useQuery(GET_DEAL, {
    variables: { id: id },
  });
  const [errorImg, setError] = useState(false);

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
          <p>{data.deal.title}</p>
          <div>
            {errorImg ? (
              <img src={defult} />
            ) : (
              <img
                src={data.deal.imageURL || defult}
                onError={() => setError(true)}
              />
            )}
          </div>
        </div>
        {/* ))} */}
      </Row>
    </div>
  );
};

export default ShowItem;
