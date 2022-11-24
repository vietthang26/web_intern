import { useNavigate } from 'react-router-dom';
import { userActions } from 'store/app/user';
import { PayloadAction } from '@reduxjs/toolkit';
import { LoginPayload } from './types';

import { put, call, fork, take, delay } from 'redux-saga/effects';
import axios from 'axios';

/*
{
  "error":0,
  "message":"success",
  "data":{
    "id":98,
    "username":"test02",
    "token":"wgyg53kg7qatwxwvaqst1yknfto5201p",
    "role":0,
    "status":0,
    "createTime":1668582007343}}
*/

function* handleLogin(payload: LoginPayload) {
  const data = {
    error: 0,
    message: 'success',
    data: {
      id: 98,
      username: 'test02',
      token: 'wgyg53kg7qatwxwvaqst1yknfto5201p',
      role: 0,
      status: 0,
      createTime: 1668582007343,
    },
  };
  try {
    yield delay(2000);
    localStorage.setItem('user', JSON.stringify(data));

    // const data = yield call(() => {
    //   return axios.post('https://ttvnapi.com/v1/login', payload);
    // });
    // console.log(data);
    console.log('Hi');

    yield put(userActions.loginSuccess(data));
  } catch (error) {
    yield put(userActions.loginFailue(data));
  }
}

function* handleLogout() {
  yield delay(1000);
  console.log('Hanlde logout');
  localStorage.removeItem('user');
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('user'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(
        userActions.loginRequest.type,
      );
      yield fork(handleLogin, action.payload);
    }

    yield take(userActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* userSaga() {
  yield fork(watchLoginFlow);
}
