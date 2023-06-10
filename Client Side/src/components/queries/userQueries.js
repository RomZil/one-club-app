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
  query GetUser {
    getUser {
      name
      email
      password
      loyaltyCardId {
        id
        name
      }
    }
  }
`;

export { GET_USERS, GET_USER };
