import { gql } from "@apollo/client";

const GET_DEALS = gql`
  query getDeals {
    deals {
      id
      title
      description
      catergory
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
      catergory
      imageURL
    }
  }
`;

export { GET_DEALS, GET_DEAL };
