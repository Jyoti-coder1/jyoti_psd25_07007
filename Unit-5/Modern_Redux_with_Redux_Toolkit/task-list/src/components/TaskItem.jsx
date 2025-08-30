import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, toggleTask } from '../features/tasksSlice';

export default function TaskItem({ task }) {
    const dispatch = useDispatch();
    return (
        <li className={task.completed ? 'completed' : ''}>
            <span onClick={() => dispatch(toggleTask(task.id))}>
                {task.text}
            </span>
            <button onClick={() => dispatch(removeTask(task.id))}>X</button>
        </li>
    );
}