import { useNavigate } from "react-router-dom";
import { MDBCol, MDBInput } from "mdbreact";
import { useState } from "react";
import { categories } from "../../data/mockData.js";
import "./search.css";
import { BsSearch } from "react-icons/bs";

export default function Search() {
  const [value, setValue] = useState("");
  const nav = useNavigate();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    const title = value;
    nav("/Home", { state: { title } });
    console.log("search ", searchTerm);
  };

  return (
    // <div className="search">
    //   <input
    //     value={searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //     placeholder="Search Here"
    //   />
    //   <BsSearch
    //     className="icons-search"
    //     onClick={() => searchBusiness(searchTerm)}
    //   />
    // </div>

    // <MDBCol md="6">
    //   <MDBInput className="searchBar" hint="Search" type="text" containerClass="mt-0" />
    // </MDBCol>
    <div className="App">
      <h1>Search</h1>

      <div className="search">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
        </div>
        <BsSearch className="icons-search" onClick={() => onSearch(value)}>
          {" "}
          Search{" "}
        </BsSearch>
      </div>
      <div className="dropdown">
        {categories
          .filter((item) => {
            const searchTerm = value.toUpperCase();
            const fullName = item.name.toUpperCase();

            return (
              searchTerm &&
              fullName.startsWith(searchTerm) &&
              fullName !== searchTerm
            );
          })
          .slice(0, 10)
          .map((item) => (
            <div
              onClick={() => onSearch(item.name)}
              className="dropdown-row"
              key={item.full_name}
            >
              {item.name}
            </div>
          ))}
      </div>
    </div>
  );
}
