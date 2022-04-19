import { put, takeEvery, call } from "@redux-saga/core/effects";

import { ADD_PRODUCT, ADD_PRODUCT_ASYNC, DELETE_PRODUCT, DELETE_PRODUCT_ASYNC, EDIT_PRODUCT, EDIT_PRODUCT_ASYNC, GET_ALL_PRODUCT, GET_ALL_PRODUCT_ASYNC, BUTTON_LOADER_SATRT, BUTTON_LOADER_END } from "../type";

import { getAllProductAsync, addProductToFirebaseAsync, editFirebaseDataAsync, deleteFirebaseDataAsync } from "../operations";

function* handler() {

    yield takeEvery(GET_ALL_PRODUCT, getAllProduct)

    yield takeEvery(ADD_PRODUCT, addProductToFirebase)

    yield takeEvery(EDIT_PRODUCT, editFirebaseData)

    yield takeEvery(DELETE_PRODUCT, deleteFirebaseData)
}

function* getAllProduct(action) {

    try {
        yield put({
            type: BUTTON_LOADER_SATRT,
            payload: true
        })
        const response = yield call(getAllProductAsync)
        yield put({
            type: BUTTON_LOADER_END,
            payload: false
        })
        yield put({
            type: GET_ALL_PRODUCT_ASYNC,
            payload: response
        })

    } catch (error) {
        console.log('getAllProduct error => ' + error);
    }
}

function* addProductToFirebase(action) {

    try {
        yield put({
            type: BUTTON_LOADER_SATRT,
            payload: true
        })
        const response = yield call(addProductToFirebaseAsync, action.payload)
        yield put({
            type: BUTTON_LOADER_END,
            payload: false
        })
        if (response !== false) {
            yield put({
                type: ADD_PRODUCT_ASYNC,
                payload: response
            })
        }

    } catch (error) {
        console.log('addProductToFirebase error => ' + error);
    }
}

function* editFirebaseData(action) {
    try {
        yield put({
            type: BUTTON_LOADER_SATRT,
            payload: true
        })
        const response = yield call(editFirebaseDataAsync, action.payload)
        yield put({
            type: BUTTON_LOADER_END,
            payload: false
        })
        if (response !== false) {
            yield put({
                type: EDIT_PRODUCT_ASYNC,
                payload: response
            })
        }

    } catch (error) {
        console.log('editFirebaseData error => ' + error);
    }
}

function* deleteFirebaseData(action) {
    try {
        const response = yield call(deleteFirebaseDataAsync, action.payload)
        if (response !== false) {
            yield put({
                type: DELETE_PRODUCT_ASYNC,
                payload: response
            })
        }

    } catch (error) {
        console.log('editFirebaseData error => ' + error);
    }
}

export { handler }