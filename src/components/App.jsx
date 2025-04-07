import { useState } from 'react';
import AddTaskForm from './AddTaskForm';
import SettingsMenu from './SettingsMenu';
import TaskCard from './TaskCard';
import { saveTask } from '../utils/storage';
import { selectTasks } from '../utils/taskSelector';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleAddTask = (task) => {
    saveTask(task);
    console.log("Saved task:", task);
  };

  const handleTaskMe = () => {
    const tasks = selectTasks();
    setSelectedTasks(tasks);
  };

  const handleToggleComplete = (updatedTask) => {
    setSelectedTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
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
            />
          ))}
        </div>
      )}
      {showForm && <AddTaskForm onSave={handleAddTask} onClose={() => setShowForm(false)} />}
      {showSettings && <SettingsMenu onClose={() => setShowSettings(false)} />}
    </div>
  );
}

export default App;
