import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api, BASE_URL, setAuthHeader } from "../api/api";

export const login = createAsyncThunk("auth/login", async(userData) => {

    try {
        const {data} = await axios.post(`${BASE_URL}/auth/InSesion`, userData)
        localStorage.setItem("jwt", data.jwt)
        console.log("Inicio de sesión exitoso", data)
        return data;
    } catch (error) {
        console.log("error de captura", error);
        throw Error(error.response.data.error)

    }

})

export const register = createAsyncThunk("auth/register", async(userData) => {

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


export const logout = createAsyncThunk("auth/logout",async (userData) => {
    try {
        localStorage.clear()
    } catch (error) {
        console.log("error de captura", error);
        throw Error(error.response.data.error)
    }

})

export const getUserProfile = createAsyncThunk("auth/getUserProfile", async(jwt) => {
    setAuthHeader(jwt,api)
    try {
        const {data} = await api.get(`/api/user/perfil`)
        console.log("Perfil del Usuario exitoso", data)
        return data;
    } catch (error) {
        console.log("error de captura", error);
        throw Error(error.response.data.error)
    }

})


export const getUserList = createAsyncThunk("auth/getUserList",async(jwt) => {
    setAuthHeader(jwt,api)
    try {
        const { data } = await api.get(`/api/user`)
        console.log("Lista de Usuarios exitoso", data)
        return data;

    } catch (error) {
        console.log("error de captura", error);
        throw Error(error.response.data.error);
    }

});

const authSlice=createSlice({
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
        //login
            .addCase(login.pending,(state) => {
                state.loading=true;
                state.error =null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.loggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading=false;
                state.error=action.error.message
            })
            
            //registrar
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.loggedIn = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            //BUSCAR Usuario
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading=false;
                state.user=action.payload
                state.loggedIn=true;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            //lista de usuarios
             
            .addCase(getUserList.pending,(state) => {
                state.loading=true;
                state.error=null;
            })
            .addCase(getUserList.fulfilled,(state, action) => {
                state.loading = false;
                state.users = action.payload
                state.loggedIn = true;
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            //salir
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


