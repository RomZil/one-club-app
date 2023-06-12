import { gql } from "@apollo/client";

const UPDATE_USER = gql`
  mutation UpdateUserFields($name: String, $email: String, $password: String) {
    updateUserFields(userUpdateInput: { name: $name, email: $email, password: $password }) {
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

export { UPDATE_USER, UPDATE_USER_LOYALTY_CARD };
