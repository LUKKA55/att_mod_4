import styled from 'styled-components';

const FormStyledRecado = styled.section`
	width: 100%;
	height: 20%;
	color: white;
	background-color: #928f8f;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 900px) {
		border-radius: 0px;
		height: 18%;
	}
`;
const FormStyledListaRecado = styled.section`
	width: 100%;
	height: 88%;
	color: white;
	display: flex;
	justify-content: center;
	border-radius: 10px;
	overflow-x: hidden;
`;

export { FormStyledRecado, FormStyledListaRecado };
