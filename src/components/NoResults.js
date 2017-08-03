import PropTypes from "prop-types";
import React from "react";
import { LargeButton, LargeIconButton } from "../components/Button.js";
import plus from "../icons/plus.svg";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { defineMessages, injectIntl, FormattedMessage } from "react-intl";

const messages = defineMessages( {
	addSite: {
		id: "noresultsAddsite",
		defaultMessage: "Add site",
	},
	visitShop: {
		id: "noresultsVisitShop",
		defaultMessage: "Shop",
	},
} );

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

const NoResultsIconButton = styled( LargeIconButton )`
	margin-bottom: 2em;
`;

const NoResultsButton = styled( LargeButton )`
	margin-bottom: 2em;
`;

/**
 * A function that modifies the button on the noResults page, depending on the context.
 *
 *  @param { function } onClick The onClick function that goes with the button.
 * @param { string } pageContext The context of the noResults page.
 *
 * @returns { ReactElement } The button on the noResults page.
 */
function getNoResultsButton( onClick, pageContext ) {
	switch ( pageContext ) {
		case "noSites":
			return (
				<NoResultsIconButton onClick={ onClick } iconSource={ plus }>
					<FormattedMessage id={ messages.addSite.id } defaultMessage={ messages.addSite.defaultMessage } />
				</NoResultsIconButton>
			);
		case "noOrders":
		case "noSubscriptions":
			return (
				<NoResultsButton onClick={ onClick } >
					<FormattedMessage id={ messages.visitShop.id } defaultMessage={ messages.visitShop.defaultMessage } />
				</NoResultsButton>
			);
	}
}

getNoResultsButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	pageContext: PropTypes.string.isRequired,
};

/**
 * The NoResults component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered NoResults component.
 * @constructor
 */
function NoResults( props ) {
	return (
		<NoResultsContainer>
			{ props.paragraphs.map( function( paragraph ) {
				return <p key={ paragraph.props.id }>{ paragraph }</p>;
			} ) }
			{ getNoResultsButton( props.onClick, props.pageContext ) }
			<NoResultsImage src={ props.imageSource } alt="" />
		</NoResultsContainer>
	);
}

export default injectIntl( NoResults );

NoResults.propTypes = {
	onClick: PropTypes.func.isRequired,
	paragraphs: PropTypes.arrayOf( PropTypes.element ),
	imageSource: PropTypes.string.isRequired,
	pageContext: PropTypes.string.isRequired,
};

NoResults.defaultProps = {
	paragraphs: [],
};
