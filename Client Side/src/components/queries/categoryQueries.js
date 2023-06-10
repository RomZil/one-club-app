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

export { GET_CATEGORIES, GET_CATEGORY };
