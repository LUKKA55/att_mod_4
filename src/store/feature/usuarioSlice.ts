import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../type/usuarioInterface';
import apiService from '../../services/api/api';
import { Irecado } from '../../type/recadoInterface';
import { getRecados } from './recadoSlice';

export const postUser = createAsyncThunk(
	'user/post',
	async (data: object, { dispatch, getState }) => {
		const response = await apiService.doPost('/create', data);
		return response;
	}
);
export const loginUser = createAsyncThunk(
	'user/login',
	async (data: object, { dispatch, getState }) => {
		const response = await apiService.doPost('/login', data);
		console.log(response);

		if (response.message === 'Login feito com sucesso') {
			dispatch(getRecados(response.login.id));
			dispatch(setUsuarioOnline(true));
		}

		return response;
	}
);

const initialState: {
	id_User: string;
	message: string;
	usuarios: User[];
	usuarioOnline: boolean;
} = {
	id_User: '',
	message: '',
	usuarios: [],
	usuarioOnline: false,
};

const usuarioSlice = createSlice({
	name: 'usuarios',

	initialState,
	reducers: {
		cadastrar: (state, action: PayloadAction<User>) => {
			state.usuarios.push(action.payload);
		},
		setUsuarioOnline: (state, action: PayloadAction<boolean>) => {
			state.usuarioOnline = action.payload;
		},
	},
	extraReducers: ({ addCase }) => {
		addCase(
			postUser.fulfilled,
			(state, action: PayloadAction<{ message: string }>) => {
				state.message = action.payload.message;
			}
		);
		addCase(
			loginUser.fulfilled,
			(
				state,
				action: PayloadAction<{
					message: string;
					login: {
						nick: string;
						email: string;
						senha: string;
						id: string;
						recados: Irecado[];
					};
				}>
			) => {
				state.message = action.payload.message;
				state.id_User = action.payload.login?.id;
			}
		);
	},
});

export const { cadastrar, setUsuarioOnline } = usuarioSlice.actions;
export default usuarioSlice.reducer;
