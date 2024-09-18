import { configureStore } from '@reduxjs/toolkit';
import { DataReducer, SelectDataReducer } from './reducer/DataReducer';
const store = configureStore({
    reducer: {
        DataReducer, SelectDataReducer
    }
})
export default store;
