import { gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
      email
      password
      loyaltyCards
    }
  }
`;
const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      password
      loyaltyCards
    }
  }
`;

export { GET_USERS, GET_USER };
