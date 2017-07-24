import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import NewTabMessage from "../components/NewTabMessage";
import { LargeButton } from "../components/Button.js";

const PageContainer = styled.div`
	margin-top: 10vh;
	text-align: center;

	img {
		width: 540px;
		max-width: 100%;
		height: auto;

		display: block;
		margin: 0 auto;

		@media screen and ( max-width: 400px ) {
			max-width: 250px;
		}
		@media screen and ( min-width: 400px ) {
			max-width: 384px;
		}
	}

	a {
		font-size: 1.5em;
	}
`;


/**
 * Creates the Page  component
 *
 * @param {Object} props The props to use *
 * @returns {ReactElement} The rendered component.
 */
export default function LandingPage( props ) {
	return (
		<PageContainer>
			{ props.paragraphs.map( function( paragraph ) {
				return <p key={ paragraph.props.id }>{ paragraph }</p>;
			} ) }
			<p>
				<LargeButton onClick={ () => {
					window.open( props.url ).bind( this );
				} }>{ props.urlText }</LargeButton>
				<a href={ props.url } target="_blank">
					<NewTabMessage />
				</a>
			</p>
			<img src={ props.imageSource } alt="" />
		</PageContainer>
	);
}

LandingPage.propTypes = {
	paragraphs: PropTypes.arrayOf( PropTypes.element ),
	url: PropTypes.string,
	urlText: PropTypes.string,
	imageSource: PropTypes.string,
};
LandingPage.defaultProps = {
	paragraphs: [],
	url: "",
	urlText: "",
	imageSource: "",
};
