import { useNavigate } from "react-router-dom";
import { MDBCol, MDBInput } from "mdbreact";
import { useState } from "react";
import { categories } from "../../data/mockData.js";
import "./search.css";
import { BsSearch } from "react-icons/bs";

export default function Search({ title }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const onSearch = (event) => {
    // if (title == null {
    //   navigate("/Home", { state: { title } });
    // }
    let title = event.target.value;
    navigate("/FilteresCategories", { state: { title } });
  };

  return (
    <div className="App">
      <MDBCol md="6">
        <MDBInput
          className="searchBar"
          hint="Search"
          type="text"
          containerClass="mt-0"
          value={title}
          onChange={onSearch}
        />
      </MDBCol>
    </div>
  );
}
