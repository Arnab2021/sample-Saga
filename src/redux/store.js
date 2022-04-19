import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { combineReducers } from "redux";

import { productReducer } from "./reducer/productReducer";
import { handler } from "./saga/productSagaHandler";

const sagaMiddleWare = createSagaMiddleware()
const combineReducer = combineReducers({
    productReducer
})

const store = createStore(combineReducer, applyMiddleware(sagaMiddleWare) )

sagaMiddleWare.run(handler)

export {store}