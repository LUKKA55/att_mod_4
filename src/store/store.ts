import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usuarioSlice from './feature/usuarioSlice';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import recadoSlice from './feature/recadoSlice';

const reducer = combineReducers({ usuarioSlice, recadoSlice });

const persist_configuracao = {
	key: 'root',
	storage,
};

const persistedReducers = persistReducer(persist_configuracao, reducer);

const store = configureStore({
	reducer: persistedReducers,
});

const persistor = persistStore(store);
export { store, persistor };

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
