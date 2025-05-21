import { updateTask, removeTask } from "../utils/storage";

const TaskCard = ({ task, onToggleComplete, onDelete }) => {
  const handleChange = () => {
    if (task.recurring) {
      // Just show as complete in UI
      onToggleComplete({ ...task, completed: true });
    } else {
      const updated = { ...task, completed: true };
      updateTask(updated);
      onToggleComplete(updated);
    }
  };

  return (
    <div
      className={`text-black rounded-xl p-4 shadow-md w-full
    ${task.completed && task.recurring ? "bg-white border-2 border-green-400 opacity-60" : "bg-white"}
    ${task.completed && !task.recurring ? "opacity-60" : ""}
  `}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            {task.title}
            {task.recurring && (
              <span title="Recurring Task" className="text-blue-500 text-sm">🔁</span>
            )}
          </h3>
          {task.dueDate && (
            <p className="text-sm text-gray-600">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${task.isMajor
              ? "bg-red-200 text-red-800"
              : "bg-yellow-200 text-yellow-800"
              }`}
          >
            {task.isMajor ? "Major" : "Minor"}
          </span>
          <label className="text-xs mt-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleChange}
              className="mr-1"
            />
            Done
            {task.completed && task.recurring && (
              <span title="Task Completed!" className="text-green-600 text-xs ml-2">(Complete)</span>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
