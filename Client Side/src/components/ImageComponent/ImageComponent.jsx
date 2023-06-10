import { useState } from "react";
import { Card } from "react-bootstrap";
import defult from "../../images/default.png";

const ImageComponent = ({ img }) => {
  const [error, setError] = useState(false);

  return (
    <div>
      {error ? (
        <Card.Img src={defult} />
      ) : (
        <Card.Img src={img || defult} onError={() => setError(true)} />
      )}
    </div>
  );
};
export default ImageComponent;
