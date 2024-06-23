import { createSlice } from "@reduxjs/toolkit";

//to send data to view Recruiter

const recruiterSlice = createSlice({
    name:'recruiterSlice',
    initialState:{},
    reducers:{
        //actions
      
        eachRecruiter: (state, action) => {
            // Merge the properties of action.payload into the state
            return { ...state, ...action.payload };
        }        
    }
})

export const{eachRecruiter}=recruiterSlice.actions
export default recruiterSlice.reducer