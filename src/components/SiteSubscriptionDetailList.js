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
	return (
		<Paper>
			<CollapsibleHeader title={ props.intl.formatMessage( messages.manageTitle ) } items={ props.siteSubscriptions } isOpen={ true }>
				<ListTable hasHeaderLabels={ false }>
					{ props.plugins.map( ( plugin ) => {
						return <SiteSubscriptionDetail
							{ ...plugin }
							key={ plugin.id }
							onAddMoreLicensesClick={ props.onAddMoreLicensesClick }
							onMoreInfoClick={ props.onMoreInfoClick }
							onToggleDisabled={ props.onToggleDisabled }
							onSettingsClick={ props.onSettingsClick }
							onToggleSubscription={ props.onToggleSubscription }
							popupOpen={ props.popupOpen }
							onClose={ props.onClose }
							onUpgrade={ plugin.storeUrl }
						/>;
					} ) }
				</ListTable>
			</CollapsibleHeader>
		</Paper>
	);
}

SiteSubscriptionDetailList.propTypes = {
	siteSubscriptions: React.PropTypes.array,
	plugins: React.PropTypes.arrayOf( React.PropTypes.object ),
	onAddMoreLicensesClick: React.PropTypes.func.isRequired,
	onMoreInfoClick: React.PropTypes.func.isRequired,
	onToggleSubscription: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	popupOpen: React.PropTypes.bool,
	onClose: React.PropTypes.func.isRequired,
	onToggleDisabled: React.PropTypes.func.isRequired,
};

SiteSubscriptionDetailList.defaultProps = {
	siteSubscriptions: [],
};

export default injectIntl( SiteSubscriptionDetailList );
