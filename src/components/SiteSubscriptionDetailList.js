import React from "react";
import CollapsibleHeader from "./CollapsibleHeader";
import SiteSubscriptionDetail from "./SiteSubscriptionDetail";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { Table, Zebra } from "./Tables";

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
			<Table headings={false} role="list">
				<Zebra>
					{ props.siteSubscriptions.map( ( subscription ) => {
						return <SiteSubscriptionDetail
							{ ...subscription }
							key={ subscription.id }
							onAddMoreSlotsClick={ props.onAddMoreSlotsClick }
							onMoreInfoClick={ props.onMoreInfoClick }
							onSettingsClick={ props.onSettingsClick }
							onToggleSubscription={ props.onToggleSubscription }
						/>;
					} ) }
				</Zebra>
			</Table>
		</CollapsibleHeader>
	);
}

SiteSubscriptionDetailList.propTypes = {
	siteSubscriptions: React.PropTypes.array,
	onAddMoreSlotsClick: React.PropTypes.func.isRequired,
	onMoreInfoClick: React.PropTypes.func.isRequired,
	onSettingsClick: React.PropTypes.func.isRequired,
	onToggleSubscription: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
};

SiteSubscriptionDetailList.defaultProps = {
	siteSubscriptions: [],
};

export default injectIntl( SiteSubscriptionDetailList );
