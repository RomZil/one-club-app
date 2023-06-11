import { gql } from "@apollo/client";

//is it ?

const GET_DEALS = gql`
  query GetDeals {
    getDeals {
      title
      description
      id
      category {
        name
      }
      imageURL
    }
  }
`;

const GET_DEAL_BY_ID = gql`
  query GetDealbyID($id: ID!) {
    getDealbyID(id: $id) {
      title
      description
      imageURL
    }
  }
`;

export { GET_DEALS, GET_DEAL_BY_ID };
