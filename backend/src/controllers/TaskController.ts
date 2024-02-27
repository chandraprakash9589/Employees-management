import { Request, Response } from "express";
import Task from "../models/Task";
import User from "../models/User";
const taskController = {
  async createTask(req: any, res: Response) {
    try {
      const { date } = req.body;
      const userData = await User.findById(req.user._id);
      // Check if the user has already sent a task for the given date
      const existingTask = await Task.findOne({
        user: req.user._id,
        date: date,
      });

      if (existingTask) {
        return res.status(400).json({
          error: "A task for this date already exists.",
        });
      }

      const newTaskData = {
        ...req.body,
        user: req.user._id,
        userEmail: userData?.email,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
      };
      const task = await Task.create(newTaskData);
      res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({
        error:
          "An error occurred while creating the task. See server logs for details.",
      });
    }
  },

  async getAllTasks(req: any, res: Response) {
    try {
      const { page, perPage, completed, sortByDueDate, sortByCompleted } =
        req.query;

      const query =
        completed !== undefined
          ? {
              completed: completed === "true",
              $or: [
                { email: { $all: [req.user.email] } }, //select the all email based on user id to edit functionality
                { user: req.user._id },
              ],
            }
          : {
              $or: [
                { email: { $all: [req.user.email] } },
                { user: req.user._id },
              ],
            };

      const sortOptions: any = {};
      if (sortByDueDate) sortOptions.date = sortByDueDate === "asc" ? 1 : -1; //To display  order
      if (sortByCompleted)
        sortOptions.completed = sortByCompleted === "asc" ? 1 : -1;

      const totalTasks = await Task.countDocuments(query);
      const totalPages = Math.ceil(totalTasks / +perPage);

      const userTasks = await Task.find(query)
        .populate({ path: "user", select: "firstName lastName  -_id" })
        .sort(sortOptions)
        .skip((+page - 1) * +perPage)
        .limit(+perPage);

      const response = {
        tasks: userTasks,
        currentPage: +page,
        totalPages: totalPages,
        nextPage: +page < totalPages ? +page + 1 : null,
        prevPage: +page > 1 ? +page - 1 : null,
      };

      res.json(response);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching tasks." });
    }
  },

  async getTaskById(req: Request, res: Response) {
    try {
      const task = await Task.findById(req.params.id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the task." });
    }
  },

  async updateTask(req: Request, res: Response) {
    try {
      const newTaskData = req.body;
      const task = await Task.findByIdAndUpdate(req.params.id, newTaskData, {
        new: true,
      });
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the task." });
    }
  },

  async deleteTask(req: Request, res: Response) {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (task) {
        res.json({ message: "Task deleted successfully" });
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the task." });
    }
  },
};

export default taskController;
