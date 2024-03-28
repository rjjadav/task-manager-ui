import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./task/task.slice"


const store = configureStore({
    reducer: {
        tasks: tasksReducer
    }
})

export default store;