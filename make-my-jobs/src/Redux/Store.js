import { createStore, applyMiddleware } from "redux";
import { reducer } from "./Job/JobReducer";
import thunkMiddleware from 'redux-thunk'


export const store = createStore(reducer, applyMiddleware(thunkMiddleware))