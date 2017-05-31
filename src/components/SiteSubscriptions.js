import React from "react";
import styled from "styled-components";

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
	isActive: React.PropTypes.bool.isRequired,
};

/**
 * Renders a subscriptions component.
 *
 * @param {Object} props The props to use.
 * @returns {ReactElement} The rendered Subscriptions component.
 */
export default function SiteSubscriptions( props ) {
	return (
		<span>
			{
				props.plugins.map( function( plugin ) {
					let isActive = false;
					props.activeSubscriptions.forEach( ( subscription ) => {
						if( plugin.ids.includes( subscription.productId ) ) {
							isActive = true;
						}
					} );

					return (
						<SiteSubscriptionIcons
							key={ plugin.glNumber }
							src={ plugin.icon }
							isActive={ isActive }
							alt={ isActive ? plugin.name + " is active" : plugin.name + " is inactive" }
						/>
					);
				} )
			}
		</span>
	);
}

SiteSubscriptions.propTypes = {
	activeSubscriptions: React.PropTypes.arrayOf( React.PropTypes.object ),
	plugins: React.PropTypes.arrayOf( React.PropTypes.object ),
};

SiteSubscriptions.defaultProps = {
	activeSubscriptions: [],
	plugins: [],
};
