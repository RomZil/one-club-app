import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./search.css";


const Search = ({title}) => {

  const [searchTerm, setSearchTerm] = useState(title);
  const [business, setBusiness] = useState([]);

  const searchBusiness = async (title) => {
    console.log("search " + title);
    // TODO - get the data by name = title
  }

  return (
    <div className="search">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Here"
      />
      <BsSearch className="icons-search"
        onClick={() => searchBusiness(searchTerm)}
      />
    </div>
  );
};

export default Search;
