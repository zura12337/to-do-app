export function createTask(newTask: object) {
  let tasks: string | null = localStorage.getItem("tasks");
  if (typeof tasks === "string") {
    let parsedTasks: Array<object> = JSON.parse(tasks);
    parsedTasks[parsedTasks.length] = newTask;
    localStorage.setItem("tasks", JSON.stringify(parsedTasks));
  } else {
    let taskArray = [];
    taskArray.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskArray));
  }
}

export function getTasks() {
  const tasks = localStorage.getItem("tasks");
  if (typeof tasks === "string") {
    return JSON.parse(tasks);
  } else {
    return [];
  }
}

export function reorderTasks(tasks: any) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
