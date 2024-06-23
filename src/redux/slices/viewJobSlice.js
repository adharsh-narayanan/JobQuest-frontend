import { createSlice } from "@reduxjs/toolkit";
//foe sending data to view job

//not using



const viewjobSlice= createSlice({
    name:'viewjobSlice',
    initialState:{},
    reducers:{
        //actions
      
        jobDetails: (state, action) => {
            // Merge the properties of action.payload into the state
            return { ...state, ...action.payload };
        }        
    }
})

export const{jobDetails}=viewjobSlice.actions
export default viewjobSlice.reducer