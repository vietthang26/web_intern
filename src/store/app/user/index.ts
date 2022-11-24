import { PayloadAction } from '@reduxjs/toolkit';
import { useInjectSaga } from 'redux-injectors';
import { useInjectReducer } from 'utils/redux-injectors';
import { createSlice } from './../../../utils/@reduxjs/toolkit';
import userSaga from './saga';
import { UserState, LoginPayload, User } from './types';

export const initialState: UserState = {
  //   user: undefined,
  isLoading: false,
  user: JSON.parse(localStorage.getItem('user') || 'false') || undefined,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<LoginPayload>) {
      state.isLoading = true;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        data: User;
        error: number;
        message: string;
      }>,
    ) {
      state.isLoading = false;

      console.log('success', action.payload);
      state.user = action.payload.data;
    },
    loginFailue(state, action: PayloadAction<object>) {
      state.isLoading = false;
    },

    logout(state, aaction: PayloadAction<string>) {
      console.log('Logout');
      state.user = undefined;
    },
  },
});

/**
 * `actions` will be used to trigger change in the state from where ever you want
 */
export const { actions: userActions } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: 'user', saga: userSaga });
  return { actions: slice.actions };
};
