import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { publicar } from '../../store/feature/recadoSlice';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { setUsuarioOnline } from '../../store/feature/usuarioSlice';

const FormHome = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { usuarios, usuarioOnline } = useSelector(
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

	return (
		<React.Fragment>
			<Button
				variant="outlined"
				color="error"
				onClick={() => dispatch(setUsuarioOnline(null))}
			>
				Sair
			</Button>
			<TextField
				label="title"
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<TextField
				label="text"
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<Button
				variant="outlined"
				color="primary"
				onClick={() => dispatch(publicar({ title, text }))}
			>
				Publicar
			</Button>
		</React.Fragment>
	);
};

export default FormHome;
