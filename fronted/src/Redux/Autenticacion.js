import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, api, setAuthHeader } from "../Api/api";

export const login = createAsyncThunk("auth/login", async (userData) => {

    try {
        const { data } = await axios.post(`${BASE_URL}/auth/InSesion`, userData)
        localStorage.setItem("jwt", data.jwt)
        console.log("Inicio de sesión exitoso", data)
        return data;
    } catch (error) {
        console.log("error de captura", error);
        throw Error(error.response.data.error)

    }

})

export const registrar = createAsyncThunk("auth/registrar", async (userData) => {

    try {
        const { data } = await axios.post(`${BASE_URL}/auth/registrarse`, userData)
        localStorage.setItem("jwt", data.jwt)
        console.log("Registro exitoso", data)
        return data;

    } catch (error) {
        console.log("error de captura", error);
        throw Error(error.response.data.error)

    }

})


export const logout = createAsyncThunk("auth/logout", async (userData) => {
    try {
        localStorage.clear()
    } catch (error) {
        console.log("error de captura", error);
        throw Error(error.response.data.error)
    }

})

export const PerfilUsuario = createAsyncThunk("auth/PerfilUsuario", async (jwt) => {
    setAuthHeader(jwt, api)
    try {
        const { data } = await api.get(`/api/user/perfil`)

        console.log("Perfil del Usuario exitoso", data)
        return data;

    } catch (error) {
        console.log("error de captura", error);
        throw Error(error.response.data.error)
    }

})


export const ListarUsuarios = createAsyncThunk("auth/ListarUsuarios", async (jwt) => {
    setAuthHeader(jwt, api)
    try {
        const { data } = await api.get(`/api/user`)
        console.log("Lista de Usuarios exitoso", data)
        return data;

    } catch (error) {
        console.log("error de captura", error);
        throw Error(error.response.data.error)
    }

})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loggedIn: false,
        loading: false,
        error: null,
        jwt: null,
        users: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.loggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            .addCase(registrar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registrar.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.loggedIn = true;
            })
            .addCase(registrar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            
            .addCase(PerfilUsuario.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PerfilUsuario.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
                state.loggedIn = true;
            })
            .addCase(PerfilUsuario.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })


             
            .addCase(ListarUsuarios.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ListarUsuarios.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload
                state.loggedIn = true;
            })
            .addCase(ListarUsuarios.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            .addCase(logout.fulfilled,(state) =>{
                state.user = null;
                state.jwt = null;
                state.users = [];
                state.error = null;
                state.loggedIn = false;
            })


    }
})

export default authSlice.reducer;


