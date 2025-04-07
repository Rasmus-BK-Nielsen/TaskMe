import { getTasks } from "./storage";
import { getSettings } from "./settings";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function selectTasks() {
  const { mode, count } = getSettings();
  const all = getTasks();

  if (all.length === 0) return [];

  switch (mode) {
    case "major":
      return shuffle(all.filter(t => t.isMajor)).slice(0, count);
    case "balanced": {
      const majors = shuffle(all.filter(t => t.isMajor));
      const minors = shuffle(all.filter(t => !t.isMajor));
      const result = [];
      if (majors.length > 0) result.push(majors[0]);
      result.push(...minors.slice(0, count - 1));
      return result.slice(0, count);
    }
    case "due-soon":
      return [...all]
        .filter(t => t.dueDate)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, count);
    case "random":
    default:
      return shuffle(all).slice(0, count);
  }
}
