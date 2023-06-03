import { gql } from '@apollo/client';

const GET_DEALS = gql`
  query getDeals {
    deals {
        id
        title
        description
    }
  }
`;

const GET_DEAL = gql`
  query getDeal($id: ID!) {
    deal(id: $id) {
        id
        title
        description
      }
    }
  }
`;

export { GET_DEALS, GET_DEAL };