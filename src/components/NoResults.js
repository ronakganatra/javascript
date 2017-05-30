import React from "react";
import { LargeButton, LargeIconButton } from "../components/Button.js";
import plus from "../icons/plus.svg";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { defineMessages, injectIntl, FormattedMessage } from "react-intl";

const messages = defineMessages( {
	addSite: {
		id: "noresults-addsite",
		defaultMessage: "Add site",
	},
	addSubscriptions: {
		id: "noresults-addsubscription",
		defaultMessage: "Add subscription",
	},
	noOrders: {
		id: "noresults-shop",
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
				<LargeIconButton onClick={ onClick } iconSource={ plus }>
					<FormattedMessage id={ messages.addSite.id } defaultMessage={ messages.addSite.defaultMessage } />
				</LargeIconButton>
			);
		case "noOrders":
			return (
				<LargeButton onClick={ onClick } >
					<FormattedMessage id={ messages.noOrders.id } defaultMessage={ messages.noOrders.defaultMessage } />
				</LargeButton>
			);
		case "noSubscriptions":
			return (
				<LargeIconButton onClick={ onClick } iconSource={ plus }>
					<FormattedMessage id={ messages.addSubscriptions.id } defaultMessage={ messages.addSubscriptions.defaultMessage } />
				</LargeIconButton>
			);
	}
}

getNoResultsButton.propTypes = {
	onClick: React.PropTypes.func.isRequired,
	pageContext: React.PropTypes.string.isRequired,
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
	onClick: React.PropTypes.func.isRequired,
	paragraphs: React.PropTypes.arrayOf( React.PropTypes.element ),
	imageSource: React.PropTypes.string.isRequired,
	pageContext: React.PropTypes.string.isRequired,
};

NoResults.defaultProps = {
	paragraphs: [],
};
