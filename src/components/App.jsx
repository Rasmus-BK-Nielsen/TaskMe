import { useState } from 'react';
import AddTaskForm from './AddTaskForm';
import SettingsMenu from './SettingsMenu';
import TaskCard from './TaskCard';
import { saveTask, removeTask } from '../utils/storage';
import { selectTasks } from '../utils/taskSelector';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [congratsMessage, setCongratsMessage] = useState("");
  const [tasksToRemove, setTasksToRemove] = useState([]);


  const handleAddTask = (task) => {
    saveTask(task);
    console.log("Saved task:", task);
  };

  const handleTaskMe = () => {
    const tasks = selectTasks();
    setSelectedTasks(tasks);
  };

  const successMessages = [
    "🎉 You did it! All tasks completed!",
    "⭐ Great work, a true hero of productivity!",
    "🌈 You crushed it! Take a well-earned break.",
    "🍀 Another day, another success!",
    "🎸 You are a ROCK STAR!",
    "🏃🏻‍♀️ Remember! It's not a race, it's a marathon! And you are winning!"
  ];

  const handleToggleComplete = (updatedTask) => {
    const updatedSelectedTasks = selectedTasks.map(t =>
      t.id === updatedTask.id ? updatedTask : t
    );
  
    setSelectedTasks(updatedSelectedTasks);
  
    if (!updatedTask.recurring) {
      updateTask(updatedTask);
    }
  
    // Check against the local copy of what the state *will be*
    const allComplete = updatedSelectedTasks.every(t => t.completed);
  
    if (allComplete) {
      const toRemove = updatedSelectedTasks.filter(
        t => t.completed && !t.recurring
      );
    
      setTasksToRemove(toRemove); // ✅ cache for button
      const message = successMessages[Math.floor(Math.random() * successMessages.length)];
      setCongratsMessage(message);
      setShowCongrats(true);
    }    
  };  

  const handleDelete = (id) => {
    setSelectedTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold mb-6 drop-shadow-[2px_2px_0px_black]">TaskMe</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={handleTaskMe}
          className="bg-blue-500 text-white py-3 rounded-xl text-lg font-semibold"
        >
          TaskMe!
        </button>
        <button onClick={() => setShowForm(true)} className="bg-green-500 text-white py-3 rounded-xl text-lg font-semibold">Add Task</button>
        <button onClick={() => setShowSettings(true)} className="bg-gray-800 text-white py-3 rounded-xl text-lg font-semibold">☰ Settings</button>
      </div>
      {selectedTasks.length > 0 && (
        <div className="mt-6 w-full max-w-xs flex flex-col gap-3">
          {selectedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      {showForm && <AddTaskForm onSave={handleAddTask} onClose={() => setShowForm(false)} />}
      {showSettings && <SettingsMenu onClose={() => setShowSettings(false)} />}
      {showCongrats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-2xl shadow-xl max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">{congratsMessage}</h2>
            <button
              onClick={() => {
                tasksToRemove.forEach(t => {
                  removeTask(t.id);
                });
                setTasksToRemove([]);
                setShowCongrats(false);
                setSelectedTasks([]); // Clear view after modal
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
