import { Col, Image, Row } from "react-bootstrap";
import "./ShowItem.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_DEAL_BY_ID } from "../../components/queries/dealQueries";
import Spinner from "../../components/spinner/spinner";
import defult from "../../images/default.png";
import { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const ShowItem = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = state;

  const { loading, error, data } = useQuery(GET_DEAL_BY_ID, {
    variables: { id },
  });
  const [deal, setDeal] = useState("");
  const [errorImg, setError] = useState(false);

  useEffect(() => {
    if (data != undefined) setDeal(data.getDealbyID);
  }, [data]);

  const onReset = () => {
    navigate(-1);
  };

  if (error) return <p> Somthing wrong</p>;
  if (loading) return <Spinner />;

  return (
    <div className="page" style={{ gap: "20px" }}>
      <BsFillArrowLeftCircleFill
        style={{ margin: "20px" }}
        className="backButton"
        onClick={onReset}
      />
      <div id="container" className="itemDiv">
        <Row>
          <div>
            <h3>{deal.title}</h3>

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
            <div className="itemDetails">
              <span>
                {deal.loyaltyCardId != null ? deal.loyaltyCardId.name : ""}
              </span>
              -<span>{deal.description != null ? deal.description : ""}</span>
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default ShowItem;
