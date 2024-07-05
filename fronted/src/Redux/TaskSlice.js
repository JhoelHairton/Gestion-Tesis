import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api";

//buscar tareas API 
export const fetchTasks = createAsyncThunk("task/fetchTasks",
    async ({ status }) => {
        setAuthHeader(localStorage.getItem("jwt"), api)

        try {
            const { data } = await api.get("/api/tareas", {
                params: { status }
            });
            console.log("Buscar Tareas:", data)
            return data;
        } catch (error) {
            console.log("Error al buscar tareas:", error);
            throw Error(error.response.data.error);

        }
    }
);

//buscarUsuarioTareas API 
export const fetchUsersTasks = createAsyncThunk("task/fetchUsersTasks",
    async ({ status }) => {
        setAuthHeader(localStorage.getItem("jwt"), api)

        try {
            const { data } = await api.get("/api/tareas/user", {
                params: { status }
            });
            console.log("Buscar usuarios Tareas:", data)
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);

        }
    }
);

//buscarTareasId 
export const fetchTasksById = createAsyncThunk("task/fetchTasksById",
    async (taskId) => {
        setAuthHeader(localStorage.getItem("jwt"), api)

        try {
            const { data } = await api.get(`/api/tareas/${taskId}`);
            console.log("Buscar usuarios Id:", data)
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);

        }
    }
);

//crearTarea
export const createTask = createAsyncThunk("task/createTask",
    async (taskData) => {
        setAuthHeader(localStorage.getItem("jwt"), api)

        try {
            const { data } = await api.post(`/api/tareas`, taskData);
            console.log("crear tarea:", data)
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);

        }
    }
);

//EditarTarea
export const updateTask = createAsyncThunk("task/updateTask",
    async (id, updatedTaskData) => {
        setAuthHeader(localStorage.getItem("jwt"), api)

        try {
            const { data } = await api.put(`/api/tareas/${id}`, updatedTaskData);
            console.log("editar tarea:", data)
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);

        }
    }
);


//AsignarTarea a estudiante
export const assignedTaskToUser = createAsyncThunk("task/assignedTaskToUser",
    async (taskId, userId) => {
        setAuthHeader(localStorage.getItem("jwt"), api)

        try {
            const { data } = await api.put(`/api/tareas/${taskId}/user/${userId}/assigned`);
            console.log("asignar tarea:", data)
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);

        }
    }
);

//eliminar tarea
export const deleteTask = createAsyncThunk("task/deleteTask",
    async (taskId) => {
        setAuthHeader(localStorage.getItem("jwt"), api)

        try {
            const { data } = await api.delete(`/api/tareas/${taskId}`);
            console.log("tarea eliminada")
            return taskId;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);

        }
    }
);

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
        loading: false,
        error: null,
        taskDetails: null,
        usersTask: null,
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            //buscar tareas
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;

            })
            //buscarUsuarioTareas
            .addCase(fetchUsersTasks.pending, (state) => {
                state.loading = true 
                state.error = null
            })
            .addCase(fetchUsersTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.usersTask = action.payload
            })
            .addCase(fetchUsersTasks.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;

            })

            //crear tarea
            .addCase(createTask.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload)
            })
            .addCase(createTask.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })


            //Editar tarea
            .addCase(updateTask.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                state.loading = false;
                state.tasks = state.tasks.map((task) =>
                    task.id === updatedTask.id ? { ...task, ...updatedTask } : task
                );
            })

                //AssignarTareaUser
            .addCase(assignedTaskToUser.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                state.loading = false;
                state.tasks = state.tasks.map((task) =>
                    task.id === updatedTask.id ? { ...task, ...updatedTask } : task
                )
            })

            //eliminar tarea
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.map((task) => task.id!==action.payload)

            })
    }
})

export default taskSlice.reducer;