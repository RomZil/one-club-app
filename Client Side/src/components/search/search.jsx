import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./search.css";
import { useNavigate } from "react-router-dom";
import { MDBCol, MDBInput } from "mdbreact";

const Search = ({ title }) => {
  const [searchTerm, setSearchTerm] = useState(title);
  const [business, setBusiness] = useState([]);
  const nav = useNavigate();
  const searchBusiness = async (title) => {
    console.log("search " + title);
    nav("/Home", { state: { title } });
    // TODO - get the data by name = title
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

    <MDBCol md="6">
      <MDBInput className="searchBar" hint="Search" type="text" containerClass="mt-0" />
    </MDBCol>
  );
};

export default Search;
