import { useState, useEffect } from "react";
import { MODES } from "../constants/settings";
import { getSettings, saveSettings } from "../utils/settings";

const SettingsMenu = ({ onClose }) => {
  const [mode, setMode] = useState("random");
  const [count, setCount] = useState(3);

  useEffect(() => {
    const { mode, count } = getSettings();
    setMode(mode);
    setCount(count);
  }, []);

  const handleSave = () => {
    saveSettings({ mode, count });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white text-black rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-xl font-bold mb-4">Settings</h2>

        <label className="block text-sm font-medium text-gray-700 mb-1">Task Mode</label>
        <select
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value={MODES.RANDOM}>Random</option>
          <option value={MODES.MAJOR_ONLY}>Only Major Tasks</option>
          <option value={MODES.BALANCED}>1 Major + 2 Minor</option>
          <option value={MODES.DUE_SOON}>Closest Due Dates</option>
        </select>

        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Tasks</label>
        <input
          type="range"
          min={1}
          max={5}
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="w-full mb-2"
        />
        <div className="text-center mb-4">Showing: {count} task{count > 1 ? "s" : ""}</div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
