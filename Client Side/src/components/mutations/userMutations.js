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

export { UPDATE_USER };
