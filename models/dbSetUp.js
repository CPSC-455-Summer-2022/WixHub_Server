const mongoose = require("mongoose");
const User = require("./users");
const Destination = require("./destinations");
const Question = require("./questions");
const { v4: uuid } = require("uuid");
const router = require("../routes");
const questionData = require("./preloadedData/questionData");
const destinationData = require("./preloadedData/destinationData");
const userData = require("./preloadedData/userData");

const dburl = "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.grgqp0e.mongodb.net/?retryWrites=true&w=majority";

const connectDb = async function () {
    await mongoose.connect(dburl);
    console.log("connected to Mongo db");
};

const dbSetUp = async function () {
    await connectDb();
    await initializeDb();
};

const initializeDb = async function () {
    if (await User.find().limit(1).count(true) <= 0) {
        console.log("Users initialized")
    } else {
        console.log("Initializing users...")
        await initializeUsers();
    }

    if (await Destination.find().limit(1).count(true) <= 0) {
        console.log("Destination initialized")
    } else {
        console.log("Initializing destination...")
        await initializeDestinations();
    }

    if (await Question.find().limit(1).count(true) <= 0) {
        console.log("Question initialized")
    } else {
        console.log("Initializing question...")
        await initializeQuestions();
    }
    console.log("db is initialized");
};

const initializeQuestions = async function () {
    await Question.collection.drop().catch((err) => { });
    await Question.insertMany(questionData);

}

const initializeDestinations = async function () {
    await Destination.collection.drop().catch((err) => { });
    await Destination.insertMany(destinationData);
};

const initializeUsers = async function () {
    await User.collection.drop().catch((err) => { });
    await User.insertMany(userData);
};

module.exports = dbSetUp;