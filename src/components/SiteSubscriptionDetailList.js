import React from "react";
import CollapsibleHeader from "./CollapsibleHeader";
import SiteSubscriptionDetail from "./SiteSubscriptionDetail";
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
function SiteSubscriptionDetailList( props ) {
	return (
		<CollapsibleHeader title={ props.intl.formatMessage( messages.manageTitle ) } items={ props.siteSubscriptions } isOpen={ true }>
			{ props.siteSubscriptions.map( ( subscription ) => {
				return <SiteSubscriptionDetail { ...subscription }
											   key={ subscription.productId }
											   onMoreInfoClick={ subscription.onMoreInfoClick }
											   onSettingsClick={ subscription.onSettingsClick }
											   onToggleSubscription={ subscription.onToggleSubscription }
											   slots={ subscription.productSlots }
											   productLogo={ subscription.productLogo }
				/>;
			} ) }
		</CollapsibleHeader>
	);
}

SiteSubscriptionDetailList.propTypes = {
	siteSubscriptions: React.PropTypes.array,
	intl: intlShape.isRequired,
};

SiteSubscriptionDetailList.defaultProps = {
	siteSubscriptions: [],
};

export default injectIntl( SiteSubscriptionDetailList );
