import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { publicar } from '../../store/feature/recadoSlice';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { setUsuarioOnline } from '../../store/feature/usuarioSlice';

const ListaRecado = () => {
	const dispatch = useDispatch();

	const { recados } = useSelector((state: RootState) => state.recadoSlice);

	return (
		<React.Fragment>
			{recados.map((ele) => (
				<Card sx={{ maxWidth: 345 }}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{ele.title}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{ele.text}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small">Excluir</Button>
						<Button size="small">Editar</Button>
					</CardActions>
				</Card>
			))}
		</React.Fragment>
	);
};

export default ListaRecado;
