import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { excluir, publicar } from '../../store/feature/recadoSlice';
import {
	Card,
	CardActions,
	CardContent,
	Typography,
	Grid,
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
	const PostarRecado = () => {
		if (title.length === 0 || text.length === 0) {
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

	const Editar = (id: number) => {
		recados.filter((ele) => {
			if (ele.id === id) {
				setTitle(ele.title);
				setText(ele.text);
			}
		});
	};

	return (
		<React.Fragment>
			<FormStyledRecado>
				<Button
					variant="outlined"
					color="error"
					onClick={() => dispatch(setUsuarioOnline(null))}
				>
					Sair
				</Button>
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
					variant="outlined"
					color="primary"
					onClick={() => PostarRecado()}
				>
					Publicar
				</Button>
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
						<Grid item xs={4}>
							<Card sx={{ borderRadius: '20px' }}>
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
									<Button size="small" onClick={() => Editar(ele.id)}>
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
