import styled from 'styled-components';

const FormStyled = styled.section`
	width: 30%;
	height: 80%;
	color: black;
	background-color: #928f8f;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;

	@media (max-width: 900px) {
		width: 100%;
		height: 100%;
		border-radius: 0px;
	}
`;

export { FormStyled };
