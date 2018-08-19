const Todo = require('../models/Todo');
const errorHandler = require('../utils/errorHandler');

module.exports.get = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (todo) {
            res.json(todo);
        } else {
           res.status(404).json({message: 'Not found'});
        }


    } catch (e) {
        errorHandlers(res, e);
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const todos = await Todo.find();

        res.json(todos);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    const {title, description, status, sub_tasks, date} = req.body;
    const params = {title, description, status, date};

    if (Array.isArray(sub_tasks)) {
        params.sub_tasks = sub_tasks;
    }

    try {
        const todo = new Todo(params);

        await todo.save();

        res.status(201).json(todo);

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    const {title, description, status, sub_tasks, date} = req.body;
    const updatedTodo = {title, description, status, sub_tasks, date};

    try {
        const todo = await Todo.findOneAndUpdate({_id: req.params.id}, {
            $set: updatedTodo
        }, {new: true});

        res.json(todo);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async (req, res) => {
    try {
        const todo = await Todo.remove({_id: req.params.id});

        if (todo) {
            res.json({message: 'Task was removed'})
        } else {
            res.status(404).json({message: 'Task not found'});
        }
    } catch (e) {
        errorHandler(res, e);
    }
};