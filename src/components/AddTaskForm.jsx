import { useState } from "react";

const AddTaskForm = ({ onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [isMajor, setIsMajor] = useState(false);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title,
      isMajor,
      dueDate: dueDate || null,
      completed: false,
    };

    onSave(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black rounded-2xl p-6 w-full max-w-sm shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add a Task</h2>

        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date (optional)</label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Task Type</label>
        <select
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={isMajor ? "major" : "minor"}
          onChange={(e) => setIsMajor(e.target.value === "major")}
        >
          <option value="minor">Minor</option>
          <option value="major">Major</option>
        </select>

        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
