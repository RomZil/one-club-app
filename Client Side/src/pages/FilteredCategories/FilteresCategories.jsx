import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Item from "../../components/item/item";
import { businesses } from "../../data/mockData";
import Search from "../../components/search/search";
const FilteresCategories = () => {
  const { state } = useLocation();
  const { id } = state;
  debugger;
  return (
    <div>
      <Col>
        <Search title={""} />
        <Row className="businesses" style={{ marginLeft: 2, gridGap: 15 }}>
          {businesses
            .filter((businesse) => businesse.perent_id == id)
            .map((businesse) => (
              <Item
                key={businesse.id}
                id={businesse.id}
                img={businesse.img}
                name={businesse.name}
                perentId={businesse.perent_id}
              />
            ))}
        </Row>
      </Col>
    </div>
  );
};

export default FilteresCategories;
