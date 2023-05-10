// loyaltyCards
const loyaltyCards = [
    {
        id: '1',
        name: 'Hever',
        deals: 'Aroma 10% discount'

    },
    {
        id: '2',
        name: 'Max',
        deals: 'cofee 10% discount'
    },
];

// deals
const deals = [
    {
        id: '1',
        name: 'Aroma 10% discount',
        description: '10% discount',
        location: 'Tel aviv',
    },
    {
        id: '2',
        name: 'cofee 10% discount',
        description: '10% discount',
        location: 'Tel aviv',
    },
    {
        id: '3',
        name: 'Aroma 10% discount',
        description: '10% discount',
        location: 'Rishon Lezion',
    },
    {
        id: '4',
        name: 'KFC 15% discount',
        description: '15% discount',
        location: 'Raanana',
    },
]

// users
const users = [
    {
        id: '1',
        name: 'Tony Stark',
        email: 'ironman@gmail.com',
        password: '123',
        //token: ff,
        loyaltyCards: 'Max',
    },
    {
        id: '2',
        name: 'john',
        email: 'ironman@gmail.com',
        password: '123',
        //token: ff,
        loyaltyCards: 'Hever',
    },
    {
        id: '3',
        name: 'Tony Stark',
        email: 'ironman@gmail.com',
        password: '123',
        //token: ff,
        loyaltyCards: 'Hever',
    },
];

module.exports = { loyaltyCards, users, deals };