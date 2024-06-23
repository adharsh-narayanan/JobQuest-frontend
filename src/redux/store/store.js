import { configureStore } from "@reduxjs/toolkit";
import recruiterSlice from "../slices/recruiterSlice";
import verifySlice from "../slices/verifySlice";
import adminProfileSlice from "../slices/adminProfileSlice";

const store = configureStore({
    reducer:{
        recruiterReducer:recruiterSlice,
        verifyReducer:verifySlice,
        adminProfileReducer:adminProfileSlice

    }
})
export default store