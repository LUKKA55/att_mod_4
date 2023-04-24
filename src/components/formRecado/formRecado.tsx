import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
	deleteRecado,
	getArquivaRecado,
	getArquivados,
	getPesquisaRecado,
	getRecados,
	postRecado,
	putUpdateRecado,
} from '../../store/feature/recadoSlice';
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
import RecadosArquivados from '../modal/recadosArquivados';
import { Irecado } from '../../type/recadoInterface';
import { all } from 'axios';
import { RecadosArquivadosStyled } from '../modal/recadosArquivadosStyled';

const FormHome = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const { id_User, usuarioOnline } = useSelector(
		(state: RootState) => state.usuarioSlice
	);
	const { all_recados_true } = useSelector(
		(state: RootState) => state.recadoSlice
	);

	const [openModal, setOpenModal] = useState(false);
	const [ide, setIde] = useState('');
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [pesquisa, setPesquisa] = useState('');
	const [recados, setRecados] = useState<Irecado[] | null>(null);

	useEffect(() => {
		if (all_recados_true) {
			setRecados(all_recados_true);
		}
	}, [all_recados_true]);

	useEffect(() => {
		if (usuarioOnline !== true) {
			navigate('/');
		}
	}, [usuarioOnline]);

	useEffect(() => {
		dispatch(getPesquisaRecado({ id_User, data: pesquisa }));
	}, [pesquisa]);

	const arquivar = (id_recado: string) => {
		dispatch(getArquivaRecado({ id_User, id_recado }));
	};
	const recadosArquivados = () => {
		dispatch(getArquivados(id_User));
		setOpenModal(true);
	};
	const editar = (id_recado: string) => {
		all_recados_true.forEach((recado) => {
			if (recado.id === id_recado) {
				setTitle(recado.title);
				setText(recado.text);
				setIde(recado.id);
			}
		});
	};
	const excluir = (id_recado: string) => {
		dispatch(deleteRecado({ id_User, id_recado }));
	};
	const postarRecado = () => {
		if (ide !== '') {
			const data = {
				title: title,
				text: text,
			};
			dispatch(putUpdateRecado({ data, id_User, id_Recado: ide }));
			setTitle('');
			setText('');
			setIde('');
		} else {
			const data = {
				title: title,
				text: text,
			};
			dispatch(postRecado({ id_User, data }));
			setTitle('');
			setText('');
		}
	};

	return (
		<React.Fragment>
			<FormStyledRecado>
				<TextField
					label="Título"
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<TextField
					label="Texto"
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
				<TextField
					label="Pesquisar..."
					type="text"
					value={pesquisa}
					onChange={(e) => setPesquisa(e.target.value)}
				/>
				<Button
					variant="contained"
					color="warning"
					onClick={() => recadosArquivados()}
				>
					Arquivados
				</Button>
				<Button
					variant="contained"
					color="error"
					onClick={() => dispatch(setUsuarioOnline(false))}
				>
					Sair
				</Button>
			</FormStyledRecado>
			<RecadosArquivadosStyled>
				<RecadosArquivados
					isOpen={openModal}
					setModalOpen={() => setOpenModal(!openModal)}
				/>
			</RecadosArquivadosStyled>
			<FormStyledListaRecado>
				<Grid
					container
					sx={{
						display: 'flex',
						justifyContent: 'center',
						width: '90%',
						paddingTop: '2rem',
						zIndex: '1',
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
										<Button size="small" onClick={() => excluir(recado.id)}>
											Excluir
										</Button>
										<Button size="small" onClick={() => editar(recado.id)}>
											Editar
										</Button>
										<Button size="small" onClick={() => arquivar(recado.id)}>
											Arquivar
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
