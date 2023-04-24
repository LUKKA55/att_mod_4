import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Irecado } from '../../type/recadoInterface';
import apiService from '../../services/api/api';

export const getRecados = createAsyncThunk(
	'recado/get',
	async (id: string, { dispatch, getState }) => {
		const response = await apiService.doGet(`/users/${id}/recados`);
		return response;
	}
);
export const postRecado = createAsyncThunk(
	'recado/post',
	async (
		{ data, id_User }: { data: object; id_User: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doPost(
			`/users/${id_User}/createrecado`,
			data
		);
		dispatch(getRecados(id_User));
		return response;
	}
);
export const deleteRecado = createAsyncThunk(
	'recado/delete',
	async (
		{ id_User, id_recado }: { id_User: string; id_recado: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doDelete(
			`/users/${id_User}/recados/${id_recado}`
		);
		dispatch(getRecados(id_User));
		return response;
	}
);
export const putUpdateRecado = createAsyncThunk(
	'recado/put',
	async (
		{
			data,
			id_User,
			id_Recado,
		}: { data: object; id_User: string; id_Recado: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doPut(
			`/users/${id_User}/recados/${id_Recado}`,
			data
		);
		dispatch(getRecados(id_User));
		return response;
	}
);
export const getArquivaRecado = createAsyncThunk(
	'recado/get',
	async (
		{ id_User, id_recado }: { id_User: string; id_recado: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doGet(
			`/users/${id_User}/recados/${id_recado}/arquivar`
		);
		setTimeout(() => dispatch(getRecados(id_User)), 500);
		console.log(response);
		return response;
	}
);
export const getArquivados = createAsyncThunk(
	'recadoArquivados/get',
	async (id_User: string, { dispatch, getState }) => {
		const response = await apiService.doGet(
			`/users/${id_User}/recadosArquivados`
		);
		console.log('arquivados API', response);
		return response;
	}
);
export const getPesquisaRecado = createAsyncThunk(
	'recadoPesquisa/get',
	async (
		{ id_User, data }: { id_User: string; data: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doGet(
			`/users/${id_User}/recados/filtro?title=${data}&status=true`
		);
		return response;
	}
);

const initialState: {
	recados: Irecado[];
	all_recados_true: Array<Irecado>;
	all_recados_false: Array<Irecado>;
	message: string;
} = {
	recados: [],
	all_recados_true: [],
	all_recados_false: [],
	message: '',
};

const recadoSlice = createSlice({
	name: 'recados',
	initialState,
	reducers: {
		publicar: (state, action: PayloadAction<Irecado>) => {
			state.recados.push(action.payload);
		},
		update: (state, action: PayloadAction<Irecado>) => {
			const recados = state.recados;
			const update = recados.findIndex((ele) => ele.id === action.payload.id);
			recados[update].title = action.payload.title;
			recados[update].text = action.payload.text;

			recados.splice(update, 1, recados[update]);

			state.recados = recados;
		},

		// messageTroca: (state, action: PayloadAction<string>) => {
		// 	state.message = action.payload;
		// },
	},
	extraReducers: ({ addCase }) => {
		addCase(
			getRecados.fulfilled,
			(state, action: PayloadAction<{ recado_true: Array<Irecado> }>) => {
				state.all_recados_true = action.payload.recado_true;
			}
		);
		addCase(
			getArquivados.fulfilled,
			(state, action: PayloadAction<{ recado_false: Array<Irecado> }>) => {
				state.all_recados_false = action.payload.recado_false;
			}
		);
		addCase(
			getPesquisaRecado.fulfilled,
			(state, action: PayloadAction<Array<Irecado>>) => {
				console.log('ppp', action.payload);
				state.all_recados_true = action.payload;
			}
		);

		// addCase(
		// 	postRecado.fulfilled,
		// 	(state, action: PayloadAction<{ message: string }>) => {
		// 		state.message = action.payload.message;
		// 	}
		// );
		// addCase(
		// 	putUpdateRecado.fulfilled,
		// 	(state, action: PayloadAction<{ message: string }>) => {
		// 		state.message = action.payload.message;
		// 	}
		// );
	},
});

export const { publicar, update } = recadoSlice.actions;
export default recadoSlice.reducer;
