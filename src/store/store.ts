import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usuarioSlice from './feature/usuarioSlice';
import recadoSlice from './feature/recadoSlice';

const reducer = combineReducers({ usuarioSlice, recadoSlice });

const store = configureStore({
	reducer,
});

export { store };

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
