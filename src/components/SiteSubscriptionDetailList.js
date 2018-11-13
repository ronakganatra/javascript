import PropTypes from "prop-types";
import React from "react";
import CollapsibleHeader from "./CollapsibleHeader";
import SiteSubscriptionDetail from "./SiteSubscriptionDetail";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { ListTable } from "./Tables";
import { Paper } from "./PaperStyles";
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
						const onToggleDisabled = () => {
							return props.onToggleDisabled( plugin.storeUrl );
						};

						return <SiteSubscriptionDetail
							{ ...plugin }
							key={ plugin.glNumber || plugin.id }
							onMoreInfoClick={ props.onMoreInfoClick }
							onToggleDisabled={ onToggleDisabled }
							onToggleSubscription={ props.onToggleSubscription }
							modalOpen={ props.modalOpen }
							onClose={ props.onClose }
							onShop={ plugin.storeUrl }
							downloadModalOpen={ props.downloadModalOpen }
							onDownloadModalOpen={ props.onDownloadModalOpen }
							onDownloadModalClose={ props.onDownloadModalClose }
							downloadModalSubscriptionId={ props.downloadModalSubscriptionId }
							downloads={ props.downloads }
						/>;
					} ) }
				</ListTable>
			</CollapsibleHeader>
		</Paper>
	);
}

SiteSubscriptionDetailList.propTypes = {
	plugins: PropTypes.arrayOf( PropTypes.object ),
	onMoreInfoClick: PropTypes.func.isRequired,
	onToggleSubscription: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	modalOpen: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	onToggleDisabled: PropTypes.func.isRequired,
	downloadModalOpen: PropTypes.bool,
	onDownloadModalOpen: PropTypes.func,
	onDownloadModalClose: PropTypes.func,
	downloadModalSubscriptionId: PropTypes.string,
	downloads: PropTypes.arrayOf( PropTypes.object ),
};

export default injectIntl( SiteSubscriptionDetailList );
