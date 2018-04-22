import { takeLatest } from "redux-saga/effects";
import { CREATE_USER_REQUEST } from "./types";
import { createUserSaga } from "./sagas/usersSagas";

export default function* rootSaga() {
    yield takeLatest(CREATE_USER_REQUEST, createUserSaga)
}