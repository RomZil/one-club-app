import "bootstrap/dist/css/bootstrap.min.css";
import Item from "../../components/item/item.jsx";
import { Col, Row } from "react-bootstrap";
import Search from "../../components/search/search.jsx";
import "./Home.css";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/spinner/spinner.jsx";
import { GET_CATEGORIES } from "../../components/queries/categoryQueries.js";
import Category from "../../shared/category.jsx";

export default function Category() {
  const {
    loading: loadingCategory,
    error: errorCategory,
    data: dataCategories,
  } = useQuery(GET_CATEGORIES);

  // const { state } = useLocation();

  // useEffect(() => {
  // if (dataCategories != undefined) {
  //     console.log(dataCategories);
  //     setCategories_filtered(dataCategories.categories);
  //   }
  // }, [dataDeals, state, dataCategories]);

  if (loadingCategory) return <Spinner />;
  if (errorCategory) return <p> Somthing wrong with categories</p>;

  return (
    <div>
      <Search title={""} />
      <br />
      <Row
        className="categories"
        style={{
          display: "flex",
          justifyContent: "center",
          gridGap: 15,
        }}
      >
        {dataCategories.categories.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            img={item.img}
            title={item.name}
            parentId={null}
          />
        ))}
      </Row>
    </div>
  );
}
