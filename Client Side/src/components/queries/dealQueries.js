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

const GET_DEAL_BY_CATEGORY_AND_USER = gql`
  query GetDealsByCategoryAndUser($categoryID: ID!) {
    getDealsByCategoryAndUser(categoryID: $categoryID) {
      id
      title
      description
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
      category {
        id
        name
      }
      loyaltyCardId {
        id
        name
      }
    }
  }
`;
const GET_DEAL_BY_USER = gql`
  query GetDealsByUser {
    getDealsByUser {
      id
      title
      description
      imageURL
    }
  }
`;

const GET_POP_DEALS = gql`
query GetPopularDeals {
  getPopularDeals {
    description
    id
    imageURL
    title
    category {
      id
      name
    }
  }
}
`;



export {
  GET_DEALS,
  GET_DEAL_BY_ID,
  GET_DEAL_BY_CATEGORY_AND_USER,
  GET_DEAL_BY_USER,
  GET_POP_DEALS
};
