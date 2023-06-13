import { Col, Image, Row } from "react-bootstrap";
import Search from "../../components/search/search";
import "./ShowItem.css";
import { useLocation } from "react-router-dom";
import BackButton from "../../components/backButton/backButton";
import { useQuery } from "@apollo/client";
import { GET_DEAL_BY_ID } from "../../components/queries/dealQueries";
import Spinner from "../../components/spinner/spinner";
import defult from "../../images/default.png";
import { useEffect, useState } from "react";

const ShowItem = () => {
  const { state } = useLocation();
  const { id } = state;

  const { loading, error, data } = useQuery(GET_DEAL_BY_ID, {
    variables: { id },
  });
  const [deal, setDeal] = useState("");
  const [errorImg, setError] = useState(false);

  useEffect(() => {
    if (data != undefined) setDeal(data.getDealbyID);
  }, [data]);

  if (error) return <p> Somthing wrong</p>;
  if (loading) return <Spinner />;

  return (
    <div id="container">
      <BackButton />
      <br />
      <Row>
        <div>
          <p>
            {deal.loyaltyCardId != null ? deal.loyaltyCardId.name : ""}
          </p>
          <p>{deal.description != null ? deal.description : ""}</p>
          <p>{deal.title}</p>
          <div>
            {errorImg ? (
              <img src={defult} />
            ) : (
              <img
                src={deal.imageURL || defult}
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
