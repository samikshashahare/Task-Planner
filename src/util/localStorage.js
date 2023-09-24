
export const saveListToLocalStorage = (tasks) => {
    localStorage.setItem('Task-Planner', JSON.stringify(tasks))
}
