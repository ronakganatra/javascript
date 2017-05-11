import React from "react";
import CollapsibleHeader from "./CollapsibleHeader";
import SiteSubscriptionDetail from "./SiteSubscriptionDetail";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import { ListTable } from "./Tables";
import Paper from "./Paper";
import NoResults from "./NoResults";
import noSiteSubscriptionsImage from "./../images/noSiteSubscriptions.svg";

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
	let noSiteDetailParagraphs = [
		<FormattedMessage id="subscriptions.no-subscriptions.welcome" defaultMessage="Welcome to the Site Detail View" />,
		<FormattedMessage id="subscriptions.no-subscriptions.manage"
						  defaultMessage="Here you can easily activate any plugins you bought from us - but it looks like you don't have any yet!" />,
		<FormattedMessage id="subscriptions.no-subscriptions.press-button" defaultMessage="Press the button below to visit our shop and get your first product."/>,
	];
	if ( props.plugins.length > 0 ) {
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
								onToggleSubscription={ props.onToggleSubscription }
							/>;
						} ) }
					</ListTable>

				</CollapsibleHeader>
			</Paper>
		);
	}
	return (
		<Paper>
			<CollapsibleHeader title={ props.intl.formatMessage( messages.manageTitle ) } items={ props.siteSubscriptions } isOpen={ true }>
				<ListTable hasHeaderLabels={ false }>
					<NoResults paragraphs={ noSiteDetailParagraphs } onClick={ () => {
						window.open( "https://url-to-sto.re" ).bind( this );
					}
					} imageSource={ noSiteSubscriptionsImage }/>
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
};

SiteSubscriptionDetailList.defaultProps = {
	siteSubscriptions: [],
};

export default injectIntl( SiteSubscriptionDetailList );
