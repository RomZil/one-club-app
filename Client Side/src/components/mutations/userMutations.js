import { gql } from "@apollo/client";

const UPDATE_USER = gql`
  mutation UpdateUserFields($name: String, $email: String, $password: String) {
    updateUserFields(
      userUpdateInput: { name: $name, email: $email, password: $password }
    ) {
      name
      email
      password
    }
  }
`;

const UPDATE_USER_LOYALTY_CARD = gql`
  mutation updateUserLoyaltyCards($cards: [UserUpdateLoyaltyCards]) {
    updateUserLoyaltyCards(cards: $cards) {
      name
    }
  }
`;

const INCREASE_POPULAR_CATEGORY = gql`
  mutation IncreasePopularCategory($categoryID: ID!) {
    increasePopularCategory(categoryID: $id)
  }
`;
const INCREASE_POPULAR_DEAL = gql`
  mutation IncreasePopularDeal($dealID: ID!) {
    increasePopularDeal(dealID: $id)
  }
`;

export {
  UPDATE_USER,
  UPDATE_USER_LOYALTY_CARD,
  INCREASE_POPULAR_CATEGORY,
  INCREASE_POPULAR_DEAL,
};
