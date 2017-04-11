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
											   onMoreInfoClick={ props.onMoreInfoClick }
											   onSettingsClick={ props.onSettingsClick }
											   onToggleSubscription={ () => {
												   console.log( "toggled" );
											   } }
											   slots={ {
												   amountAvailable: subscription.slots.amountAvailable,
												   amountUsed: subscription.slots.amountUsed,
												   onAddMoreSlotsClick: subscription.slots.onAddMoreSlotsClick,
												   addMoreSlots: subscription.slots.addMoreSlots,
											   } }
											   productLogo={ subscription.productLogo }
				/>;
			} ) }
		</CollapsibleHeader>
	);
}

SiteSubscriptionDetailList.propTypes = {
	siteSubscriptions: React.PropTypes.array,
	onToggleSubscription: React.PropTypes.func.isRequired,
	onMoreInfoClick: React.PropTypes.func.isRequired,
	onSettingsClick: React.PropTypes.func.isRequired,
	slots: React.PropTypes.shape( {
		amountAvailable: React.PropTypes.number.isRequired,
		amountUsed: React.PropTypes.number,
		onAddMoreSlotsClick: React.PropTypes.func,
		addMoreSlots: React.PropTypes.string,
	} ).isRequired,
	productLogo: React.PropTypes.string.isRequired,
	intl: intlShape.isRequired,
};

SiteSubscriptionDetailList.defaultProps = {
	siteSubscriptions: [],
};

export default injectIntl( SiteSubscriptionDetailList );
