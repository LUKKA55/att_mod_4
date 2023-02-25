import React from 'react';
import {
	ContainerStyledRecado,
	ListaRe,
} from '../../components/containerStyled/ContainerStyled';
import FormHome from '../../components/formRecado/formRecado';
import { FormStyledRecado } from '../../components/formStyled/formStyleRecado';
import ListaRecado from '../../components/listaRecado/listaRecado';

const Home = () => {
	return (
		<React.Fragment>
			<ContainerStyledRecado>
				<FormStyledRecado>
					<FormHome />
				</FormStyledRecado>
				<ListaRe>
					<ListaRecado />
				</ListaRe>
			</ContainerStyledRecado>
		</React.Fragment>
	);
};

export default Home;
