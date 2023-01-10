
import { createSlice, configureStore  } from "@reduxjs/toolkit";

const initialState = {
  fetching : false,
  filter: "All",
  message: "",
  notification: null,
  todo: [],
};

const statusSlice = createSlice({
  name: "Status",
  initialState: initialState,
  reducers: {
    addtodo(state, action) {
      state.todo = action.payload;
    },
   
    notification(state, action) {
      state.notification = {
        status: action.payload.status,
        error: action.payload.error,
      };
    },
    completestatus(state, action) {
      state.filter = action.payload;
    },
    activestatus(state, action) {
      state.filter = action.payload;
    },
    defaultstatus(state, action) {
      state.filter = action.payload;
    },
    message(state, action) {
      state.message = action.payload;
    },
    Isfetch(state ,action ){
      state.fetching = action.payload
    }
  },
});

// thunk for fetching data

export const fetchtodo = () => {
  return async (dispatch) => {

    const fetchdata = async () => {
      dispatch(statusActions.Isfetch(true))
     
      const response = await fetch(
        "https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos.json"
      );

      if (!response.ok) {
        throw new Error("todo failed");
      }

      dispatch(statusActions.Isfetch(false))

    
      const data = await response.json();
      
      const transformedData = [];
      for (const key in data) {
        const productObj = {
          id: key,
          ...data[key],
        };
        transformedData.push(productObj);
      }
  
      return transformedData;
    };

    try {
      const todofromdb = await fetchdata();
      dispatch(statusActions.addtodo(todofromdb));
      // router.push('/')
    } catch (error) {
      alert(error);
    }
  };
};




const store = configureStore({
  reducer: statusSlice.reducer,
});

export const statusActions = statusSlice.actions;

export default store;
