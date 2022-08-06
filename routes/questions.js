const User = require("../models/users");
const Destination = require("../models/destinations");
var express = require('express');
var router = express.Router();
const cors = require('cors');
router.use(cors());
var { v4: uuid } = require('uuid');
const Question = require("../models/questions");

// destination mapping shows which destination is best matched to a specific 
// question response and the associated score added to that destination
// to ultimately do the matching in the end

/**
 * @swagger
 *  tags:
 *    name: Questions
 *    description: question specific requests
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - id
 *         - question
 *         - destinationMapping
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a post
 *         question:
 *           type: string
 *           description: question asked
 *         destinationMapping:
 *           type: array
 *           description: the way each response to the question can be mapped to a destination recommendation
 *         questionImage:
 *           type: string
 *           description: a url to an image associated with the given question
 *       example:
 *         id: 1
 *         question: who am I
 *         destination_mapping: [{ "response": 1, "destination": 12, "weighting": 4 }, { "response": 2, "destination": 6, "weighting": 6 }, { "response": 3, "destination": 4, "weighting": 8 }, { "response": 4, "destination": 9, "weighting": 5 }]
 *         questionImage: https://images.unsplash.com/photo-1566740013712-556707c2aada?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80
 */

/**
* @swagger
* /questions:
*   get:
*     summary: Returns complete question listing
*     tags: [Questions]
*     responses:
*       200:
*         description: the list of all Questions
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Question'
*/
router.get('/', function (req, res, next) {
    // res.send(questions);
    Question.find().then((result) => {
        res.status(200).send(result);
    })
});

/**
* @swagger
* /questions/{id}:
*   get:
*     summary: Returns specified question according to provided id
*     tags: [Questions]
*     responses:
*       200:
*         description: a single question based on a given id
*         content:
*           application/json:
*             schema:
*               type: object
*               items:
*                 $ref: '#/components/schemas/Question'
*       404: 
*           description: question not found
*     parameters:
*     - in: path
*       name: id
*       description: questions's id 
*       required: true
*       type: string
*       example: 62eedab8074703dd579206c4
*/
router.get('/:id', function (req, res, next) {
    const questionId = req.params.id;
    Question.findById(questionId).then((result) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send();
        }
    });
});

function switchHelper(question, destinationsScore, d1, d2, d3, d4, s1, s2, s3, s4) {
    ;
    switch (parseInt(question)) {
        case 1:
            destinationsScore[d1 - 1] += s1;
            break;
        case 2:
            destinationsScore[d2 - 1] += s2;
            break;
        case 3:
            destinationsScore[d3 - 1] += s3;
            break;
        case 4:
            destinationsScore[d4 - 1] += s4;
            break;
    }
    return destinationsScore;
}
/**
* @swagger
* /questions/recommendation:
*   patch:
*     summary: provide a destination recommendation based on a series of question answers
*     tags: [Questions]
*     requestBody:
*       description: the user ID and responses to the 8 multiple choice questionnaire required for a recommendation
*       content:
*           application/json:
*               schema:
*                   type: object
*                   required:
*                   - id
*                   - "What type of traveller are you?"
*                   - "Who are you travelling with?"
*                   - "How long do you want to travel for?"
*                   - "Which activity do you like most?"
*                   - "Which food are you most likely to try?"
*                   - "What type of footwear defines you?"
*                   - "What's your favourite aspect of a holiday?"
*                   - "Which three words best describe your ideal vacation?"
*                   properties:
*                   id:
*                       type: string
*                   "What type of traveller are you?":
*                       type: object
*                   "Who are you travelling with?":
*                       type: object
*                   "How long do you want to travel for?":
*                       type: object
*                   "Which activity do you like most?":
*                       type: object
*                   "Which food are you most likely to try?":
*                       type: object
*                   "What type of footwear defines you?":
*                       type: object
*                   "What's your favourite aspect of a holiday?":
*                       type: object
*                   "Which three words best describe your ideal vacation?":
*                       type: object
*               example:
*                   id: 62eedab8074703dd57920672
*                   "What type of traveller are you?": { response: "I like to go with the flow", responseNumber: "1" }
*                   "Who are you travelling with?": { response: "Friends", responseNumber: "2" }
*                   "How long do you want to travel for?": { response: "Two weeks", responseNumber: "3" }
*                   "Which activity do you like most?": { response: "Sunbathe on the beach", responseNumber: "4" }
*                   "Which food are you most likely to try?": { response: "Anything sweet", responseNumber: "1" }
*                   "What type of footwear defines you?": { response: "Leather dress shoes", responseNumber: "2" }
*                   "What's your favourite aspect of a holiday?": { response: "Exploring nature", responseNumber: "3"}
*                   "Which three words best describe your ideal vacation?": { response: "Educational, cultural and amusing", responseNumber: "4"}
*     responses:
*       201:
*         description: provides a recommendation (returns id of destination)
*         content:
*           application/json:
*             schema:
*               type: object
*               items:
*                 $ref: '#/components/schemas/Destination'
*       400:
*           description: recommendation could not be provided
*       404:
*           description: user could not be found 
*/
// provide a destination recommendation based on a series of question answers
router.patch('/recommendation', function (req, res, next) {
    const userId = req.body.id;
    User.findById(userId).then((user) => {
        let userDests = user.destinations;

        let destinationsScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        destinationsScore = switchHelper(req.body["What type of traveller are you?"].responseNumber, destinationsScore, 12, 9, 8, 2, 4, 6, 8, 5);
        destinationsScore = switchHelper(req.body["Who are you travelling with?"].responseNumber, destinationsScore, 1, 4, 9, 3, 6, 9, 7, 4);
        destinationsScore = switchHelper(req.body["How long do you want to travel for?"].responseNumber, destinationsScore, 8, 6, 13, 14, 3, 6, 8, 7);
        destinationsScore = switchHelper(req.body["Which activity do you like most?"].responseNumber, destinationsScore, 2, 11, 6, 8, 5, 8, 4, 8);
        destinationsScore = switchHelper(req.body["Which food are you most likely to try?"].responseNumber, destinationsScore, 2, 3, 6, 12, 6, 6, 8, 5);
        destinationsScore = switchHelper(req.body["What type of footwear defines you?"].responseNumber, destinationsScore, 4, 12, 10, 8, 6, 9, 7, 5);
        destinationsScore = switchHelper(req.body["What's your favourite aspect of a holiday?"].responseNumber, destinationsScore, 13, 9, 1, 8, 6, 6, 8, 5);
        destinationsScore = switchHelper(req.body["Which three words best describe your ideal vacation?"].responseNumber, destinationsScore, 12, 6, 4, 9, 4, 6, 8, 5);

        let maxVal = 0;
        let maxIndex = 0;
        for (let i = 0; i < destinationsScore.length; i++) {
            if (maxVal < destinationsScore[i] && !userDests.includes(i + 1)) {
                maxVal = destinationsScore[i];
                maxIndex = i;
            }
        }
        maxIndex = maxIndex + 1;
        userDests.push(maxIndex);
        const set = new Set(userDests);
        userDests = [...set];

        const updatedInfo = {
            "destinations": userDests
        };
        User.findByIdAndUpdate(userId, updatedInfo).then(() => {
            Destination.find({ destinationId: maxIndex }).then((recommendedDestination) => {
                return res
                    .status(201)
                    .send(recommendedDestination[0]);
            }).catch((err) => {
                res.status(400).send(err);
            });
        }).catch((err) => {
            res.status(400).send(err);
        });
    }).catch((err) => {
        res.status(404).send(err);
    });
});

module.exports.router = router;
