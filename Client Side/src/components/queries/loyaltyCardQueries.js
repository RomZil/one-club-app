import { gql } from '@apollo/client';

const GET_LOYALTYCARDS = gql`
  query getLoyaltyCards {
    getLoyaltyCards {
      id
      name
    }
  }
`;

const GET_LOYALTYCARD = gql`
  query getLoyaltyCard($id: ID!) {
    loyaltyCard(id: $id) {
      id
      name
      deal {
        id
        title
        description
      }
    }
  }
`;

export { GET_LOYALTYCARDS, GET_LOYALTYCARD };