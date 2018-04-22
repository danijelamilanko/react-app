import { call, put } from "redux-saga/effects"
import { userLoggedIn } from "../actions/auth"
import { createUserFailure } from "../actions/users"
import api from "../api";

export function* createUserSaga(action) {
    try {
        const user = yield call(api.user.signup, action.user);
        localStorage.reactJWT = user.token;
        yield put(userLoggedIn(user));
    } catch (error) {
        yield put(createUserFailure(error.response.data.error));
    }
}