import React from "react";
import styled from "styled-components";
import NewTabMessage from "../components/NewTabMessage";
import colors from "yoast-components/style-guide/colors.json";

const PageContainer = styled.div`
	margin-top: 10vh;
	text-align: center;

	img {
		width: 540px;
		max-width: 100%;
		height: auto;
		margin-top: 2em;
	}

	a {
		font-size: 1.5em;
		color: ${ colors.$color_blue };
	}
`;

/**
 * Creates the Page  component
 *
 * @param {Object} props The props to use
 *
 * @returns {ReactElement} The rendered component.
 */
export default function LandingPage( props ) {
	return (
		<PageContainer>
			<p>
				{ props.paragraphs.map( function( paragraph ) {
					return <p key={ paragraph.props.id }>{ paragraph }</p>;
				} ) }
				<a href={ props.url } target="_blank">
					{ props.urlText }
					<NewTabMessage />
				</a>
			</p>
			<img src={ props.imageSource } alt="" />
		</PageContainer>
	);
}

LandingPage.propTypes = {
	paragraphs: React.PropTypes.arrayOf( React.PropTypes.element ),
	url: React.PropTypes.string,
	urlText: React.PropTypes.string,
	imageSource: React.PropTypes.string,
};
LandingPage.defaultProps = {
	paragraphs: [],
	url: "",
	urlText: "",
	imageSource: "",
};
