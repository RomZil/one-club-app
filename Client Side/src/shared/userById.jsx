import { Link, useParams } from 'react-router-dom'; 
import { useQuery } from '@apollo/client';
import { GET_USER } from '../components/queries/userQueries';
import Spinner from '../components/spinner/spinner';

export default function User() {
    const { loading, error, data } = useQuery(GET_USER, {
          variables: {
            // existing specialId for testing purposes, to be replaced with match.params.userId
            id: "647e3080221bb9a4e3ec8f34",
          },
      });
  
    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

    return (
        <>
         <h1>{data.user.name}</h1>
         <p>{data.user.id}</p>
         <p>{data.user.email}</p>
         <p>{data.user.loyaltyCard}</p>
        </>
    )
}
