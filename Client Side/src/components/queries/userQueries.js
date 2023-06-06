import {gql} from '@apollo/client';

const GET_USERS = gql`
query getUsers {
    users{
        id
        name
        email
        password
        loyaltyCards
      }
}
`;

const GET_USER = gql`
  query getUser($email: EMAIL!) {
    deal(email: $email) {
      users{
        id
        name
        email
        password
        loyaltyCards
      }
      }
    }
`;

export {GET_USERS};