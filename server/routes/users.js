// Import required modules
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your user model


//API for fetching and sorting all the tasks of a user if the user exists otherwise create a new user in the database
router.get('/:username/tasks', async (req, res) => {
    console.log('Inside tasks api')
    const { username } = req.params;
    const { sortBy } = req.query;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            user = new User({ username, tasks: [] });
            await user.save();
        }

        let tasks = user.tasks;

        if (sortBy === 'due_date') {
            tasks = tasks.sort((a, b) => {
                if (a.dueDate < b.dueDate) return -1;
                if (a.dueDate > b.dueDate) return 1;
                return 0;
            });
        } else if (sortBy === 'title') {
            tasks = tasks.sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();
                if (titleA < titleB) return -1;
                if (titleA > titleB) return 1;
                return 0;
            });
        } else if (sortBy === 'status') {
            tasks = tasks.sort((a, b) => {
                const statusOrder = { 'Pending': 1, 'In Progress': 2, 'Completed': 3 };
                return statusOrder[a.status] - statusOrder[b.status];
            });
        }
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



//API to post a particular task
router.post('/:username/tasks', async (req, res) => {
    const { username } = req.params;
    const { title, dueDate, status, description } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newTask = {
            title,
            dueDate: new Date(dueDate), // parse dueDate to a Date object
            status,
            description
        };
        user.tasks.push(newTask);
        await user.save();
        res.json(user.tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


//API to edit a particular task
router.put('/:username/tasks/:taskId', async (req, res) => {
    const { username, taskId } = req.params;
    const { title, dueDate, status, description } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const taskIndex = user.tasks.findIndex(task => task._id.toString() === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
        }
        user.tasks[taskIndex].title = title || user.tasks[taskIndex].title;
        user.tasks[taskIndex].dueDate = dueDate || user.tasks[taskIndex].dueDate;
        user.tasks[taskIndex].status = status || user.tasks[taskIndex].status;
        user.tasks[taskIndex].description = description || user.tasks[taskIndex].description;
        await user.save();
        res.json(user.tasks[taskIndex]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


//api to delete a particular task
router.delete('/:username/tasks/:taskId', async (req, res) => {
    const { username, taskId } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const taskIndex = user.tasks.findIndex(task => task._id.toString() === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
        }
        user.tasks.splice(taskIndex, 1);
        await user.save();
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router; 