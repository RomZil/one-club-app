import { Col, Image, Row } from "react-bootstrap";
import "./ShowItem.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_DEAL_BY_ID } from "../../components/queries/dealQueries";
import Spinner from "../../components/spinner/spinner";
import defult from "../../images/default.png";
import { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import MapIcon from "@mui/icons-material/Map";
import { getAddress } from "../../components/Map/GeocodeFunctions";
import Map from "../../components/Map/Map";

const ShowItem = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = state;

  const { loading, error, data } = useQuery(GET_DEAL_BY_ID, {
    variables: { id },
  });
  const [deal, setDeal] = useState("");
  const [errorImg, setError] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (data != undefined) setDeal(data.getDealbyID);
  }, [data]);

  const onReset = () => {
    navigate(-1);
  };

  const openMap = () => {
    const lat = deal.latitude;
    const lng = deal.longitude;

    if (lat && lng) {
      setMapData({
        lat,
        lng,
      });
    } else {
      if (deal.address === "") return;
      const { lat, lng } = getAddress(deal.address);
      setMapData({
        lat,
        lng,
      });
    }
    setShowMap(true);
  };

  if (error) return <p> Somthing wrong</p>;
  if (loading) return <Spinner />;

  return (
    <div
      className="page"
      style={{ gap: "20px" }}
      onClick={() => {
        if (showMap) setShowMap(false);
      }}
    >
      <BsFillArrowLeftCircleFill
        style={{ margin: "20px", width: " 2rem", height: "2rem" }}
        className="backButton"
        onClick={onReset}
      />
      <div id="container" className="itemDiv">
        <div onClick={openMap}>
          <MapIcon fontSize="large" className="mapIcon" />
        </div>

        {showMap && <Map lat={mapData.lat} lng={mapData.lng} />}

        <Row>
          <div>
            <h3>{deal.title}</h3>

            <div>
              {errorImg ? (
                <img src={defult} />
              ) : (
                <img
                  style={{ width: "80%" }}
                  src={deal.imageURL || defult}
                  onError={() => setError(true)}
                />
              )}
            </div>
            <div className="itemDetails">
              <span>
                {deal.loyaltyCardId != null ? deal.loyaltyCardId.name : ""}
              </span>
            </div>
            <div>
              <hr /> {deal.description} <br />
              {deal.linkToSite && (
                <a href={deal.linkToSite}>{deal.linkToSite}</a>
              )}
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default ShowItem;
