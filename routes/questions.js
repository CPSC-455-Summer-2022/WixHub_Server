const User = require("../models/users");
const Destination = require("../models/destinations");
var express = require('express');
var router = express.Router();
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
 *           description: last name of usert
 *       example:
 *         id: 1
 *         question: "who am I"
 *         destination_mapping: [{ "response": 1, "destination": 12, "weighting": 4 }, { "response": 2, "destination": 6, "weighting": 6 }, { "response": 3, "destination": 4, "weighting": 8 }, { "response": 4, "destination": 9, "weighting": 5 }]
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
*       example: 62eac685b3af24e5f1d0cca4
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
*                   - question1
*                   - question2
*                   - question3
*                   - question4
*                   - question5
*                   - question6
*                   - question7
*                   - question8
*                   properties:
*                   id:
*                       type: string
*                   question1:
*                       type: string
*                   question2:
*                       type: string
*                   question3:
*                       type: string
*                   question4:
*                       type: string
*                   question5:
*                       type: string
*                   question6:
*                       type: string
*                   question7:
*                       type: string
*                   question8:
*                       type: string
*               example:
*                   id: 62eac685b3af24e5f1d0cc48
*                   questions1: 1
*                   questions2: 2
*                   questions3: 3
*                   questions4: 4
*                   questions5: 1
*                   questions6: 2
*                   questions7: 3
*                   questions8: 4
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
        destinationsScore = switchHelper(req.body.question1, destinationsScore, 12, 9, 8, 2, 4, 6, 8, 5);
        destinationsScore = switchHelper(req.body.question2, destinationsScore, 1, 4, 9, 3, 6, 9, 7, 4);
        destinationsScore = switchHelper(req.body.question3, destinationsScore, 8, 6, 13, 14, 3, 6, 8, 7);
        destinationsScore = switchHelper(req.body.question4, destinationsScore, 2, 11, 6, 8, 5, 8, 4, 8);
        destinationsScore = switchHelper(req.body.question5, destinationsScore, 2, 3, 6, 12, 6, 6, 8, 5);
        destinationsScore = switchHelper(req.body.question6, destinationsScore, 4, 12, 10, 8, 6, 9, 7, 5);
        destinationsScore = switchHelper(req.body.question7, destinationsScore, 13, 9, 1, 8, 6, 6, 8, 5);
        destinationsScore = switchHelper(req.body.question8, destinationsScore, 12, 6, 4, 9, 4, 6, 8, 5);


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

module.exports = router;
