import Select from "react-select";
import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";

const YoastSelect = styled( Select )`
	width: 100%;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);

	&.is-focused:not(.is-open) > .Select-control {
		border-color: #ccc;
		box-shadow: none;
		background: ${ colors.$color_white };
	}

	.Select-control {
		height: 48px;
		border-radius: 0;
	}
	
	.Select-placeholder {
		line-height: 48px
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
