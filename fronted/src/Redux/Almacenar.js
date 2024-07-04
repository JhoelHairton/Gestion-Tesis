import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from "./Autenticacion";
import TareaSlice from "./TareaSlice";
import EnviarSlice from "./EnviarSlice";

const rootReducer=combineReducers({
    auth:authReducer,
    tarea:TareaSlice,
    enviar:EnviarSlice

})

const almacenar=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)
})

export default almacenar;