const { gql } = require("@apollo/server");

module.exports = `#graphql
  type Deal {
    id:ID!
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

  type PopularCategories {
    name: String!
    count: Int!
  }

  type PopularDeals {
    name: String!
    count: Int!
  }

  type Query {
    getUser: User!
    getDealbyID(id: ID!): Deal!
    getDeals(amount: Int): [Deal]
    getLoyaltyCards: [LoyaltyCard]
    getLoyaltyCardByUser: [LoyaltyCard]
    getDealsByUser: [Deal]
    getDealsByCategory(categoryID: ID!): [Deal]
    getCategories:[Category]
    getCategoriesByUser:[Category]
    getDealsByCategoryAndUser(categoryID:ID!): [Deal]
    getPopularCategories: [Category]
    getPopularDeals: [Deal]
  }

  input DealInput {
    title: String!
    description: String
    imageURL: String
    category: String!
  }

  input UserUpdateInput {
    name: String
    email: String
    password: String
  }
  input UserUpdateLoyaltyCards {
    id: ID
  }

  type Mutation {
    createDeal(dealInput: DealInput): Deal!
    deleteDeal(ID: ID!): Boolean
    updateUserFields(userUpdateInput: UserUpdateInput): User
    updateUserLoyaltyCards(cards: [UserUpdateLoyaltyCards]): User
    increasePopularCategory(categoryID:ID!) : Boolean
    increasePopularDeal(dealID:ID!) : Boolean
  }
`;
