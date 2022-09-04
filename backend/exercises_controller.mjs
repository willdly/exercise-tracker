import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';
import { check, validationResult } from 'express-validator'

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the name, reps, weight, unit and date provided in the body
 */
app.post('/exercises', [
    check('name').notEmpty(),
    check('reps').isInt({min:1}),
    check('weight').isInt({min:1}),
    check('unit').isIn(['kgs', 'lbs']),
    check('date').isDate({ format: 'MM-DD-YY', strictMode: false, delimiters: ['-']}),
],(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ Error: "Invalid request" });
    }
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
});

/**
 * Retrieve all exercises. 
 */
app.get('/exercises', (req, res) => {
    let filter = {}
    exercises.findExercise(filter)
        .then(exercises => {
            res.json(exercises)
        })
});

/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: "Not Found"});
            }
        })
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit and date to the values provided in the body.
 */
app.put('/exercises/:_id', [
    check('name').notEmpty(),
    check('reps').isInt({min:1}),
    check('weight').isInt({min:1}),
    check('unit').isIn(['kgs', 'lbs']),
    check('date').isDate({ format: 'MM-DD-YY', strictMode: false, delimiters: ['-']}),
],(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ Error: "Invalid request" });
    }
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date});
            } else {
                res.status(404).json({ Error: 'Not Found'});
            }
        })
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.deleteExerciseById(exerciseId)
        .then(deleteCount => {
            if (deleteCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Not Found' });
            }
        })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});