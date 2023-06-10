import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!, $loyaltyCardID: ID!) {
    addUser(name: $name, email: $email, password: $password, loyaltyCardId: $loyaltyCardId) {
      id
      name
      email
      password
      loyaltyCard
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
      password
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUserFields($name: String!, $email: String!, $password: String) {
    updateUserFields(userUpdateInput: { name: $name, email: $email, password: $password }) {
      name
      email
      password
    }
  }
`;

export { DELETE_USER, ADD_USER, UPDATE_USER };
