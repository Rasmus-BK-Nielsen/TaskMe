const TASK_KEY = "taskme_tasks";

export function getTasks() {
    const raw = localStorage.getItem(TASK_KEY);
    return raw ? JSON.parse(raw) : [];
}

export function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
}

export function removeTask(taskId) {
    const tasks = getTasks().filter(t => t.id !== taskId);
    localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
}

export function updateTask(updatedTask) {
    const tasks = getTasks().map(t => t.id === updatedTask.id ? updatedTask : t);
    localStorage.setItem("taskme_tasks", JSON.stringify(tasks));
}