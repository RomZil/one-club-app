import { gql, useQuery } from '@apollo/client';
import { GET_USERS } from '../queries/userQueries';

export default function Users() {
    const { loading, error, data } = useQuery(GET_USERS)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong</p>;

    return <>{!loading && !error && <h1>Users</h1>}</>;
}

