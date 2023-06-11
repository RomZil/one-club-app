import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Item from "../../components/item/item";
import Search from "../../components/search/search";
import BackButton from "../../components/backButton/backButton";
import { useEffect, useState } from "react";
import {
  GET_DEALS,
  GET_DEAL_BY_CATEGORY_AND_USER,
} from "../../components/queries/dealQueries.js";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/spinner/spinner";
import emitter from "../../shared/emitter";
import { GET_DEAL_BY_CATEGORY } from "../../components/queries/categoryQueries";

const FilteresCategories = () => {
  const [deals, setDeals] = useState([]);
  const { state } = useLocation();
  const { id, title } = state || {};
  //defult ID
  const safeId = id ?? "64823286022dea94ebc3ff78";

  const {
    loading: loadingDeals,
    error: errorDeals,
    data: dataDeals,
  } = useQuery(GET_DEALS);

  const {
    loading: loadingDealsByCategory,
    error: errorDealsByCategory,
    data: dataDealsByCategory,
  } = useQuery(GET_DEAL_BY_CATEGORY, {
    variables: { categoryID: safeId },
  });

  const {
    loading: loadingDealsByUser,
    error: errorDealsByUser,
    data: dataDealsByUser,
  } = useQuery(GET_DEAL_BY_USER);

  const {
    loading: loadingDealsByCategoryAndUser,
    error: errorDealsByCategoryAndUser,
    data: dataDealsByCategoryAndUser,
  } = useQuery(GET_DEAL_BY_CATEGORY_AND_USER, {
    variables: { categoryID: safeId },
  });
  useEffect(() => {
    // Listening to the event
    const listener = (isMyClubs) => {};

    emitter.on("isMyClubs", listener);

    return () => {
      // Unsubscribing from the event when component unmounts
      emitter.off("isMyClubs", listener);
    };
  }, []);

  useEffect(() => {
    if (id != undefined) {
      //info get when tagel on myclubs
      if (dataDealsByCategoryAndUser !== undefined) {
        setDeals(dataDealsByCategoryAndUser.GetDealsByCategoryAndUser);
      }
      // info from category, by ID
      if (dataDealsByCategory !== undefined) {
        setDeals(dataDealsByCategory.getDealsByCategory);
      }
    }
    if (title != undefined) {
      // info from search, get all data to filter
      if (dataDeals !== undefined) {
        const filteredDeals = dataDeals.getDeals.filter((deal) => {
          return deal.title.toUpperCase().includes(title.toUpperCase());
        });
        setDeals(filteredDeals);
      }
      if (dataDealsByUser !== undefined) {
        const filteredDeals = dataDeals.getDeals.filter((deal) => {
          return deal.title.toUpperCase().includes(title.toUpperCase());
        });
        setDeals(filteredDeals);
      }
    }
  }, [state, dataDeals, dataDealsByCategory]);

  if (loadingDeals || loadingDealsByCategory) return <Spinner />;
  if (errorDeals || errorDealsByCategory) return <p>Something Went Wrong</p>;

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
        {deals.map((deal) => (
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
