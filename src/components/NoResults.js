import React from "react";
import { LargeIconButton } from "../components/Button.js";
import plus from "../icons/plus.svg";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

const NoResultsContainer = styled.div`
	color: ${ colors.$color_black };
	text-align: center;
	align: center;
	margin-top: 10vh;
`;

const NoResultsImage = styled.img`
	height: auto;
	display: block;
	margin: 0 auto;
		
	@media screen and ( max-width: 400px ) { 
		max-width: 240px;
	}
	@media screen and ( min-width: 400px ) { 
		max-width: 384px;
	}
`;

/**
 * The NoResults component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered NoResults component.
 * @constructor
 */
export default function NoResults( props ) {
	return (
		<NoResultsContainer>
			{ props.paragraphs.map( function( paragraph ) {
				return <p key={ paragraph.props.id }>{ paragraph }</p>;
			} ) }
				<LargeIconButton onClick={ props.onClick } iconSource={ plus }>
					Add site
				</LargeIconButton>
			<NoResultsImage src={ props.imageSource } alt="" />
		</NoResultsContainer>
	);
}

NoResults.propTypes = {
	onClick: React.PropTypes.func.isRequired,
	paragraphs: React.PropTypes.arrayOf( React.PropTypes.element ),
	imageSource: React.PropTypes.string.isRequired,
};

NoResults.defaultProps = {
	paragraphs: [],
};
