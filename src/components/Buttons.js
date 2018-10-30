import React from "react";
import PropTypes from "prop-types";
import { LargeButtonLink, LargeIconButton } from "./Button.js";
import plus from "../icons/plus.svg";
import { defineMessages, injectIntl, FormattedMessage } from "react-intl";
import styled from "styled-components";
import NewTabMessage from "./NewTabMessage";

const messages = defineMessages( {
	addSite: {
		id: "suggestedActionAddsite",
		defaultMessage: "Add site",
	},
	visitShop: {
		id: "suggestedActionVisitShop",
		defaultMessage: "Shop",
	},
} );

const StyledAddSiteIconButton = styled( LargeIconButton )`
	margin-bottom: 2em;
`;

const StyledGoToButtonLink = styled( LargeButtonLink )`
	margin-bottom: 2em;
`;

/**
 * Renders the Add Site button.
 *
 * @param {object} props The props to use.
 *
 * @returns {ReactElement} The Add Site button.
 */
const AddSiteIconButtonBase = ( props ) => {
	return (
		<StyledAddSiteIconButton onClick={ props.onClick } iconSource={ plus }>
			<FormattedMessage id={ messages.addSite.id } defaultMessage={ messages.addSite.defaultMessage } />
		</StyledAddSiteIconButton>
	);
};

AddSiteIconButtonBase.propTypes = {
	onClick: PropTypes.func.isRequired,
};

/**
 * Renders the Visit Shop button link.
 *
 * @param {object} props The props to use.
 *
 * @returns {ReactElement} The Visit Shop button link.
 */
const GoToButtonLinkBase = ( props ) => {
	return (
		<StyledGoToButtonLink to={ props.url } linkTarget="_blank">
			<FormattedMessage id={ messages.visitShop.id } defaultMessage={ messages.visitShop.defaultMessage } />
			<NewTabMessage />
		</StyledGoToButtonLink>
	);
};

GoToButtonLinkBase.propTypes = {
	url: PropTypes.string.isRequired,
};

GoToButtonLinkBase.defaultProps = {
	url: "https://yoast.com/shop/",
};

export const AddSiteIconButton = injectIntl( AddSiteIconButtonBase );

export const GoToButtonLink = injectIntl( GoToButtonLinkBase );
