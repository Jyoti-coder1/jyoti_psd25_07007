const Todo = require('../models/todo.model');

exports.create = async (payload) => {
    const todo = new Todo(payload);
    return todo.save();
};

exports.getAll = async () => {
    return Todo.find().lean();
};