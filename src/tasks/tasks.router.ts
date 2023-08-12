import { Router } from "express";
import { taskController } from "./tasks.controler";
import { createValidator, updateValidator } from "./tasks.validator";

//fire the router function

export const taskRouter: Router = Router();


// Create a default route.
taskRouter.get(
    '/tasks',
    taskController.getAll);

taskRouter.post(
    '/tasks',
    createValidator,
    taskController.create
)

taskRouter.put(
    '/tasks',
    updateValidator,
    taskController.update
)