var platformData = {
        introduction: "",
        endMessage: "",
        sequential: true,
        editPanel:"left",
        nodes: [
            {
                title:"The Secret Cave ",
                subtitle: "Start your Mission",
                description: "Heavily guarded from all directions, the Amplayfied Fortress is rumored to be impregnable. Well, almost...",
                sequence: 0,
                decks: []
            },
            {
                title:"The Watchtower Keeper",
                subtitle: "Meet the Watchtower Keeper",
                description: "The Keeper is slightly off in the head. He will help you enter the Fortress if you can decipher what he is saying...",
                sequence: 1,
                decks: []
            },
            {
                title:"The Guest House",
                subtitle: "Overhear the conversations of the buyers to know where they intend to use the Amplayfier",
                description: "Configure the bugs set up by the lighthouse keeper to spy on the buyers. You need that knowledge to  pass unnoticed in the Amplayfied Fortress...",
                sequence: 2,
                decks: []
            },
            {
                title:"The Amplayfied Fortress",
                subtitle: "If you are prepared, steal the blueprints",
                description: "The Amplayfier Blueprints are hidden in one of the rooms in the Fortress. Enter the complex and find it.",
                sequence: 3,
                decks: []
            },
            {
                title:"Evacuation Point",
                subtitle: "Congratulations! You have the blueprints. Make it to the evacuation point and you are done.",
                description: "You have finished the game. Now collect the reward.",
                sequence: 4,
                decks: []
            }
        ]
    }

var wrapperDecks = [
    
];

var userdata = {
    name: "John Doe",
    profile: "Demo User",
    startpoints: "1000",
    image:'img/user.jpg',
    decks: [
        {
            deckId: 1,
            complete: false
        },
        {
            deckId: 2,
            complete: false
        },
        {
            deckId: 3,
            complete: false
        },
        {
            deckId: 4,
            complete: false
        },
        {
            deckId: 5,
            complete: false
        }
    ]
};

