import React from "react";
import ListToggle from "./ListToggle";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const messages = defineMessages( {
	manageTitle: {
		id: "site_subscriptions.overview.title",
		defaultMessage: "Manage subscriptions",
	},
} );

/**
 * Creates Site Subscriptions container element
 *
 * @param {object} props Properties for this element.
 * @returns {ReactElement} SiteSubscriptions element.
 * @constructor
 */
function SiteSubscriptions( props ) {
	return (
		<ListToggle title={ props.intl.formatMessage( messages.manageTitle ) } items={ props.siteSubscriptions } />
	);
}

SiteSubscriptions.propTypes = {
	siteSubscriptions: React.PropTypes.array,
	intl: intlShape.isRequired,
};

SiteSubscriptions.defaultProps = {
	siteSubscriptions: [],
};

export default injectIntl( SiteSubscriptions );
