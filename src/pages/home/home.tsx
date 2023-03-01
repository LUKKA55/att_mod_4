import React from 'react';
import { ContainerStyledRecado } from '../../components/containerStyled/ContainerStyled';
import FormHome from '../../components/formRecado/formRecado';

const Home = () => {
	return (
		<React.Fragment>
			<ContainerStyledRecado>
				<FormHome />
			</ContainerStyledRecado>
		</React.Fragment>
	);
};

export default Home;
