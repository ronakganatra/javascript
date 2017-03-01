
import styled from "styled-components";

import colors from "yoast-components/style-guide/colors.json";

export const Button = styled.button`
	background: ${colors.$color_blue};
	color: ${colors.$color_white};
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	font-size: 14px;
	text-transform: uppercase;
	padding: 15px;
	border: 0;
`;

export const GreenButton = styled(Button)`
	background: ${colors.$color_green};
`;
