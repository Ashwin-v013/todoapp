import { useRouter } from "next/router";
import { createStore } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { createSlice, configureStore } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";

// const router = useRouter();
// const dispath = useDispatch()

const initialState = {
  filter: "All",
  message: "",
  notification: null,
  timeout: false,
  todo: [],
};

const statusSlice = createSlice({
  name: "Status",
  initialState: initialState,
  reducers: {
    addtodo(state, action) {
      state.todo = action.payload;
    },
    timeout(state, action) {
      state.timeout = action.payload;
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
  },
});

// thunk for fetching data

export const fetchtodo = () => {
  return async (dispatch) => {
    const fetchdata = async () => {
      const response = await fetch(
        "https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos.json"
      );

      if (!response.ok) {
        throw new Error("todo failed");
      }

      // dispatch(statusActions.notification({
      //   status : "success",
      //   error : "todo sent successfully"
      // }))

      const data = await response.json();
      console.log(data)
      const transformedData = [];
      for (const key in data) {
        const productObj = {
          id: key,
          ...data[key],
        };
        transformedData.push(productObj);
      }
        console.log(transformedData)
      return transformedData;
    };

    try {
      const todofromdb = await fetchdata();
      dispatch(statusActions.addtodo(todofromdb));
    } catch (error) {
      alert(error);
    }
  };
};

//THunk for posting Data

export const sendFormData = (Todo) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos/${Todo.id}.json`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Todo),
      }
    );

    if (!response.ok) {
      throw new Error("todo failed");
    }
    dispatch(
      statusActions.notification({
        status: "success",
        error: "todo added successfully",
      })
    );
  };
};

const store = configureStore({
  reducer: statusSlice.reducer,
});

export const statusActions = statusSlice.actions;

export default store;
