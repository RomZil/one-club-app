import { gql } from "@apollo/client";

//is it ?

const GET_DEALS = gql`
  query GetDeals {
    getDeals {
      title
      description
      category {
        name
      }
      imageURL
    }
  }
`;

const GET_DEAL = gql`
  query getDeal($id: ID!) {
    deal(id: $id) {
      id
      title
      description
      category {
        id
        name
        aliases
      }
      imageURL
    }
  }
`;

export { GET_DEALS, GET_DEAL };
