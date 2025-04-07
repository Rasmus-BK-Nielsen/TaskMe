import { updateTask } from "../utils/storage";

const TaskCard = ({ task, onToggleComplete }) => {
  const handleChange = () => {
    const updated = { ...task, completed: !task.completed };
    updateTask(updated);
    onToggleComplete(updated); // trigger re-render
  };

  return (
    <div
      className={`bg-white text-black rounded-xl p-4 shadow-md w-full ${
        task.completed ? "opacity-60 line-through" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold">{task.title}</h3>
          {task.dueDate && (
            <p className="text-sm text-gray-600">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              task.isMajor
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
          </label>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
