import { gql } from "@apollo/client";

const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      name
    }
  }
`;

const GET_DEAL_BY_CATEGORY = gql`
  query GetDealsByCategory($categoryID: ID!) {
    getDealsByCategory(categoryID: $categoryID) {
      title
      description
      imageURL
      id
    }
  }
`;

const GET_CATEGORIES_BY_USER = gql`
  query GetCategoriesByUser {
    getCategoriesByUser {
      id
      name
    }
  }
`;

const GET_POP_CATEGORIES = gql`
  query GetPopularCategories {
    getPopularCategories {
      id
      name
    }
  }
`;

export { GET_CATEGORIES, GET_CATEGORIES_BY_USER, GET_DEAL_BY_CATEGORY, GET_POP_CATEGORIES};
