import React from "react";
import { RoundAddButton } from "../components/RoundButton";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

const NoResultsContainer = styled.div`
	color: ${ colors.$color_black };
	text-align: center;
	align: center;
	margin: 0;
`;

const NoResultsImage = styled.img`
	height: auto;
	display: block;
	margin: 0 auto;
		
	@media screen and ( max-width: 400px ) { 
		max-width: 250px;
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
				<RoundAddButton onClick={ props.onClick } />
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
