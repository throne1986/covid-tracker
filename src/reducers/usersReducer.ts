
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUsersState, IUsers } from "../interfaces/interfaces";

const initialState :IUsersState = {
    users:[],
    status: ""
}

export const getUsers = createAsyncThunk<IUsers[]>("/users", async() =>{
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");

        return response.data
    } catch (error) {
        throw error
    }
})

const usersSlice = createSlice({
    name: "app-reducer",
    initialState: initialState,
    reducers: {
        addUser: (state, action) =>{
            state.users = [...state.users, action.payload]

        },
        deleteUser:(state, action)=>{
            state.users = state.users.filter((user)=>user.id !== action.payload)
        }
    },
    extraReducers: (builder) =>{
        //users use case
        builder.addCase(getUsers.pending, (state, action)=>{
            state.status = 'loading'
        });
        builder.addCase(getUsers.fulfilled, (state, action)=>{
            state.status = 'success'
            state.users= action.payload;
        });
        builder.addCase(getUsers.rejected, (state, action)=>{
            state.status = 'failed'
        });
    }
})

export const {deleteUser, addUser } = usersSlice.actions;

export default usersSlice.reducer;
