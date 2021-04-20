import { Router } from 'express';
import { User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger/swagger.json';

const router = Router();

let users: User[] = [
    { id: uuidv4(), login: "h11111", password: "h1", age: 28, isDeleted: false },
    { id: uuidv4(), login: "h22222", password: "h2", age: 8, isDeleted: false },
    { id: uuidv4(), login: "h33333", password: "h3", age: 33, isDeleted: false },
];

const schema = Joi.object().keys({
    id: Joi.string(),
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    age: Joi.number().min(1).max(99).required(),
    isDeleted: Joi.boolean()
})

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
};

router.get('/users', (req, res, next) => {
    res.status(200).json({ users: users });
})

router.post('/users', (req, res, next) => {

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        return res.status(400).json({
            message: 'Wrong input',
            error: `${error.details.map(x => x.message).join(', ')}`
        })
    } else {
        const user: User = {
            id: uuidv4(),
            login: req.body.login,
            password: req.body.password,
            age: req.body.age,
            isDeleted: false
        }
        users.push(user);
        res.status(201).json({ message: 'Created new user!', users: users })
    }

    const user: User = {
        id: uuidv4(),
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: false
    }
    users.push(user);
    res.status(201).json({ message: 'Created new user!', users: users })
})

router.get('/users/:id', (req, res, next) => {
    const userId = req.params.id;
    const user = users.find((user) => user.id === userId);
    if (user) {
        return res.status(200).json({ user: user });
    }
    res.status(404).json({ message: 'User not found!' })
})

router.put('/users/:id', (req, res, next) => {

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        return res.status(400).json({
            message: 'Wrong input',
            error: `${error.details.map(x => x.message).join(', ')}`
        })
    } else {
        const userId = req.params.id;
        const userIndex = users.findIndex((user) => user.id === userId);

        if (userIndex >= 0) {
            users[userIndex] = { id: users[userIndex].id, login: req.body.login, password: req.body.password, age: req.body.age, isDeleted: false }
            return res.status(200).json({ message: 'Updated the user!', users: users })
        }
        res.status(404).json({ message: 'Could not find user for this user id' })
    }
})

router.delete('/users/:id', (req, res, next) => {
    const userId = req.params.id;
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex >= 0) {
        users[userIndex].isDeleted = true;
        return res.status(200).json({ message: 'Removed the user!', users: users })
    }
    res.status(404).json({ message: 'Could not find user for this user id' })
})

router.use('/api-docs', swaggerUi.serve);

router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default router;
