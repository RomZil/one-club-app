const LoyaltyCard = require('../models/loyaltyCard_model');
const User = require('../models/user_model');
const Deal = require('../models/deal_model');
const Category = require('../models/category_model');


const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull } = require("graphql");

// loyaltyCard type
const LoyaltyCardType = new GraphQLObjectType({
  name: "LoyaltyCard",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    deal: {
      type: DealType,
      resolve(parent, args) {
        return Deal.findById(parent.dealId);
      },
    },
  }),
});

// deal type
const DealType = new GraphQLObjectType({
  name: "Deal",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return Category.findById(parent.category);
      },
    },
  }),
});

// user type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    tokens: { type: GraphQLString },
    // loyaltyCards: { type: GraphQLString },
    loyaltyCard: {
      type: LoyaltyCardType,
      resolve(parent, args) {
        return LoyaltyCard.findById(parent.loyaltyCardId);
      },
    },
  }),
});

// category type
const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    aliases: { type: new GraphQLList(GraphQLString) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    loyaltyCards: {
      type: new GraphQLList(LoyaltyCardType),
      resolve(parent, args) {
        return LoyaltyCard.find();
      },
    },
    loyaltyCard: {
      type: LoyaltyCardType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return LoyaltyCard.findById(args.id);
      },
    },
    deals: {
      type: new GraphQLList(DealType),
      resolve(parent, args) {
        return Deal.find();
      },
    },
    deal: {
      type: DealType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Deal.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find();
      },
    },
    category: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Category.findById(args.id);
      },
    },
  },
});

//Mutations

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a user
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        loyaltyCardId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
          loyaltyCardId: args.loyaltyCardId,
        });

        return user.save();
      },
    },
    // Delete a user
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return User.findByIdAndRemove(args.id);
      },
    },

    // Update a user
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        loyaltyCardId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
              password: args.password,
              loyaltyCardId: args.loyaltyCardId,
            },
          },
          { new: true }
        );
      },
    },
  },
});


/*
        addLoyaltyCard: {
            type: LoyaltyCardType,
            args: {
                name: { type: GraphQLString },
                deals: { type: GraphQLString },
            },
            resolve(parent, args) {
                const loyaltyCard = new LoyaltyCard({
                    name: args.name,
                    deals: args.deals,
                });

                return loyaltyCard.save();
            }
        }
    }
})*/


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
