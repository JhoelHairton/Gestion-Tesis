import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api";


//enviar tareas api
export const submitTask = createAsyncThunk("submissions/submitTask",
    async ({ taskId, githubLink }) => {
        setAuthHeader(localStorage.getItem("jwt", api))
        try {
            const {data} = await api.post(`/api/envio?tarea_id=${taskId}&github_link=${githubLink}`,
                {}
            );
            console.log("tarea enviada", data)
            return data;
        } catch (error) {
            console.log("catch", error);
            throw Error(error.response.data.error);

        }
    })

export const fetchAllSubmissions = createAsyncThunk("submissions/fetchAllSubmissions",
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

export const fetchSubmissionsByTaskId = createAsyncThunk("submissions/fetchSubmissionsByTaskId",
    async (taskId) => {
        setAuthHeader(localStorage.getItem("jwt", api));
        try {
            const { data } = await api.get(`/api/envio/tarea/${taskId}`,
                {}
            );
            console.log("tarea enviada", data)
            return data;
        } catch (error) {
            console.log("catch", error);
            throw Error(error.response.data.error);

        }
    })

export const acceptDeclineSubmission = createAsyncThunk("submissions/acceptDeclineSubmission",
    async (id, status) => {
        setAuthHeader(localStorage.getItem("jwt", api));
        try {
            const { data } = await api.put(`/api/envio/${id}?sstatus=${status}`,
                {}
            );
            console.log("tarea aceptada", data)
            return data;
        } catch (error) {
            console.log("catch", error);
            throw Error(error.response.data.error);

        };
    });

const submissionSlice = createSlice({
    name: "submission",
    initialState: {
        submissions: [],
        status: '',
        error: null,
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitTask.pending, (state) => {
                state.status = 'cargando';
            })
            .addCase(submitTask.fulfilled, (state, action) => {
                state.status = 'tuvo éxito';
                state.submissions.push(action.payload);
            })
            .addCase(submitTask.rejected, (state, action) => {
                state.status = 'fallido';
                state.error = action.error.message;
            })
            //sdsdsddddddddddddddd
            .addCase(fetchAllSubmissions.fulfilled, (state, action) => {
                state.status = 'tuvo éxito';
                state.submissions = action.payload;
            })
            .addCase(fetchAllSubmissions .rejected, (state, action) => {
                state.status = 'fallido';
                state.error = action.error.message;

            })
            /////////////////sdsdsd
            .addCase(fetchSubmissionsByTaskId.fulfilled, (state, action) => {
                state.status = 'tuvo éxito';
                state.submissions = action.payload;
            })
            /////////////////sdsdsd
            .addCase(acceptDeclineSubmission.fulfilled, (state, action) => {
                state.status = 'tuvo exito';
                state.submissions = state.submissions.map((item) => 
                    item.id !== action.payload.id ? item : action.payload);

            });

    }
})

export default submissionSlice.reducer;