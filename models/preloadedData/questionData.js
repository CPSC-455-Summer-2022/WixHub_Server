const questionData = [
    {
        "question": "What type of traveller are you?",
        "questionImage": "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=564&q=80",
        "destinationMapping": [
            { "response": "I like to go with the flow", "responseNumber": 1, "destination": 12, "weighting": 4 },
            { "response": "I plan everything", "responseNumber": 2, "destination": 9, "weighting": 6 },
            { "response": "I just want to relax", "responseNumber": 3, "destination": 8, "weighting": 8 },
            { "response": "I want to do everything", "responseNumber": 4, "destination": 2, "weighting": 5 },
        ]
    },
    {
        "question": "Who are you travelling with?",
        "questionImage": "https://images.unsplash.com/photo-1566740013712-556707c2aada?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "destinationMapping": [
            { "response": "The family", "responseNumber": 1, "destination": 1, "weighting": 6 },
            { "response": "Friends", "responseNumber": 2, "destination": 7, "weighting": 9 },
            { "response": "Signicant Other", "responseNumber": 3, "destination": 9, "weighting": 7 },
            { "response": "Solo", "responseNumber": 4, "destination": 3, "weighting": 4 },
        ]
    },
    {
        "question": "How long do you want to travel for?",
        "questionImage": "https://images.unsplash.com/photo-1435527173128-983b87201f4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80",
        "destinationMapping": [
            { "response": "A weekend", "responseNumber": 1, "destination": 12, "weighting": 5 },
            { "response": "A week", "responseNumber": 2, "destination": 6, "weighting": 6 },
            { "response": "Two weeks", "responseNumber": 3, "destination": 13, "weighting": 8 },
            { "response": "A month", "responseNumber": 4, "destination": 14, "weighting": 7 },
        ]
    },
    {
        "question": "Which activity do you like most?",
        "questionImage": "https://images.unsplash.com/photo-1621886292650-520f76c747d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        "destinationMapping": [
            { "response": "Visit museums", "responseNumber": 1, "destination": 2, "weighting": 5 },
            { "response": "Explore Ancient Relics", "responseNumber": 2, "destination": 11, "weighting": 8 },
            { "response": "Hike through mountains", "responseNumber": 3, "destination": 6, "weighting": 4 },
            { "response": "Sunbathe on the beach", "responseNumber": 4, "destination": 8, "weighting": 8 },
        ]
    },
    {
        "question": "Which food are you most likely to try?",
        "questionImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "destinationMapping": [
            { "response": "Anything sweet", "responseNumber": 1, "destination": 2, "weighting": 6 },
            { "response": "Nothing too spicy", "responseNumber": 2, "destination": 3, "weighting": 6 },
            { "response": "Anything!", "responseNumber": 3, "destination": 6, "weighting": 8 },
            { "response": "You're very picky", "responseNumber": 4, "destination": 12, "weighting": 5 },
        ]
    },
    {
        "question": "What type of footwear defines you?",
        "questionImage": "https://images.unsplash.com/photo-1528669697102-a6edb9b6a282?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
        "destinationMapping": [
            { "response": "Hiking boots", "responseNumber": 1, "destination": 7, "weighting": 6 },
            { "response": "Leather dress shoes", "responseNumber": 2, "destination": 12, "weighting": 9 },
            { "response": "Runners", "responseNumber": 3, "destination": 10, "weighting": 7 },
            { "response": "Sandals", "responseNumber": 4, "destination": 8, "weighting": 5 },
        ]
    },
    {
        "question": "What's your favourite aspect of a holiday?",
        "questionImage": "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "destinationMapping": [
            { "response": "Immersing in different cultures", "responseNumber": 1, "destination": 13, "weighting": 6 },
            { "response": "Delving into the history of a place", "responseNumber": 2, "destination": 9, "weighting": 6 },
            { "response": "Exploring nature", "responseNumber": 3, "destination": 1, "weighting": 8 },
            { "response": "Interacting with locals", "responseNumber": 4, "destination": 8, "weighting": 5 },
        ]
    },
    {
        "question": "Which three words best describe your ideal vacation?",
        "questionImage": "https://images.unsplash.com/photo-1512552288940-3a300922a275?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        "destinationMapping": [
            { "response": "Exotic, surprising and serene", "responseNumber": 1, "destination": 12, "weighting": 4 },
            { "response": "Adventurous, fun and undiscovered", "responseNumber": 2, "destination": 6, "weighting": 6 },
            { "response": "Luxurious slow paced and beautiful", "responseNumber": 3, "destination": 4, "weighting": 8 },
            { "response": "Educational, cultural and amusing", "responseNumber": 4, "destination": 9, "weighting": 5 },
        ]
    },
];

module.exports = questionData;