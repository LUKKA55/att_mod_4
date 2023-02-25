import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { cadastrar, setUsuarioOnline } from '../../store/feature/usuarioSlice';
import { RootState } from '../../store/store';
import { User } from '../../type/usuarioInterface';

interface Mode {
	mode: 'Login' | 'Signup';
}
const Form = ({ mode }: Mode) => {
	const navigate = useNavigate();
	const { usuarios, usuarioOnline } = useSelector(
		(state: RootState) => state.usuarioSlice
	);
	const dispatch = useDispatch();

	//-----------LOGAR-------------
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	//-----------CADASTRAR-------------
	const [email2, setEmail2] = useState('');
	const [senha2, setSenha2] = useState('');
	const [senhaConfirm, setSenhaconfirm] = useState('');
	//-----------ERRO LOGAR-------------
	const [erroEmail, setErroemail] = useState(false);
	const [erroSenha, setErrosenha] = useState(false);
	//-----------ERRO CADASTRAR-------------
	const [erroEmail2, setErroemail2] = useState(false);
	const [erroSenha2, setErrosenha2] = useState(false);
	const [errosenhaConfirm, setErrosenhaconfirm] = useState(false);

	//=================LOGAR================================
	useEffect(() => {
		if (email.length > 1 && email.length <= 6) {
			setErroemail(true);
		} else {
			setErroemail(false);
		}
		if (senha.length > 1 && senha.length < 8) {
			setErrosenha(true);
		} else {
			setErrosenha(false);
		}
	}, [email, senha]);

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
	}, [email2, senha2, senhaConfirm]);

	const Cadastrar_Usu = () => {
		if (email2.length === 0 || senha2.length === 0) {
			alert('preencha corretamente');
		} else {
			dispatch(
				cadastrar({
					id: crypto.randomUUID(),
					email2,
					senha2,
				})
			);
			navigate('/');
		}
	};

	const Logar = () => {
		if (email.length === 0 || senha.length === 0) {
			alert('preencha corretamente ou faça seu cadastro');
		} else {
			const acheiUsuario = usuarios.find(
				(ele) => ele.email2 === email && ele.senha2 === senha
			);
			if (acheiUsuario) {
				navigate('/Home');
				dispatch(
					setUsuarioOnline({ id: acheiUsuario.id, email2: acheiUsuario.email2 })
				);
			} else {
				alert('preencha corretamente ou faça seu cadastro');
			}
		}
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
							label="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							error={erroEmail}
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
