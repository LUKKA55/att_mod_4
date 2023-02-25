import { Box } from '@mui/system';
import React from 'react';
import { ContainerStyled } from '../../components/containerStyled/ContainerStyled';
import Form from '../../components/form/form';
import { FormStyled } from '../../components/formStyled/FormStyled';

const Login = () => {
	return (
		<>
			<ContainerStyled>
				<FormStyled>
					<Form mode="Login" />
				</FormStyled>
			</ContainerStyled>
		</>
	);
};

export default Login;
