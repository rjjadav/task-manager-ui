import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tasks : []
}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        loadTasks: (state, actions) => {
            state.tasks = actions.payload.tasks;
        },
        addTask: (state, actions) => {
            state.tasks.push(actions.payload.task);
        },
        removeTask: (state, actions) => {
            const updatedTasks = state.tasks.filter(e => e._id !== actions.payload.id)
            state.tasks = updatedTasks;
        },
        updateTask: (state, actions) => {
            const taskIndex = state.tasks.findIndex(e => {
                return e._id == actions.payload.task._id
            });
            if(taskIndex >= 0) {
                state.tasks[taskIndex] = actions.payload.task;
            }
        }
    }
});

export const tasksActions = taskSlice.actions;
export default taskSlice.reducer;