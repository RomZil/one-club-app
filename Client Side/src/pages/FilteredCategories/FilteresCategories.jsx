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
  const { id, title } = state;

  const {
    loading: loadingDeals,
    error: errorDeals,
    data: dataDeals,
  } = useQuery(GET_DEALS);

  useEffect(() => {
    console.log("dataDeals" , dataDeals);
    console.log(id);
    if (dataDeals != undefined) {
      if (title != undefined) {
        const x = dataDeals.getDeals.filter((deals) => {
          return deals.title.toUpperCase().includes(title.toUpperCase());
        });
        setDeals(x);
      }
      if (id != undefined) {
        console.log("dataDeals" , dataDeals);
        const x = dataDeals.getDeals
          // .filter((deal) => deal.category == id)
          .map((deal) => () => {
            console.log(deal);
          });
        setDeals(dataDeals.getDeals);
      }
    }
  }, [state, dataDeals]);

  if (loadingDeals) return <Spinner />;
  if (errorDeals) return <p>Something Went Wrong</p>;

  return (
    <div>
      <Search title={title} />
      <BackButton />
      <h1 className="headline">DEALS</h1>
      <br />
      <Row
        className="businesses"
        style={{ display: "flex", justifyContent: "center", gridGap: 15 }}
      >
        {deals
          // .filter((deal) => deal.category == id)
          .map((deal) => (
            <Item
              key={deal.id}
              id={deal.id}
              img={deal.imageURL}
              title={deal.title}
              perentId={1}
            />
          ))}
      </Row>
    </div>
  );
};

export default FilteresCategories;
