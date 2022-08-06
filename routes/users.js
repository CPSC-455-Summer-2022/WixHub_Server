var { generateAccessToken } = require("../util/genToken");
var express = require('express');
var router = express.Router();
const cors = require('cors');
router.use(cors());
var { v4: uuid } = require('uuid');
const User = require("../models/users");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

/**
 * @swagger
 *  tags:
 *    name: Users
 *    description: user specific requests
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userId
 *         - rname
 *         - lname
 *         - country
 *         - destinations
 *         - question_responses
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a post
 *         rname:
 *           type: string
 *           description: first name of user
 *         lname:
 *           type: string
 *           description: last name of usert
 *         country:
 *           type: string
 *           descripton: country of user
 *         question_responses:
 *           type: object
 *           descripton: users question responeses
 *         email:
 *           type: string
 *           descripton: user's email (used to login)
 *         password:
 *           type: string
 *           descripton: user's password (used to login)
 *       example:
 *         _id: 1
 *         rname: josh
 *         lname: tillson
 *         country: canada
 *         question_responses: {"What type of traveller are you?": "1", "Who are you travelling with?": "2","How long do you want to travel for?": "2","Which activity do you like most?": "2","Which food are you most likely to try?": "1","What type of footwear defines you?": "2","What's your favourite aspect of a holiday?": "2","Which three words best describe your ideal vacation?": "4"}
 *         email: josh@tillson.com
 *         password: 1234password
 */

/**
* @swagger
* /users:
*   get:
*     summary: Returns all users
*     tags: [Users]
*     responses:
*       200:
*         description: the list of all Users
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
*/
router.get('/', function (req, res, next) {
  User.find().then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(404).send(err);
  });
});

/**
* @swagger
* /users/{id}:
*   get:
*     summary: Returns specified user according to provided id
*     tags: [Users]
*     responses:
*       200:
*         description: a single user based on a given id
*         content:
*           application/json:
*             schema:
*               type: object
*               items:
*                 $ref: '#/components/schemas/User'
*       404:
*         description: user not found
*     parameters:
*     - in: path
*       name: id
*       description: user's id
*       required: true
*       type: string
*       example: 62ec8e3dfccf63a08d402305
*/
router.get('/:id', function (req, res, next) {
  const userId = req.params.id;
  User.findById(userId).then((result, err) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(404).send(err);
  });
});

/**
* @swagger
* /users:
*   post:
*     summary: Adds a single user listing in JSON format to user database
*     tags: [Users]
*     responses:
*       201:
*         description: adds a new user to the db
*         content:
*           application/json:
*             schema:
*               type: object
*               items:
*                 $ref: '#/components/schemas/User'
*       400:
*         description: user could not be added
*     requestBody:
*       required: true
*       description: a new user to add to the user database upon sign up
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*             - f_name
*             - l_name
*             - country
*             properties:
*               f_name:
*                 description: user's first name
*                 type: string
*               l_name:
*                 description: user's last name
*                 type: string
*               country:
*                 description: user's country of residency
*                 type: string
*               question_responses:
*                 description: a user's question responses (please enter in array format)
*                 type: object
*           example:
*             f_name: Josh
*             l_name: Tillson
*             country: Canada
*             email: josh@test.com
*             password: 1234password
*/

