import { Row, Col } from "react-bootstrap";
import Item from "../../components/item/item";
import { businesses } from "../../data/mockData";

const FilteresCategories = ({ id }) => {
  return (
    <div>
      <Col>
        <Row className="categories" style={{ marginLeft: 2, gridGap: 15 }}>
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
