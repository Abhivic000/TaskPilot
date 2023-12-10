import React from 'react';

const Task = ({ task, onDelete, onToggle, onEdit }) => {
  return (
    <div className={`flex items-center justify-between bg-white p-4 my-2 rounded-lg shadow-md ${task.completed ? 'opacity-50' : ''}`}>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="cursor-pointer"
        />
        <span className={task.completed ? 'line-through text-gray-600' : 'text-black'}>
          {task.text} {task.priority && `(${task.priority})`}
        </span>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onEdit(task.id)} className="text-blue-500">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
