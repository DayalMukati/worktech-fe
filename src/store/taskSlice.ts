import { Tasks } from "@/graphql/__generated__/graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  tasks: Tasks[]; // Use Tanks[] directly for typing the array of tasks
  pirvateTasks: Tasks[]; // Use Tanks[] directly for typing the array of tasks
}

const initialState: TaskState = {
  tasks: [],
  pirvateTasks: [],
};

export const taskSlice = createSlice({
  name: "tasks", // Corrected the name to 'org' to reflect the slice's purpose
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Tasks[]>) => {
      state.tasks = action.payload;
    },
    setPrivateTasks: (state, action: PayloadAction<Tasks[]>) => {
      state.pirvateTasks = action.payload;
    },
    updateTasks: (state, action: PayloadAction<Tasks>) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      console.log("index->", index, action.payload);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    updatePrivateTasks: (state, action: PayloadAction<Tasks>) => {
      const index = state.pirvateTasks.findIndex(
        (task) => task._id === action.payload._id
      );
      console.log("index->", index, action.payload);
      if (index !== -1) {
        state.pirvateTasks[index] = action.payload;
      }
    },
  },
});

export const { setTasks, setPrivateTasks, updateTasks, updatePrivateTasks } =
  taskSlice.actions;

export const selectTasks = (state: { taskSlice: TaskState }) => state.taskSlice;

export default taskSlice.reducer;
