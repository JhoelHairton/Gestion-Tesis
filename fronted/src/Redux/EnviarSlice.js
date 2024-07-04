import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../Api/api";

export const enviarTarea = createAsyncThunk("enviar/enviaTarea",
    async ({ tareaId, githubLink }) => {
        setAuthHeader(localStorage.getItem("jwt", api))
        try {
            const { data } = await api.post(`/api/envio?tarea_id=${tareaId}&github_link=${githubLink}`,
                {}
            );
            console.log("tarea enviada", data)
            return data;
        } catch (error) {
            console.log("catch", error);
            throw Error(error.response.data.error);

        }
    })

export const buscarAllTareas = createAsyncThunk("enviar/buscarAllTareas",
    async () => {
        setAuthHeader(localStorage.getItem("jwt", api));
        try {
            const { data } = await api.get(`/api/envio`,
                {}
            );
            console.log("tarea enviada", data)
            return data;
        } catch (error) {
            console.log("catch", error);
            throw Error(error.response.data.error);

        }
    })

export const buscarEnviosIDtarea = createAsyncThunk("enviar/buscarEnviosIDtarea",
    async (tareaId) => {
        setAuthHeader(localStorage.getItem("jwt", api));
        try {
            const { data } = await api.get(`/api/envio/tarea/${tareaId}`,
                {}
            );
            console.log("tarea enviada", data)
            return data;
        } catch (error) {
            console.log("catch", error);
            throw Error(error.response.data.error);

        }
    })

export const aceptarRechazarEnviar = createAsyncThunk("enviar/aceptarRechazarEnviar",
    async (id, estado) => {
        setAuthHeader(localStorage.getItem("jwt", api));
        try {
            const { data } = await api.put(`/api/envio/${id}?sstatus=${estado}`,
                {}
            );
            console.log("tarea aceptada", data)
            return data;
        } catch (error) {
            console.log("catch", error);
            throw Error(error.response.data.error);

        }
    })

const enviarSlice = createSlice({
    name: "enviar",
    initialState: {
        submissions: [],
        status: '  ',
        error: null,
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(enviarTarea.pending, (state) => {
                state.status = 'cargando';
            })
            .addCase(enviarTarea.fulfilled, (state, action) => {
                state.status = 'tuvo éxito';
                state.submissions.push(action.payload);
            })
            .addCase(enviarTarea.rejected, (state, action) => {
                state.status = 'fallido';
                state.error = action.error.message;
            })
            //sdsdsddddddddddddddd
            .addCase(buscarAllTareas.fulfilled, (state, action) => {
                state.status = 'tuvo éxito';
                state.submissions = action.payload;
            })
            .addCase(buscarAllTareas.rejected, (state, action) => {
                state.status = 'fallido';
                state.error = action.error.message;

            })
            /////////////////sdsdsd
            .addCase(buscarEnviosIDtarea.fulfilled, (state, action) => {
                state.status = 'tuvo éxito';
                state.submissions = action.payload;
            })
            /////////////////sdsdsd
            .addCase(aceptarRechazarEnviar.fulfilled, (state, action) => {
                state.status = 'tuvo exito';
                state.submissions = state.submissions.map((item) => 
                    item.id !== action.payload.id ? item : action.payload);

            });

    }
})

export default enviarSlice.reducer;