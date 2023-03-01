import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Irecado } from '../../type/recadoInterface';

const bancoRecado: Irecado[] = [];

const recadoSlice = createSlice({
	name: 'recados',
	initialState: { recados: bancoRecado },
	reducers: {
		publicar: (state, action: PayloadAction<Irecado>) => {
			state.recados.push(action.payload);
		},
		excluir: (state, action: PayloadAction<number>) => {
			const index = state.recados.findIndex((ele) => ele.id === action.payload);

			state.recados.splice(index, 1);
		},
	},
});

export const { publicar, excluir } = recadoSlice.actions;
export default recadoSlice.reducer;
