import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Item from "../../components/item/item";
import Search from "../../components/search/search";
import BackButton from "../../components/backButton/backButton";
import { useEffect, useState } from "react";
import { GET_DEALS } from "../../components/queries/dealQueries.js";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/spinner/spinner";
const FilteresCategories = () => {
  const [deals, setDeals] = useState([]);
  const { state } = useLocation();
  const { id } = state;

  const {
    loading: loadingDeals,
    error: errorDeals,
    data: dataDeals,
  } = useQuery(GET_DEALS);

  useEffect(() => {
    // console.log(dataDeals);
    if (dataDeals != undefined) {
      // dataDeals.deals
      //   .filter((deal) => deal.category == id)
      //   .map((deal) => () => {
      //     console.log(deal);
      //   });
      setDeals(dataDeals.deals);
    }
  }, [state, dataDeals]);

  if (loadingDeals) return <Spinner />;
  if (errorDeals) return <p>Something Went Wrong</p>;

  return (
    <div>
      <BackButton />
      <br />
      <Search title={""} />
      <h1 className="headline">Businesses</h1>
      <br />
      <Row
        className="businesses"
        style={{ display: "flex", justifyContent: "center", gridGap: 15 }}
      >
        {dataDeals.deals
          // .filter((deal) => deal.category == id)
          .map((deal) => (
            <Item
              key={deal.id}
              id={deal.id}
              img={deal.imageURL}
              title={deal.title}
              perentId={id}
            />
          ))}
      </Row>
    </div>
  );
};

export default FilteresCategories;
