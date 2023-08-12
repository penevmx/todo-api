import { validationResult } from 'express-validator';
import { Task } from "./tasks.entity";
import { AppDataSource } from "../../index";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { UpdateResult } from 'typeorm';


class TaskController {

    public async getAll(
        req: Request,
        res: Response
    ): Promise<Response> {
        //declare variable to hold all tasks
        let allTasks: Task[];

        // fetch all tasks using the repo
        try {
            allTasks = await AppDataSource.getRepository(
                Task
            ).find({
                order: {
                    date: 'ASC'
                }
            })

            //convert the tasks instance to an array of objects
            allTasks = instanceToPlain(allTasks) as Task[]
            return res.json(allTasks).status(200)

        } catch (_error) {
            return res
                .json({ error: 'internal server error' })
                .status(500)
        }




    }


    public async create(
        req: Request,
        res: Response,
    ): Promise<Response> {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // create a new instance of the Task
        const newTask = new Task();

        //add the required properties to the task object
        newTask.title = req.body.title;
        newTask.date = req.body.date;
        newTask.description = req.body.description;
        newTask.priority = req.body.priority;
        newTask.status = req.body.status
        //add the new task to the database

        let createdTask: Task;

        try {
            createdTask = await AppDataSource.getRepository(Task).save(newTask)
            createdTask = instanceToPlain(createdTask) as Task;
            return res.json(createdTask).status(201)
        } catch (_error) {
            return res
                .json({ error: 'internal server error' })
                .status(500)
        }
    }


    //method for updating tasks
    public async update(
        req: Request,
        res: Response,
        // @ts-ignore
    ): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        //try to find if the task exist
        let task: Task | null;

        try {
            task = await AppDataSource.getRepository(
                Task // target
            ).findOne({
                where: { id: req.body.id }//options 
            })
        } catch (errors) {
            return res
                .json({ error: 'internal server error' })
                .status(500)
        }



        //return 400 if task is null
        if (!task) {
            return res.status(404).json({ error: 'the task with given ID does not exist' })
        }

        // declare a variable for updatedTask
        let updatedTask: UpdateResult;

        //update the task
        try {
            updatedTask = await AppDataSource.getRepository(Task).update(
                req.body.id,
                plainToInstance(Task, {
                    status: req.body.status
                })
            )

            updatedTask = instanceToPlain(updatedTask) as UpdateResult;
        } catch (errors) {
            return res
                .json({ error: 'internal server error' })
                .status(500)
        }
        //convert the

    }
}

export const taskController = new TaskController()