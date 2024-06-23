import { createSlice } from "@reduxjs/toolkit";


const verifySlice = createSlice({
    name:'verifySlice',
    initialState:false,
    reducers:{
        //actions
      
        verify: (state, action) => {
            // Merge the properties of action.payload into the state
            return { ...state, ...action.payload };
        }      
    }
})   

export const{verify}=verifySlice.actions
export default verifySlice.reducer