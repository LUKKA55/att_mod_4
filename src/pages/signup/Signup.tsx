import React from 'react';
import { ContainerStyled } from '../../components/containerStyled/ContainerStyled';
import Form from '../../components/form/form';
import { FormStyled } from '../../components/formStyled/FormStyled';

const Signup = () => {
	return (
		<>
			<ContainerStyled>
				<FormStyled>
					<Form mode="Signup" />
				</FormStyled>
			</ContainerStyled>
		</>
	);
};

export default Signup;
