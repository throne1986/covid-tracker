

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
import {IState} from "../interfaces/interfaces";
import { ICountries } from "../interfaces/interfaces";

const initialState :IState = {
    isCountry: false,
    country: "",
    data: [],
    countries: [],
    status: ""
}

interface IData {
    country: string
    isCountry: false
}

export const getCovidData = createAsyncThunk(
"/api", 

    async (data: string[]) =>{
        try{

            let  response;


            if(data.length >0){
                response = await api.get(`/api/countries/${data[0]}`);
            }else{
                response = await api.get("/api");
            }

            // console.log('response..', response.data);

            return response.data;

        }catch(error){
            throw error
        }
    }

) 

export const getCountries = createAsyncThunk<ICountries>(
    '/api/countries',

    async () =>{
        try{

            const response = await api.get("/api/countries");

            return response.data;

        }catch(error){
            throw error
        }
    }
)



const appSlice = createSlice({
    name: "app-reducer",
    initialState: initialState,
    reducers: {
        setIsCountry: (state, action) =>{
           state.isCountry = action.payload
        },
        setCountry: (state, action) =>{
           state.country = action.payload
        }
    },
    extraReducers: (builder) =>{
        
        builder.addCase(getCovidData.pending, (state) =>{
            state.status = "loading"
        });
        builder.addCase(getCovidData.fulfilled, (state, {payload}) =>{
            state.status = "success"
            state.data = [];
            state.data.push(payload);
        });
        builder.addCase(getCovidData.rejected, (state, {payload}) =>{
            state.status = "failed"
        });
        builder.addCase(getCountries.pending, (state) =>{
            state.status = "loading"
        });
        builder.addCase(getCountries.fulfilled, (state, {payload}) =>{
            state.status = "success"
            state.countries.push(payload);
        });
        builder.addCase(getCountries.rejected, (state, {payload}) =>{
            state.status = "failed"
        });
    }
})

export const { setIsCountry, setCountry } = appSlice.actions;

export default appSlice.reducer;
