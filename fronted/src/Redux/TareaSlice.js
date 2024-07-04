import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../Api/api";

export const buscarTareas = createAsyncThunk("tarea/buscarTareas",
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

export const buscarUsuarioTareas = createAsyncThunk("tarea/buscarUsuarioTareas",
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


export const buscarTareasId = createAsyncThunk("tarea/buscarTareasId",
    async ({ tareaId }) => {
        setAuthHeader(localStorage.getItem("jwt"), api)

        try {
            const { data } = await api.get(`/api/tareas/${tareaId}`);
            console.log("Buscar usuarios Id:", data)
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);

        }
    }
);


export const CrearTarea = createAsyncThunk("tarea/CrearTarea",
    async (tareaData) => {
        setAuthHeader(localStorage.getItem("jwt"), api)

        try {
            const { data } = await api.post(`/api/tareas`, tareaData);
            console.log("crear tarea:", data)
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);

        }
    }
);

export const EditarTarea = createAsyncThunk("tarea/EditarTarea",
    async (id, editarTareaData) => {
        setAuthHeader(localStorage.getItem("jwt"), api)

        try {
            const { data } = await api.put(`/api/tareas/${id}`, editarTareaData);
            console.log("editar tarea:", data)
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);

        }
    }
);



export const AssignarTareaUser = createAsyncThunk("tarea/AssignarTareaUser",
    async (tareaId, userId) => {
        setAuthHeader(localStorage.getItem("jwt"), api)

        try {
            const { data } = await api.put(`/api/tareas/${tareaId}/user/${userId}/assigned`);
            console.log("asignar tarea:", data)
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);

        }
    }
);


export const eliminarTarea = createAsyncThunk("tarea/eliminarTarea",
    async (tareaId) => {
        setAuthHeader(localStorage.getItem("jwt"), api)

        try {
            const { data } = await api.delete(`/api/tareas/${tareaId}`);
            console.log("tarea eliminada:")
            return tareaId;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);

        }
    }
);

const tareaSlice = createSlice({
    name: "tarea",
    initialState: {
        tasks: [],
        loading: false,
        error: null,
        usersTask: null,
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarTareas.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(buscarTareas.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(buscarTareas.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;

            })

            .addCase(buscarUsuarioTareas.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(buscarUsuarioTareas.fulfilled, (state, action) => {
                state.loading = false;
                state.usersTask = action.payload
            })
            .addCase(buscarUsuarioTareas.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;

            })


            .addCase(CrearTarea.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CrearTarea.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload)
            })
            .addCase(CrearTarea.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })



            .addCase(EditarTarea.fulfilled, (state, action) => {
                const EditarDTarea = action.payload;
                state.loading = false;
                state.tasks = state.tasks.map((tarea) =>
                    tarea.id === EditarDTarea.id ? { ...tarea, ...EditarDTarea } : tarea
                )
            })


            .addCase(AssignarTareaUser.fulfilled, (state, action) => {
                const EditarDTarea = action.payload;
                state.loading = false;
                state.tasks = state.tasks.map((tarea) =>
                    tarea.id === EditarDTarea.id ? { ...tarea, ...EditarDTarea } : tarea
                )
            })

            .addCase(eliminarTarea.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.map((tarea) =>tarea.id!==action.payload)
                
            })
    }
})

export default tareaSlice.reducer;