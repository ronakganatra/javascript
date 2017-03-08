import styled from "styled-components";

import colors from "yoast-components/style-guide/colors.json";

export const Layout = styled.div`
	display: flex
	height: 100%;
`;

export const Sidebar = styled.section`
	background-color: #a22c6a;
	width: 33%;
`;

export const Content = styled.section`
	width: 67%;
	background: ${colors.$palette_grey_light};
	padding: 25px;
`;
