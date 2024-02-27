import request from "supertest";
import app from "../app"; 
import mongoose from "mongoose";
import Task from "../models/Task";


describe("Task Controller", () => {
  let jwtToken: string; 

  beforeAll(async () => {
    jwtToken = "change with your userToken";
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
  });



  it("should create a new task", async () => {
    const taskData = {
      title: "Test Task",
      description: "Test Description",
      dueDate: new Date(),
      completed: false,
    };
  
    const mockToken = "change with your userToken";
  
    const response = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${mockToken}`)
      .send(taskData);
  
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(taskData.title);
  });
  
  
  it("should retrieve all tasks", async () => {
    const tasks = [
      { title: "Task 1", description: "Description 1", dueDate: new Date(), completed: false },
      { title: "Task 2", description: "Description 2", dueDate: new Date(), completed: true },
      { title: "Task 1", description: "Description 1", dueDate: new Date(), completed: false },
      { title: "Task 2", description: "Description 2", dueDate: new Date(), completed: true },
      { title: "Task 1", description: "Description 1", dueDate: new Date(), completed: false },
      { title: "Task 2", description: "Description 2", dueDate: new Date(), completed: true },
    ];
    await Task.insertMany(tasks);

    const response = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${jwtToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(tasks.length);
  });

  it("should retrieve a task by ID", async () => {
         const task = await Task.create({
            title: "Test Task",
            description: "Test Description",
            dueDate: new Date(),
            completed: false,
          });
    const response = await request(app)
      .get(`/tasks/${task._id}`)
      .set("Authorization", `Bearer ${jwtToken}`); 

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(task.title);
  });

  it("should update a task", async () => {
         const task = await Task.create({
            title: "Test Task",
            description: "Test Description",
            dueDate: new Date(),
            completed: false,
          });

      const updatedTaskData = {
      title: "Updated Task",
      description: "Updated Description",
      dueDate: new Date(),
      completed: true,
    };
    const response = await request(app)
      .put(`/tasks/${task._id}`)
      .send(updatedTaskData)
      .set("Authorization", `Bearer ${jwtToken}`); 

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedTaskData.title);
  });

  it("should delete a task", async () => {
    const task = await Task.create({
      title: "Test Task",
      description: "Test Description",
      dueDate: new Date(),
      completed: false,
    });

    const response = await request(app)
      .delete(`/tasks/${task._id}`)
      .set("Authorization", `Bearer ${jwtToken}`); 

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Task deleted successfully");
    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).toBeNull();
  });
});

