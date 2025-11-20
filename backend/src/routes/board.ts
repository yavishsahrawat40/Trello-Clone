import express from "express";
import Column from "../models/Column";
import Task from "../models/Task";
import { error } from "console";

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
        const { content, columnId } = req.body;
        const newTask = await Task.create({ content });
        await Column.findByIdAndUpdate(columnId, {
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
        const { columnId, taskIds } = req.body;
        await Column.findByIdAndUpdate(columnId, { taskIds });
        res.json({ message: "Order updated"});
    }
    catch (err){
        res.status(500).json({ error: "Failed to reorder" });
    }
});

router.put("/task/move", async (req, res) => {
    try{
        const{ startColId, endColId, taskId, destIndex } = req.body;
        await Column.findByIdAndUpdate(startColId, {
            $pull: {taskIds: taskId},
        });
        await Column.findByIdAndUpdate(endColId, {
            $push: { taskIds: { $each: [taskId], $position: destIndex }},
        });
        await Task.findByIdAndUpdate(taskId, { columnId: endColId});
        res.json({ message: "Moved successfully"});
    }
    catch (err){
        res.status(500).json({ error: "Failed to move task"});
    }
});

router.delete("/task/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const {columnId} = req.body;
        await Task.findByIdAndDelete(id);
        await Column.findByIdAndUpdate(columnId, {
            $pull: {taskIds: id},
        });
        res.json({ message: "Deleted successfully"});
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete task"});
    }
});

// delete a column
router.delete("/column/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Column.findByIdAndDelete(id);
        // Optionally delete all tasks in this column
        // await Task.deleteMany({ columnId: id }); // If tasks had columnId ref
        res.json({ message: "Column deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete column" });
    }
});

// update column title
router.put("/column/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const updatedColumn = await Column.findByIdAndUpdate(id, { title }, { new: true });
        res.json(updatedColumn);
    } catch (err) {
        res.status(500).json({ error: "Failed to update column" });
    }
});

// update task content
router.put("/task/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, { content }, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: "Failed to update task" });
    }
});

export default router;