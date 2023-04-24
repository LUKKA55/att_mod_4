import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import {
	loginUser,
	postUser,
	setUsuarioOnline,
} from '../../store/feature/usuarioSlice';
import { AppDispatch, RootState } from '../../store/store';

interface Mode {
	mode: 'Login' | 'Signup';
}
const Form = ({ mode }: Mode) => {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const { usuarios, message, usuarioOnline } = useSelector(
		(state: RootState) => state.usuarioSlice
	);

	//-----------LOGAR-------------
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [nick, setNick] = useState('');

	//-----------CADASTRAR-------------
	const [email2, setEmail2] = useState('');
	const [senha2, setSenha2] = useState('');
	const [senhaConfirm, setSenhaconfirm] = useState('');
	const [nick2, setNick2] = useState('');
	//-----------ERRO LOGAR-------------
	const [erroSenha, setErrosenha] = useState(false);

	//-----------ERRO CADASTRAR-------------
	const [erroNick2, setErronick2] = useState(false);
	const [erroEmail2, setErroemail2] = useState(false);
	const [erroSenha2, setErrosenha2] = useState(false);
	const [errosenhaConfirm, setErrosenhaconfirm] = useState(false);

	//=================LOGAR================================
	useEffect(() => {
		if (senha.length > 1 && senha.length < 8) {
			setErrosenha(true);
		} else {
			setErrosenha(false);
		}
	}, [senha]);

	//=====================CADASTRAR=======================
	useEffect(() => {
		if (email2.match(/\S+@\S+\.\S+/)) {
			setErroemail2(true);
		} else {
			setErroemail2(false);
		}
		if (email2.length > 1 && email2.length <= 6) {
			setErroemail2(true);
		} else {
			setErroemail2(false);
		}
		if (senha2.length > 1 && senha2.length < 8) {
			setErrosenha2(true);
		} else {
			setErrosenha2(false);
		}
		if (senhaConfirm !== senha2) {
			setErrosenhaconfirm(true);
		} else {
			setErrosenhaconfirm(false);
		}
		let nick_verification = usuarios.find((ele) => ele.nick2 === nick2);

		if (nick_verification !== undefined) {
			setErronick2(true);
		} else {
			setErronick2(false);
		}
	}, [email2, senha2, senhaConfirm, nick2]);

	useEffect(() => {
		if (message === 'Novo user cadastrado com sucesso') {
			navigate('/');
		}
		if (usuarioOnline === true) {
			navigate('/Home');
		}
	}, [message, usuarioOnline]);

	const Cadastrar_Usu = async () => {
		const data = {
			nick: nick2,
			email: email2,
			senha: senha2,
			senha2: senhaConfirm,
		};
		dispatch(postUser(data));
	};

	const Logar = () => {
		const data = {
			nick: nick,
			email: email,
			senha: senha,
		};
		dispatch(loginUser(data));
	};

	const trocaPagina = () => {
		if (mode === 'Login') {
			navigate('/Signup');
		} else {
			navigate('/');
		}
	};

	return (
		<>
			<Stack spacing={2}>
				{mode === 'Login' && (
					<>
						<Typography
							variant="h3"
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							Logar
						</Typography>
						<TextField
							label="nick"
							type="text"
							value={nick}
							onChange={(e) => setNick(e.target.value)}
						/>
						<TextField
							label="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							label="senha"
							type="password"
							value={senha}
							onChange={(e) => setSenha(e.target.value)}
							error={erroSenha}
						/>

						<Button variant="contained" onClick={() => Logar()}>
							Entrar
						</Button>
						<Typography>
							Não tem conta?{' '}
							<Typography
								variant="caption"
								onClick={() => trocaPagina()}
								sx={{ cursor: 'pointer' }}
							>
								Cadastre-se
							</Typography>
						</Typography>
					</>
				)}

				{mode === 'Signup' && (
					<>
						<Typography
							variant="h3"
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							Cadastrar-se
						</Typography>
						<TextField
							label="nick"
							type="text"
							value={nick2}
							onChange={(e) => setNick2(e.target.value)}
							error={erroNick2}
						/>
						<TextField
							label="email"
							type="email"
							value={email2}
							onChange={(e) => setEmail2(e.target.value)}
							error={erroEmail2}
						/>
						<TextField
							label="senha"
							type="password"
							value={senha2}
							onChange={(e) => setSenha2(e.target.value)}
							error={erroSenha2}
						/>
						<TextField
							label="confirmar senha"
							type="password"
							value={senhaConfirm}
							onChange={(e) => setSenhaconfirm(e.target.value)}
							error={errosenhaConfirm}
						/>
						<Button variant="contained" onClick={() => Cadastrar_Usu()}>
							Cadastrar
						</Button>
						<Typography>
							Já tem conta?{' '}
							<Typography
								variant="caption"
								onClick={() => trocaPagina()}
								sx={{ cursor: 'pointer' }}
							>
								Logar
							</Typography>
						</Typography>
					</>
				)}
			</Stack>
		</>
	);
};

export default Form;
