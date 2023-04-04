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
		update: (state, action: PayloadAction<Irecado>) => {
			const recados = state.recados;
			const update = recados.findIndex((ele) => ele.id === action.payload.id);
			recados[update].title = action.payload.title;
			recados[update].text = action.payload.text;

			recados.splice(update, 1, recados[update]);

			state.recados = recados;
		},
	},
});

export const { publicar, excluir, update } = recadoSlice.actions;
export default recadoSlice.reducer;
