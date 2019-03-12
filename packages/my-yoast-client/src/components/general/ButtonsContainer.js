import styled from "styled-components";
import defaults from "../../config/defaults.json";

const ButtonsContainer = styled.div`
	flex: 1 0 200px;
	padding-bottom: 16px;
	text-align: right;

	a,
	button {
		margin-left: 12px;
	}

	@media screen and (max-width: ${ defaults.css.breakpoint.mobile }px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		a,
		button {
			margin-left: 0;
			margin-bottom: 8px;
		}
	}
`;

export default ButtonsContainer;
