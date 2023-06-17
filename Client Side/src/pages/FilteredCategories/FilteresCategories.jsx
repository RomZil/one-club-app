import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Item from "../../components/item/item";
import Search from "../../components/search/search";
import BackButton from "../../components/backButton/backButton";
import { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import "./FilteresCategories";
import {
  GET_DEALS,
  GET_DEAL_BY_CATEGORY_AND_USER,
  GET_DEAL_BY_USER,
} from "../../components/queries/dealQueries.js";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/spinner/spinner";
import emitter from "../../shared/emitter";
import { GET_DEAL_BY_CATEGORY } from "../../components/queries/categoryQueries";
import { useNavigate } from "react-router-dom";

const FilteresCategories = ({ isMyClubs }) => {
  const navigate = useNavigate();

  const onReset = () => {
    let title = "";
    navigate("/FilteresCategories", { state: { title } });
  };

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
    // const listener = (isMyClubs) => {
    if (isMyClubs) {
      console.log("isMyClubs", isMyClubs);
      //info get when taggle on myclubs && get data from category
      if (dataDealsByCategoryAndUser !== undefined && id != undefined) {
        setDeals(dataDealsByCategoryAndUser.getDealsByCategoryAndUser);
        console.log(
          "dataDealsByCategoryAndUser.getDealsByCategoryAndUser",
          dataDealsByCategoryAndUser.getDealsByCategoryAndUser
        );
      }
      if (dataDealsByUser !== undefined && title != undefined) {
        const filteredDeals = dataDeals.getDeals.filter((deal) => {
          return deal.title.toUpperCase().includes(title.toUpperCase());
        });
        setDeals(filteredDeals);
        console.log("filteredDeals", filteredDeals);
      }
    } else {
      console.log("isMyClubs", isMyClubs);

      if (dataDealsByCategory !== undefined && id != undefined) {
        setDeals(dataDealsByCategory.getDealsByCategory);
        console.log(
          "dataDealsByCategory.getDealsByCategory",
          dataDealsByCategory.getDealsByCategory
        );
      }
      if (dataDeals !== undefined && title != undefined) {
        const filteredDeals = dataDeals.getDeals.filter((deal) => {
          return deal.title.toUpperCase().includes(title.toUpperCase());
        });
        setDeals(filteredDeals);
        console.log("filteredDeals", filteredDeals);
      }
    }
  }, [
    state,
    dataDeals,
    dataDealsByCategory,
    dataDealsByCategoryAndUser,
    isMyClubs,
  ]);

  if (loadingDeals) return <Spinner />;
  if (loadingDealsByCategory) return <Spinner />;
  if (errorDeals || errorDealsByCategory) return <p>Something Went Wrong</p>;

  return (
    <div>
      <div className="searchWrapper">
        <Search title={title} />
        <BsFillArrowLeftCircleFill
          style={{ margin: "20px" }}
          className="backButton"
          onClick={onReset}
          CLICK
          ME
          TO
          RESET
        />
        {/* <h1 className="headline">{dataDeals.cat}</h1> */}
      </div>
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