router.post('/', function (req, res, next) {
  const user = {
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    country: req.body.country,
    email: req.body.email,
    password: req.body.password
  };
  User.create(user).then((result) => {
    res.status(201).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

// login user
router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;
  const foundUser = await User.find({ email: email });
  if (foundUser != null) {
    if (password == foundUser[0].password) {
      const token = generateAccessToken(email);
      res.json({
        foundUser,
        token: `Bearer ${token}`
      });
    } else res.sendStatus(402);
  } else res.sendStatus(403);
});


/**
* @swagger
* /users/{id}:
*   delete:
*     summary: delete specified user according to provided id
*     tags: [Users]
*     responses:
*       202:
*         description: a single user based on a given id
*         content:
*           application/json:
*             schema:
*               type: object
*               items:
*                 $ref: '#/components/schemas/User'
*       404:
*         description: user not found
*     parameters:
*     - in: path
*       name: id
*       description: user's id
*       required: true
*       type: string
*       example: 62ec8e3dfccf63a08d402305
*/
router.delete('/:id', function (req, res) {
  const userId = req.params.id;
  User.findByIdAndDelete(userId).then((result) => {
    res.status(202).send(result);
  }).catch((err) => {
    res.status(404).send(err);
  });;
});

router.delete('/', function (req, res) {
  User.deleteMany({}).then((result1) => {
    User.find().then((result2) => {
      res.status(203).send(result2);
    })
  }).catch((err) => {
    res.status(400).send(err);
  });;
});

/**
* @swagger
* /users/edit/{id}:
*   patch:
*     summary: Edits a single user listing in JSON format within user database
*     tags: [Users]
*     responses:
*       203:
*         description: the updated user
*         content:
*           application/json:
*             schema:
*               type: object
*               items:
*                 $ref: '#/components/schemas/User'
*       404:
*         description: user not found
*       400:
*         description: user could not be edited
*     parameters:
*     - in: path
*       name: id
*       description: user's id
*       required: true
*       type: string
*       example: 62ec8e3dfccf63a08d402305
*     requestBody:
*       required: true
*       description: the user information to be updated
*       content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                     f_name:
*                       description: user's first name
*                       type: string              
*                     l_name:
*                       description: user's last name
*                       type: string              
*                     country:
*                       description: user's country
*                       type: string              
*                     question_responses:
*                       description: user's question responses (please enter in array format)
*                       type: object 
*               example: 
*                 question_responses: {"What type of traveller are you?": "1", "Who are you travelling with?": "2","How long do you want to travel for?": "2","Which activity do you like most?": "2","Which food are you most likely to try?": "1","What type of footwear defines you?": "2","What's your favourite aspect of a holiday?": "2","Which three words best describe your ideal vacation?": "4"}            
*/

router.patch('/edit/:id', function (req, res) {
  const userId = req.params.id;
  const updatedInfo = req.body;
  User.findByIdAndUpdate(userId, updatedInfo).then(() => {
    User.findById(userId).then((result) => {
      res.status(203).send(result);
    }).catch((err) => {
      res.status(404).send(err);
    });
  }).catch((err) => {
    res.status(400).send(err);
  });
});

/**
* @swagger
* /users/deleteUserDestination/{id}:
*   patch:
*     summary: deletes a single recommended destination from a users destination list
*     tags: [Users]
*     responses:
*       203:
*         description: the updated user
*         content:
*           application/json:
*             schema:
*               type: object
*               items:
*                 $ref: '#/components/schemas/User'
*       404:
*         description: user not found
*       400:
*         description: user could not be edited
*     parameters:
*     - in: path
*       name: id
*       description: user's id
*       required: true
*       type: string
*       example: 62ec8e3dfccf63a08d402305
*     requestBody:
*       required: true
*       description: the user destination to be removed
*       content:
*           application/json:
*               schema:
*                   type: object
*                   required:
*                     - destinationToDelete
*                   properties:
*                     destinationToDelete:
*                       description: the destinationID for the destination to be deleted
*                       type: string
*               example: 
*                   destinationToDelete: 1        
*/
router.patch('/deleteUserDestination/:id', function (req, res) {
  const userId = req.params.id;
  const destinationToDelete = req.query.destinationToDelete;
  User.findById(userId).then((user) => {
    let userDests = user.destinations;
    let newUserDests = [];
    for (const dest of userDests) {
      if (dest !== destinationToDelete) {
        newUserDests.push(dest);
      }
    }
    const updatedInfo = { "destinations": newUserDests }
    User.findByIdAndUpdate(userId, updatedInfo).then(() => {
      User.findById(userId).then((result) => {
        res.status(203).send(result);
      }).catch((err) => {
        res.status(404).send(err);
      });
    }).catch((err) => {
      res.status(404).send(err);
    });
  }).catch((err) => {
    res.status(404).send(err);
  });
});

module.exports.router = router;