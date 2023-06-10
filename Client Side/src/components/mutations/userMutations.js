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
  mutation UpdateUserLoyaltyCards {
    updateUserLoyaltyCards {
      loyaltyCardId {
        id
        name
      }
    }
  }
`;

export { UPDATE_USER_LOYALTY_CARD, UPDATE_USER };
