import styled from "styled-components";

import colors from "yoast-components/style-guide/colors.json";

export const Layout = styled.div`
	display: flex;
	min-height: 100%;
`;

export const Sidebar = styled.section`
	flex: 0 0 300px;
	background-color: ${colors.$color_pink_dark};
`;

export const Content = styled.section`
	flex: 1 1 auto;
	background: ${colors.$palette_grey_light};
	padding: 25px 70px;
`;
