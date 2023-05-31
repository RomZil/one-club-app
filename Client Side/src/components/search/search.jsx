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
    const title = value;
    nav("/Home", { state: { title } });
    console.log("search ", value);
  };

  const onSearch = (event) => {
    let term = event.target.value;
    setValue(term);
    const title = term;
    nav("/Home", { state: { title } });
    console.log("search ", term);
  };

  return (
    <div className="App">

      {/* <h1>Search</h1>

      <div className="search">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
        </div>
        <BsSearch className="icons-search" onClick={() => onSearch(value)}>
          {" "}
          Search{" "}
        </BsSearch>
      </div> */}

      <MDBCol md="6">
       <MDBInput className="searchBar" hint="Search" type="text" containerClass="mt-0" value={value} onChange={onSearch}  />
     </MDBCol>

      {/* <div className="dropdown">
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
      </div> */}
    </div>
  );
}
