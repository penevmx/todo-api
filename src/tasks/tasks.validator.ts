import { body } from 'express-validator'
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';



export const createValidator = [
    body('title')
        .not()
        .isEmpty()
        .withMessage('the task title mandatory')
        .trim()
        .isString()
        .withMessage('title should be in text format'),
    body('date')
        .not()
        .isEmpty()
        .withMessage('the date needs to be a valid date format'),
    body('description')
        .trim()
        .isString()
        .withMessage('description should be in text format'),
    body('priority')
        .trim()
        .isIn([Priority.high, Priority.normal, Priority.low])
        .withMessage('priority can be only normal, high or low'),
    body('status')
        .trim()
        .isIn([Status.todo, Status.inProgress, Status.completed])
        .withMessage('status can be only todo, inProgress or completed')
];

export const updateValidator = [
    body('id')
        .not()
        .isEmpty()
        .withMessage('the task id is mandatory')
        .trim()
        .isString()
        .withMessage('id needs to be a valid uuid format'),
    body('status')
        .trim()
        .isIn([Status.todo, Status.inProgress, Status.completed])
        .withMessage('status can be only todo, inProgress or completed')

];