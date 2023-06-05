import { gql } from '@apollo/client';

const GET_LOYALTYCARDS = gql`
  query getLoyaltyCards {
    loyaltyCards {
      id
      name
      deals
    }
  }
`;

const GET_LOYALTYCARD = gql`
  query getLoyaltyCard($id: ID!) {
    loyaltyCard(id: $id) {
      id
      name
      deals {
        id
        title
        description
      }
    }
  }
`;

export { GET_LOYALTYCARDS, GET_LOYALTYCARD };