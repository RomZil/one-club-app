import { gql } from '@apollo/client';

const GET_LOYALTYCARDS = gql`
  query getLoyaltyCards {
    loyaltyCards {
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