import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import { AppDispatch, RootState } from '../../store/store';
import {
	Card,
	CardActions,
	CardContent,
	Typography,
	Grid,
	Button,
	Box,
} from '@mui/material';
import {
	getArquivaRecado,
	getArquivados,
} from '../../store/feature/recadoSlice';
import { Irecado } from '../../type/recadoInterface';

export default function RecadosArquivados({
	isOpen,
	setModalOpen,
}: {
	isOpen: Boolean;
	setModalOpen: any;
}) {
	const { all_recados_false } = useSelector(
		(state: RootState) => state.recadoSlice
	);
	const { id_User } = useSelector((state: RootState) => state.usuarioSlice);

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		console.log('recados false ---- ', all_recados_false);
		if (all_recados_false) {
			setRecados(all_recados_false);
		}
	}, [all_recados_false]);

	const [recados, setRecados] = useState<Irecado[] | null>(null);

	const desarquivar = (id_recado: string) => {
		dispatch(getArquivaRecado({ id_User, id_recado }));
		dispatch(getArquivados(id_User));
	};
	console.log('false', all_recados_false);

	if (isOpen) {
		return (
			<Box
				sx={{
					background: 'rgb(0,0,0,0.7)',
					padding: '2rem',
					overflow: 'hidden',
				}}
			>
				<Button
					variant="contained"
					color="error"
					onClick={setModalOpen}
					sx={{ marginTop: '1rem', overflow: 'hidden' }}
				>
					X
				</Button>
				<Grid
					container
					sx={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '1rem',
					}}
					spacing={2}
				>
					{recados?.length &&
						recados.map((recado) => (
							<Grid item xs={6} md={4} key={recado.id}>
								<Card
									sx={{ borderRadius: '20px', backgroundColor: 'whitesmoke' }}
								>
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											{recado.title}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{recado.text}
										</Typography>
									</CardContent>
									<CardActions>
										<Button size="small" onClick={() => desarquivar(recado.id)}>
											Desarquivar
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
				</Grid>
			</Box>
		);
	}
	return null;
}
