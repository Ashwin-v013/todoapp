import { createStore } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { createSlice , configureStore } from "@reduxjs/toolkit";
const initialState = {
    filter: 'all',
    message:''
    
}

const statusSlice = createSlice({
    name: 'Status',
    initialState: initialState,
    reducers : {
        completestatus(state , action){
            state.filter = action.payload;
        },
        activestatus(state , action){
            state.filter = action.payload;
        },
        defaultstatus(state , action){
            state.filter = action.payload;
        },
        message(state,action){
            state.message = action.payload;
            // if(action.payload === 0){
            //     state.message = 'active'
            // }

            // if(action.payload === 1){
            //     state.message = 'completed'
            // }

        }
    }
})


 const store = configureStore({
    reducer : statusSlice.reducer,
})

export const statusActions = statusSlice.actions;

export default store;

// const messageReducer  = (state = initialState , action) => {

//     if(action.type === 'complete'){
//         return {
//             message: state.message = action.payload,

//         }
//     }

//     return state;



// }

// export const store = createStore(messageReducer);
// // assigning store to next wrapper
// function makeStore() {
//     return store;
// }

// export const wrapper = createWrapper(makeStore);
