import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return storedTasks;
  });
  const [darkMode, setDarkMode] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [randomTask, setRandomTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, priority, pinned = false) => {
    const newTask = { id: Date.now(), text, priority, pinned, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  const editTask = (taskId) => {
    setEditingTask(taskId);
  };

  const saveEditedTask = (taskId, newText, newPriority) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText, priority: newPriority } : task
      )
    );
    setEditingTask(null);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const sortByPriority = () => {
    setTasks((prevTasks) => [...prevTasks.sort((a, b) => (a.priority > b.priority ? 1 : -1))]);
  };

  const togglePin = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, pinned: !task.pinned } : task
      )
    );
  };

  const generateRandomTask = () => {
    const randomTasks = [
      'Learn a new language',
      'Write a poem',
      'Try a new recipe',
      'Take a nature walk',
      'Read a book',
      'Learn to play a musical instrument',
      'Start a journal',
      'Learn a magic trick',
    ];

    const randomIndex = Math.floor(Math.random() * randomTasks.length);
    setRandomTask(randomTasks[randomIndex]);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <nav className={`p-4 ${darkMode ? 'bg-gray-900' : 'bg-orange-500'}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Task Manager</h1>
          <label className="cursor-pointer">
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="mr-2" />
            Dark Mode
          </label>
        </div>
      </nav>
      <div className="container mx-auto p-8">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Add a new task"
              className={`p-2 border rounded w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTask(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
          <button
            className={`p-2 ${darkMode ? 'bg-gray-700' : 'bg-blue-500'} text-white rounded ml-4`}
            onClick={generateRandomTask}
          >
            Random Task
          </button>
        </div>
        {randomTask && (
          <div className={`p-4 mb-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-orange-100 text-black'} rounded-md flex items-center justify-between`}>
            <div className="flex items-center">
              <h3 className="text-lg font-semibold mr-4">Random Task Suggestion:</h3>
              <p>{randomTask}</p>
            </div>
            <button
              className={`p-2 ${darkMode ? 'bg-gray-700' : 'bg-blue-500'} text-white rounded`}
              onClick={() => copyToClipboard(randomTask)}
            >
              Copy
            </button>
          </div>
        )}
        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
          onEdit={editTask}
          editingTask={editingTask}
          onSave={saveEditedTask}
          onCancelEditing={cancelEditing}
          onPin={togglePin}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default App;
