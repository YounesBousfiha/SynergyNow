import { create } from 'zustand';


export const useTasksStore = create((set) => ({
   tasks: [],

    setTasks: (tasks) => set({ tasks }),
    addTask: (task) =>
        set((state) => ({
            tasks: [...state.tasks, task]
        })),
    removeTask : (id) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id)
        })),
    updateTask: (id, updatedData) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
            task.id === id ? {...task, ...updatedData} : task)
        }))
}));
