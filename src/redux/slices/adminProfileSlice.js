import { createSlice } from "@reduxjs/toolkit";

//to senf  data from employer to edit adminprofile
const adminProfileSlice = createSlice({
    name:'adminProfileSlice',
    initialState:{},
    reducers:{
        //actions
      
        adminprofile: (state, action) => {
            // Merge the properties of action.payload into the state
            return { ...state, ...action.payload };
        }      
    }
})

export const{adminprofile}=adminProfileSlice.actions
export default adminProfileSlice.reducer