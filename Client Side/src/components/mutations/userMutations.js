import { gql } from '@apollo/client';

const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $phone: String!) {
    addUser(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      password
      loyaltyCards
    }
  }
`;

const DELETE_USER = gql`
mutation deleteUser($id: ID!) {
    deleteUser(id: $id){
        id
        name
        email
        password
        loyaltyCards
    }
}
`;

export { DELETE_USER, ADD_USER };