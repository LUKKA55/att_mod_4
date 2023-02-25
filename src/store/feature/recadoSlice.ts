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
	},
});

export const { publicar } = recadoSlice.actions;
export default recadoSlice.reducer;
