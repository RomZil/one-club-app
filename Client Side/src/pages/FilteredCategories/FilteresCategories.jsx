import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Item from "../../components/item/item";
import Search from "../../components/search/search";
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
import { GET_DEAL_BY_CATEGORY } from "../../components/queries/categoryQueries";
import { useNavigate } from "react-router-dom";

const FilteresCategories = ({ isMyClubs }) => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const { state } = useLocation();
  const { id, title } = state || {};
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
    if (isMyClubs) {
      console.log("isMyClubs", isMyClubs);

      if (dataDealsByCategoryAndUser !== undefined && id != undefined) {
        setDeals(dataDealsByCategoryAndUser.getDealsByCategoryAndUser);
        console.log(
          "dataDealsByCategoryAndUser.getDealsByCategoryAndUser",
          dataDealsByCategoryAndUser.getDealsByCategoryAndUser
        );
      }
      if (dataDealsByUser !== undefined && title != undefined) {
        const filteredDeals = dataDealsByUser.getDealsByUser.filter((deal) => {
          return deal.title.toUpperCase().includes(title.toUpperCase());
        });
        setDeals(filteredDeals);
        console.log("dataDealsByUser", filteredDeals);
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
        console.log("dataDeals", filteredDeals);
      }
    }
  }, [
    state,
    dataDeals,
    dataDealsByCategory,
    dataDealsByCategoryAndUser,
    isMyClubs,
  ]);

  const onReset = () => {
    if (state.title == undefined) {
      navigate(-1);
    } else {
      let title = "";
      navigate("/FilteresCategories", { state: { title } });
    }
  };

  if (loadingDeals) return <Spinner />;
  if (loadingDealsByCategory) return <Spinner />;
  if (errorDeals || errorDealsByCategory) return <p>Something Went Wrong</p>;

  return (
    <div>
      <div className="searchWrapper">
        <Search title={title} />
        <BsFillArrowLeftCircleFill
          style={{ margin: "20px", width: " 2rem", height: "2rem" }}
          className="backButton"
          onClick={onReset}
        />
      </div>
      <div>
        {deals.length > 0 ? (
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
        ) : (
          <>
            <p> Oops! there is noting to show here... </p>
            <p>Please check your loyalty cards subscription </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FilteresCategories;
