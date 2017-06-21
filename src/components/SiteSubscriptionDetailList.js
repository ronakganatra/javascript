import PropTypes from "prop-types";
import React from "react";
import CollapsibleHeader from "./CollapsibleHeader";
import SiteSubscriptionDetail from "./SiteSubscriptionDetail";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { ListTable } from "./Tables";
import Paper from "./Paper";
const messages = defineMessages( {
	manageTitle: {
		id: "site_subscriptions.overview.title",
		defaultMessage: "Subscriptions",
	},
	subtitle: {
		id: "site_subscriptions.overview.subtitle",
		defaultMessage: "Active subscriptions for this site. If you don't have any subscriptions left, use the link to get additional subscriptions.",
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
			<CollapsibleHeader title={ props.intl.formatMessage( messages.manageTitle ) } subtitle={ props.intl.formatMessage( messages.subtitle ) } items={ props.siteSubscriptions } isOpen={ true }>
				<ListTable>
					{ props.plugins.map( ( plugin ) => {
						let onToggleDisabled = () => {
							return props.onToggleDisabled( plugin.id );
						};
						let onAddMoreLicensesClick = () => {
							return props.onAddMoreLicensesClick( plugin.id );
						};

						return <SiteSubscriptionDetail
							{ ...plugin }
							key={ plugin.glNumber }
							onAddMoreLicensesClick={ onAddMoreLicensesClick }
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
	siteSubscriptions: PropTypes.array,
	plugins: PropTypes.arrayOf( PropTypes.object ),
	onAddMoreLicensesClick: PropTypes.func.isRequired,
	onMoreInfoClick: PropTypes.func.isRequired,
	onToggleSubscription: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	popupOpen: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	onToggleDisabled: PropTypes.func.isRequired,
};

SiteSubscriptionDetailList.defaultProps = {
	siteSubscriptions: [],
};

export default injectIntl( SiteSubscriptionDetailList );
