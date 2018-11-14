import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import util from "util";

const messages = defineMessages( {
	active: {
		id: "siteSubscriptions.subscription.active",
		defaultMessage: "%s is active",
	},
	inactive: {
		id: "siteSubscriptions.subscription.inactive",
		defaultMessage: "%s is inactive",
	},
} );

const SiteSubscriptionIcons = styled.img`
	opacity: ${ props => props.isActive ? 1.0 : 0.2 };
	width: 40px;
	height: 40px;
	float: left;
	margin-right: 10px;

	&:nth-child(n+7) {
		margin-top: 10px;
	}
`;

SiteSubscriptionIcons.propTypes = {
	isActive: PropTypes.bool.isRequired,
};

/**
 * Renders a subscriptions component.
 *
 * @param {Object} props The props to use.
 * @returns {ReactElement} The rendered Subscriptions component.
 */
function SiteSubscriptions( props ) {
	return (
		<span>
			{
				props.plugins.map( function( plugin ) {
					let isActive = false;
					props.activeSubscriptions.forEach( ( subscription ) => {
						let products = subscription.product;

						if ( ! Array.isArray( products ) ) {
							products = [ products ];
						}
						const productIds = products.map( product => product.id );
						if ( plugin.ids.some( id => productIds.includes( id ) ) ) {
							isActive = true;
						}
					} );

					return (
						<SiteSubscriptionIcons
							key={ plugin.glNumber }
							src={ plugin.icon }
							isActive={ isActive }
							alt={ isActive ? util.format( props.intl.formatMessage( messages.active ), plugin.name ) : util.format( props.intl.formatMessage( messages.inactive ), plugin.name )  }
						/>
					);
				} )
			}
		</span>
	);
}

SiteSubscriptions.propTypes = {
	activeSubscriptions: PropTypes.arrayOf( PropTypes.object ),
	plugins: PropTypes.arrayOf( PropTypes.object ),
	intl: intlShape.isRequired,
};

SiteSubscriptions.defaultProps = {
	activeSubscriptions: [],
	plugins: [],
};

export default injectIntl( SiteSubscriptions );
