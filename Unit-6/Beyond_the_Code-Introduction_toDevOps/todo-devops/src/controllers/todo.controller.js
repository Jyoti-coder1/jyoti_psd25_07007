const Todo = require('../models/todo.model');
const { success } = require('../utils/response');

exports.createTodo = async (req, res, next) => {
    try {
        const todo = await Todo.create(req.body);
        success(res, todo, 'Todo created', 201);
    } catch (err) {
        next(err);
    }
};

exports.getTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find();
        success(res, todos, 'All todos');
    } catch (err) {
        next(err);
    }
};