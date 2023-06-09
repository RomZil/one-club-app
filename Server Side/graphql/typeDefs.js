const { gql } = require("@apollo/server");

module.exports = `#graphql
  type Deal {
    title: String!
    description: String
    imageURL: String
    category: Category!
    loyaltyCardId: LoyaltyCard
  }
  type LoyaltyCard {
    id:ID!
    name: String!
  }
  type Category {
    id:ID!
    name: String!
  }
  type User {
    name: String!
    email: String!
    password: String!
    tokens: [String]
    loyaltyCardId: [LoyaltyCard]
  }

  type Query {
    getUser: User!
    getDeals(amount: Int): [Deal]
    getLoyaltyCards: [LoyaltyCard]
    getLoyaltyCardByUser: [LoyaltyCard]
    getDealsByUser: [Deal]
    getDealsByCategory(category: ID!): [Deal]
    getCategories:[Category]
    getCategoriesByUser:[Category]
  }

  input DealInput {
    title: String!
    description: String
    imageURL: String
    category: String!
  }

  input UserUpdateInput {
    name: String!
    email: String!
    password: String!
  }
  input UserUpdateLoyaltyCards {
    id:ID!
  }
  type Mutation {
    createDeal(dealInput: DealInput): Deal!
    deleteDeal(ID: ID!): Boolean
    updateUserFields(userUpdateInput: UserUpdateInput): User
    updateUserLoyaltyCards(loyaltyCards: [UserUpdateLoyaltyCards]): User
  }
`;
