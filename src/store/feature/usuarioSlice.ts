import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { User } from '../../type/usuarioInterface';
import { RootState } from '../store';

// const usuarioAdaptor = createEntityAdapter<usuario>({
// 	selectId: (usuario) => usuario.id,
// });

const initialState: {
	usuarios: User[];
	usuarioOnline: Omit<User, 'senha2'> | null;
} = { usuarios: [], usuarioOnline: null };

const usuarioSlice = createSlice({
	name: 'usuarios',
	initialState,
	reducers: {
		cadastrar: (state, action: PayloadAction<User>) => {
			state.usuarios.push(action.payload);
		},
		setUsuarioOnline: (
			state,
			action: PayloadAction<Omit<User, 'senha2'> | null>
		) => {
			state.usuarioOnline = action.payload;
		},
	},
});

export const { cadastrar, setUsuarioOnline } = usuarioSlice.actions;
export default usuarioSlice.reducer;
