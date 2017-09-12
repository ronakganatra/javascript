import PropTypes from "prop-types";
import React from "react";
import CollapsibleHeader from "./CollapsibleHeader";
import SiteSubscriptionDetail from "./SiteSubscriptionDetail";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { ListTable } from "./Tables";
import Paper from "./Paper";
const messages = defineMessages( {
	manageTitle: {
		id: "siteSubscriptions.overview.title",
		defaultMessage: "Subscriptions",
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
		<Paper>
			<CollapsibleHeader title={ props.intl.formatMessage( messages.manageTitle ) } isOpen={ true }>
				<ListTable>
					{ props.plugins.map( ( plugin ) => {
						let onToggleDisabled = () => {
							return props.onToggleDisabled( plugin.storeUrl );
						};

						let onAddMoreSubscriptionsClick = () => {
							return props.onAddMoreSubscriptionsClick( plugin.storeUrl );
						};

						return <SiteSubscriptionDetail
							{ ...plugin }
							key={ plugin.glNumber }
							onAddMoreSubscriptionsClick={ onAddMoreSubscriptionsClick }
							onMoreInfoClick={ props.onMoreInfoClick }
							onToggleDisabled={ onToggleDisabled }
							onToggleSubscription={ props.onToggleSubscription }
							popupOpen={ props.popupOpen }
							onClose={ props.onClose }
							onShop={ plugin.storeUrl }
						/>;
					} ) }
				</ListTable>
			</CollapsibleHeader>
		</Paper>
	);
}

SiteSubscriptionDetailList.propTypes = {
	plugins: PropTypes.arrayOf( PropTypes.object ),
	onAddMoreSubscriptionsClick: PropTypes.func.isRequired,
	onMoreInfoClick: PropTypes.func.isRequired,
	onToggleSubscription: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	popupOpen: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	onToggleDisabled: PropTypes.func.isRequired,
};

export default injectIntl( SiteSubscriptionDetailList );
