// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useEffect, useState } from "react";
// import Item from "../../components/item/item.jsx";
// import { Col, Row } from "react-bootstrap";
// import Search from "../../components/search/search.jsx";
// import { useLocation } from "react-router-dom";
// import "./Home.css";
// import { GET_DEALS } from "../../components/queries/dealQueries.js";
// import { useQuery } from "@apollo/client";
// import Spinner from "../../components/spinner/spinner.jsx";
// import { GET_CATEGORIES } from "../../components/queries/categoryQueries.js";
// import Category from "../../shared/category.jsx";

// export default function Home() {
//   const {
//     loading: loadingDeals,
//     error: errorDeals,
//     data: dataDeals,
//   } = useQuery(GET_DEALS);
//   const {
//     loading: loadingCategory,
//     error: errorCategory,
//     data: dataCategories,
//   } = useQuery(GET_CATEGORIES);

//   const { state } = useLocation();
//   const [categories_filtered, setCategories_filtered] = useState([]);

//   const { title } = state;

//   useEffect(() => {
//     if (dataDeals != undefined && title != null && title != "") {
//       const tmp = dataDeals.deals.filter((deals) => {
//         return deals.title.toUpperCase().includes(title.toUpperCase());
//       });
//       setCategories_filtered(tmp);
//     } else if (dataCategories != undefined) {
//       console.log(dataCategories);
//       setCategories_filtered(dataCategories.categories);
//     }
//   }, [dataDeals, state, dataCategories]);

//   if (loadingDeals) return <Spinner />;
//   // if (errorDeals) return <p> Somthing wrong with deals</p>;
//   if (loadingCategory) return <Spinner />;
//   if (errorCategory) return <p> Somthing wrong with categories</p>;

//   return (
//     <div>
//       {/* <Category></Category> */}
//       <Search title={""} />
//       {/* <h1 className="headline">Categories</h1> */}
//       <br />
//       <Row
//         className="categories"
//         style={{ display: "flex", justifyContent: "center", gridGap: 15 }}
//       >
//         {categories_filtered.map((item) => (
//           <Item
//             key={item.id} // Assign stable key using category.id
//             id={item.id}
//             img={item.img}
//             title={item.title}
//             parentId={item.category}
//           />
//         ))}
//       </Row>
//     </div>
//   );
// }

import "bootstrap/dist/css/bootstrap.min.css";
import Item from "../../components/item/item.jsx";
import { Col, Row } from "react-bootstrap";
import Search from "../../components/search/search.jsx";
import "./Home.css";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/spinner/spinner.jsx";
import { GET_CATEGORIES } from "../../components/queries/categoryQueries.js";
import Category from "../../shared/category.jsx";

export default function Home() {
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
        style={{ display: "flex", justifyContent: "center", gridGap: 15 }}
      >
        {dataCategories.categories.map((item) => (
          <Item
            key={item.id} // Assign stable key using category.id
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
