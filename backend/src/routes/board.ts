import express from "express";
import Column from "../models/Column";
import Task from "../models/Task";

const router = express.Router();

// get all columns and populate the task data based on the ids.
router.get("/", async (req, res) => {
    try {
        const columns = await Column.find().populate("taskIds");
        res.json(columns);
    }
    catch (err){
        res.status(500).json({ error: "Failed to fetch board"});
    }
});

// create a column
router.post("/column", async(req, res) => {
    try{
        const{ title } = req.body;
        const newColumn = await Column.create({ title, taskIds: []});
        res.json(newColumn);
    }
    catch(err){
        res.status(500).json({ error: "Failed to create column"});
    }
});

// create a task
router.post("/task", async (req, res) => {
    try{
        const { content, columnID } = req.body;
        const newTask = await Task.create({ content });
        await Column.findByIdAndUpdate(columnID, {
            $push: { taskIds: newTask._id },
        });
        res.json(newTask);
    }
    catch(err){
        res.status(500).json({ error: "Failed to creae task" });
    }
});

//update column order
router.put("/reorder", async (req, res) => {
    try{
        const { columnID, taskIds } = req.body;
        await Column.findByIdAndUpdate(columnID, { taskIds });
        res.json({ message: "Order updated"});
    }
    catch (err){
        res.status(500).json({ error: "Failed to reorder" });
    }
});

export default router;