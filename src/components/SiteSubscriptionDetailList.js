import React from "react";
import CollapsibleHeader from "./CollapsibleHeader";
import SiteSubscriptionDetail from "./SiteSubscriptionDetail";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { ListTable } from "./Tables";
import Paper from "./Paper";

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
	console.log( "SiteSubscriptiopnDetail", props );
	return (
		<Paper>
			<CollapsibleHeader title={ props.intl.formatMessage( messages.manageTitle ) } items={ props.siteSubscriptions } isOpen={ true }>
				<ListTable hasHeaderLabels={ false }>
					{ props.siteSubscriptions.map( ( subscription ) => {
						return <SiteSubscriptionDetail
							{ ...subscription }
							key={ subscription.id }
							name={ subscription.productId }
							onAddMoreSlotsClick={ props.onAddMoreSlotsClick }
							onMoreInfoClick={ props.onMoreInfoClick }
							onClick={ props.onToggleSubscription }
							onSettingsClick={ props.onSettingsClick }
							onToggleSubscription={ props.onToggleSubscription }
							popupOpen={ props.popupOpen }
							onClose={ props.onClose }
							onUpgrade={ subscription.product.storeUrl }
						/>;
					} ) }
				</ListTable>
			</CollapsibleHeader>
		</Paper>
	);
}

SiteSubscriptionDetailList.propTypes = {
	siteSubscriptions: React.PropTypes.array,
	onAddMoreSlotsClick: React.PropTypes.func.isRequired,
	onMoreInfoClick: React.PropTypes.func.isRequired,
	onSettingsClick: React.PropTypes.func.isRequired,
	onToggleSubscription: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	popupOpen: React.PropTypes.bool,
	onClose: React.PropTypes.func.isRequired,
	onUpgrade: React.PropTypes.func.isRequired,
};

SiteSubscriptionDetailList.defaultProps = {
	siteSubscriptions: [],
};

export default injectIntl( SiteSubscriptionDetailList );
