import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

export const Layout = styled.div`
	display: flex;
	min-height: 100%;

	@media screen and ( max-width: 1024px ) {
		display: block;
		min-height: 0;
	}
`;

export const Sidebar = styled.div`
	flex: 0 0 300px;
	background-color: ${colors.$color_pink_dark};

	@media screen and ( max-width: 1024px ) {
		position: fixed;
		z-index: 1;
		width: 100%;
		height: 74px;
		bottom: 0;
	}

	@media screen and ( max-width: 1024px ) {
		& header,
		& .user-info {
		 display: none;
		}
	}
`;

export const Main = styled.main`
	flex: 1 1 auto;
	background: ${colors.$color_grey_light};
	margin: 0 2%;
	padding: 40px 0;

	@media screen and ( max-width: 1024px ) {
		margin: 4% 4% 0 4%;
		padding: 0 0 100px 0;
		position: relative;
		z-index: 0;
	}
`;

export const Content = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;

Main.propTypes = {
	id: React.PropTypes.string,
};

Main.defaultProps = {
	id: "content",
};
