import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { excluir, publicar, update } from '../../store/feature/recadoSlice';
import {
	Card,
	CardActions,
	CardContent,
	Typography,
	Grid,
	Box,
} from '@mui/material';

import { setUsuarioOnline } from '../../store/feature/usuarioSlice';
import {
	FormStyledListaRecado,
	FormStyledRecado,
} from '../formStyled/formStyleRecado';

const FormHome = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { usuarioOnline } = useSelector(
		(state: RootState) => state.usuarioSlice
	);
	const { recados } = useSelector((state: RootState) => state.recadoSlice);

	useEffect(() => {
		if (usuarioOnline === null) {
			navigate('/');
		}
	}, [usuarioOnline]);

	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [iDE, setIDE] = useState(0);

	const editar = (ide: number) => {
		recados.forEach((ele) => {
			if (ele.id === ide) {
				setTitle(ele.title);
				setText(ele.text);
				setIDE(ele.id);
			}
		});
	};

	const postarRecado = () => {
		if (title.length === 0 || text.length === 0) {
		} else if (iDE !== 0) {
			dispatch(
				update({
					id: iDE,
					title,
					text,
				})
			);
			setIDE(0);
			setTitle('');
			setText('');
		} else {
			dispatch(
				publicar({
					id: Math.random() * Math.random() * Math.random(),
					title,
					text,
				})
			);
			setTitle('');
			setText('');
		}
	};

	return (
		<React.Fragment>
			<FormStyledRecado>
				<Box>
					<Typography
						variant="h4"
						sx={{ display: 'flex', justifyContent: 'center', color: 'black' }}
					>
						olá {usuarioOnline?.nick2}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							color: 'black',
						}}
					>
						<TextField
							label="título"
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<TextField
							label="texto"
							type="text"
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={() => postarRecado()}
						>
							Publicar
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={() => dispatch(setUsuarioOnline(null))}
						>
							Sair
						</Button>
					</Box>
				</Box>
			</FormStyledRecado>
			<FormStyledListaRecado>
				<Grid
					container
					sx={{
						display: 'flex',
						justifyContent: 'center',
						width: '90%',
						paddingTop: '2rem',
					}}
					spacing={2}
				>
					{recados.map((ele) => (
						<Grid item xs={6} md={4}>
							<Card
								sx={{ borderRadius: '20px', backgroundColor: 'whitesmoke' }}
							>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{ele.title}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{ele.text}
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										size="small"
										onClick={() => dispatch(excluir(ele.id))}
									>
										Excluir
									</Button>
									<Button size="small" onClick={() => editar(ele.id)}>
										Editar
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</FormStyledListaRecado>
		</React.Fragment>
	);
};

export default FormHome;
