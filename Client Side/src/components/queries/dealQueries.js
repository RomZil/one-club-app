import { gql } from "@apollo/client";

const GET_DEALS = gql`
  query GetDeals {
    getDeals {
      title
      description
      category {
        name
      }
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
    }
  }
`;

export { GET_DEALS, GET_DEAL };
