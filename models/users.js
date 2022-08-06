const mongoose = require("mongoose");

// Schema constructor
const Schema = mongoose.Schema;

const userIndQuestionResponseSchema = new Schema({
    response: {
        type: String,
        require: true
    },
    responseNumber: {
        type: String,
        require: true
    }
},
    { _id: false }
);

const userResponseSchema = new Schema({
    "What type of traveller are you?": {
        type: userIndQuestionResponseSchema,
        require: true
    },
    "Who are you travelling with?": {
        type: userIndQuestionResponseSchema,
        require: true
    },
    "How long do you want to travel for?": {
        type: userIndQuestionResponseSchema,
        require: true
    },
    "Which activity do you like most?": {
        type: userIndQuestionResponseSchema,
        require: true
    },
    "Which food are you most likely to try?": {
        type: userIndQuestionResponseSchema,
        require: true
    },
    "What type of footwear defines you?": {
        type: userIndQuestionResponseSchema,
        require: true
    },
    "What's your favourite aspect of a holiday?": {
        type: userIndQuestionResponseSchema,
        require: true
    },
    "Which three words best describe your ideal vacation?": {
        type: userIndQuestionResponseSchema,
        require: true
    },
},
    { _id: false });

// create user schema
const UserSchema = new Schema({
    f_name: {
        type: String,
        require: true
    },
    l_name: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    destinations: [
        {
            type: String
        }
    ],
    question_responses: {
        type: userResponseSchema,
        require: false
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true });

// create model
const User = mongoose.model('User', UserSchema);

module.exports = User;