import Select from "react-select";
import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";
import defaults from "../../config/defaults.json";

const YoastSelect = styled( Select )`
	width: 100%;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);

	&.is-focused:not(.is-open) > .Select-control {
		border-color: ${ colors.$color_green_medium_light };
		box-shadow: none;
		background: ${ colors.$color_white };
	}

	.Select-control {
		height: 48px;
		border-radius: 0;
	}

	.Select-placeholder {
		line-height: 48px;
		color: ${ colors.$color_grey_text };
	}

	&.Select--single > .Select-control .Select-value {
		line-height: 48px;
	}

	.Select-value-label {
		line-height: 48px;
	}

	.Select-input {
		line-height: 48px;
	}

	.Select-option {
		color: #000;

		&.is-selected {
			background-color: #6dff003d;
		}
		&.is-focused {
			background-color: ${ colors.$color_green_medium_light };
			color: ${ colors.$color_white };
		}
	}
`;

export default YoastSelect;

export const SelectArea = styled.span`
	display: flex;
	width: 100%;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: block;
		height: auto;
	}

	>:last-child {
		margin-left: 8px;

		@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
			margin-left: 0;
			margin-top: 8px;
		}
	}
`;
