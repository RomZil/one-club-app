import { gql } from "@apollo/client";

const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      name
    }
  }
`;

const GET_CATEGORY = gql`
  query getCategory($id: ID!) {
    category(id: $id) {
      id
      name
      aliases
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
export { GET_CATEGORIES, GET_CATEGORY , GET_CATEGORIES_BY_USER };
