import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GET_DEAL, GET_DEALS } from "../components/queries/dealQueries"; 
import { useQuery } from '@apollo/client';
import Spinner from "../components/spinner/spinner";

export default function Deals() {

  const { loading, error, data } = useQuery(GET_DEALS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
    {data.deals.map((deal) => (
          <div id="deal">{deal.title}</div>
          ))}
    </>
);
};