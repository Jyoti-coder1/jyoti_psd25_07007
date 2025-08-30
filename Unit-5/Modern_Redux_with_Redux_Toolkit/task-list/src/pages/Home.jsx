import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/tasksSlice';
import TaskItem from '../components/TaskItem';

export default function Home() {
    const [text, setText] = useState('');
    const tasks = useSelector(state => state.tasks.items);
    const dispatch = useDispatch();
    const handleAdd = () => {
        if (text.trim()) {
            dispatch(addTask(text));
            setText('');
        }
    };
    return (
        <div className="container">
            <h1>Task List</h1>
            <div className="input-box">
                <input
                    type="text"
                    value={text}
                    placeholder="Enter task..."
                    onChange={e => setText(e.target.value)}
                />
                <button onClick={handleAdd}>Add</button>
            </div>
            <ul>
                {tasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
}