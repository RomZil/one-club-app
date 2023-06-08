import { Link } from "react-router-dom";
import { GET_CATEGORIES, GET_CATEGORY } from "../components/queries/categoryQueries";
import { useQuery } from "@apollo/client";
import Spinner from "../components/spinner/spinner";

export default function Category() {

    const { loading, error, data } = useQuery(GET_CATEGORIES);

    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

    return (
        <>
        {data.categories.map((category) => (
              <div id="category">{category.name}</div>
              ))}
        </>
    );
}
