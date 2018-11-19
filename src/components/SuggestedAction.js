import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { injectIntl } from "react-intl";

const SuggestedActionContainer = styled.div`
	color: ${ colors.$color_black };
	text-align: center;
	margin-top: 10vh;
`;

const SuggestedActionImage = styled.img`
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
 * The SuggestedAction component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered SuggestedAction component.
 * @constructor
 */
function SuggestedAction( props ) {
	const {
		paragraphs,
		imageSource,
	} = props;

	return (
		<SuggestedActionContainer>
			{ paragraphs && paragraphs.map( function( paragraph ) {
				return <p key={ paragraph.props.id }>{ paragraph }</p>;
			} ) }
			{ props.children }
			{ imageSource && <SuggestedActionImage src={ imageSource } alt="" /> }
		</SuggestedActionContainer>
	);
}

export default injectIntl( SuggestedAction );

SuggestedAction.propTypes = {
	paragraphs: PropTypes.arrayOf( PropTypes.element ),
	imageSource: PropTypes.string,
	children: PropTypes.any,
};

SuggestedAction.defaultProps = {
	paragraphs: [],
	imageSource: null,
	children: null,
};
