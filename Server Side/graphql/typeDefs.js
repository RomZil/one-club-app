const { gql } = require("apollo-server");

module.exports = gql`
  type Deal {
    title: String!
    description: String
    imageURL: String
    catrgory: String!
  }
  type LoyaltyCard {
    name: String!
  }
  type User {
    email: String!
    password: String!
    tokens: [String]
    loyaltyCards: [LoyaltyCard]
  }

  type Query {
    user(ID: ID!): User
    getDeals(amount: Int): [Deal]
  }

  type Mutation {
    createDeal(dealInput: Deal): Deal!
    deleteDeal(ID: ID!): Boolean
  }
`;
