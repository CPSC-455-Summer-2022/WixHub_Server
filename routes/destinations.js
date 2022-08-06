var express = require('express');
var router = express.Router();
const cors = require('cors');
router.use(cors());
const Destination = require("../models/destinations");

/**
 * @swagger
 *  tags:
 *    name: Destinations
 *    description: destination specific requests
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Destination:
 *       type: object
 *       required:
 *         - id
 *         - city
 *         - country
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a post
 *         city:
 *           type: string
 *           description: the name of the city 
 *         country:
 *           type: string
 *           description: the name of the country
 *         description:
 *           type: string
 *           description: description of the destination
 *         image:
 *           type: string
 *           description: image corresponding to that destination
 *         activityRecommendations:
 *           type: array
 *           description: top 5 actvities for that destination
 *       example:
 *         id: 1
 *         city: Toronto
 *         country: Canada
 *         description: The capital of Ontario and home to the CN Tower + the Raptors
 *         image: https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80
 *         activityRecommendations: []
*/
/**
* @swagger
* /destinations:
*   get:
*     summary: Returns all destinations in db
*     tags: [Destinations]
*     responses:
*       200:
*         description: the list of all destinations
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Destination'
*/
router.get('/', function (req, res, next) {
    Destination.find().then((result) => {
        res.send(result);
    });

});

/**
* @swagger
* /destinations/{id}:
*   get:
*     summary: Returns specified destination according to provided id
*     tags: [Destinations]
*     parameters:
*     - in: path
*       name: id
*       description: destinations's id
*       required: true
*       type: string
*       example: 62eedab8074703dd57920679
*     responses:
*       200:
*         description: a single destination based on a given MongoDB id 
*         content:
*           application/json:
*             schema:
*               type: object
*               items:
*                 $ref: '#/components/schemas/Destination'
*       404:
*         description: destination could not be found 
*/
router.get("/:id", function (req, res, next) {
    const destinationId = req.params.id;
    Destination.findById(destinationId).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(404).send(err);
    });
});

/**
* @swagger
* /destinations/destinationID/{id}:
*   get:
*     summary: Returns specified destination according to provided destinationID 
*     tags: [Destinations]
*     parameters:
*     - in: path
*       name: id
*       description: destinations's id
*       required: true
*       type: string
*       example: 1
*     responses:
*       200:
*         description: a single destination based on a given destinationID (different from above because it's the id returned by recommendation engine)
*         content:
*           application/json:
*             schema:
*               type: object
*               items:
*                 $ref: '#/components/schemas/Destination'
*       404:
*         description: destination could not be found 
*/
router.get("/destinationID/:id", function (req, res, next) {
    const destinationId = req.params.id;
    Destination.find({ destinationId: destinationId }).then((result) => {
        res.status(200).send(result[0]);
    }).catch((err) => {
        res.status(404).send(err);
    });;
});



module.exports.router = router;