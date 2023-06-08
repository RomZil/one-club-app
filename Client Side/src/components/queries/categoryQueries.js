import { gql } from '@apollo/client';

const GET_CATEGORIES = gql`
  query getCategories {
    categories {
        id
        name
        aliases
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