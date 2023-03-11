//const { loyaltyCards, deals, users } = require('../sampleData.js')

const LoyaltyCard = require('../models/loyalCard_mode');
const User = require('../models/user_mode');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// loyaltyCard type
const LoyaltyCardType = new GraphQLObjectType({
    name: 'LoyaltyCard',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        deals: { type: GraphQLString }
    })
})

// deal type
/*const DealType = new GraphQLObjectType({
    name: 'Deal',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        location: { type: GraphQLString },

    })
})*/

// user type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        tokens: { type: GraphQLString },
        loyaltyCards: { type: GraphQLString },
        loyaltyCard: {
            type: LoyaltyCardType,
            resolve(parent, args) {
                return LoyaltyCard.find((loyaltyCard) => loyaltyCard.name === parent.loyaltyCards);
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        loyaltyCards: {
            type: new GraphQLList(LoyaltyCardType),
            resolve(parent, args) {
                return LoyaltyCard.find();
            }
        },
        loyaltyCard: {
            type: LoyaltyCardType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return LoyaltyCard.findById(args.id);
            },
        },
        /*  deals: {
              type: new GraphQLList(DealType),
              resolve(parent, args) {
                  return deals;
              }
          },
          deal: {
              type: DealType,
              args: { id: { type: GraphQLID } },
              resolve(parent, args) {
                  return deals.find((deal) => deal.id === args.id);
              }
          },*/
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find();
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        }
    }
});
/*
//Mutations

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
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
    mutation
})