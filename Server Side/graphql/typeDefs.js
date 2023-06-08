const { gql } = require("@apollo/server");

module.exports = `#graphql
  type Deal {
    title: String!
    description: String
    imageURL: String
    catrgory: Category!
    loyaltyCardId: LoyaltyCard
  }
  type LoyaltyCard {
    name: String!
  }
  type Category {
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
    getLoyaltyCards: [LoyaltyCard]
  }

  input DealInput {
    title: String!
    description: String
    imageURL: String
    catrgory: String!
  }
  type Mutation {
    createDeal(dealInput: DealInput): Deal!
    deleteDeal(ID: ID!): Boolean
  }
`;
