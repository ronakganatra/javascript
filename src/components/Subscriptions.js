import React from "react";

import styled from "styled-components";

import SeoIcon from "../icons/Yoast/Yoast_SEO_Icon_Small.svg";
import LocalIcon from "../icons/Yoast/Local_SEO_Icon_Small.svg";
import NewsIcon from "../icons/Yoast/News_Icon_Small.svg";
import VideoIcon from "../icons/Yoast/Video_SEO_Icon_Small.svg";
import WooIcon from "../icons/Yoast/Woo_Icon_Small.svg";
import LocalWooIcon from "../icons/Yoast/Local_Woo_Icon_Small.svg";

let YoastProducts = {
	seo: { name: "Yoast SEO", image: SeoIcon },
	local: { name: "Local SEO", image: LocalIcon },
	video: { name: "Video SEO", image: VideoIcon },
	news: { name: "News SEO", image: NewsIcon },
	woo: { name: "WooCommerce SEO", image: WooIcon },
	localwoo: { name: "Local SEO for Woo", image: LocalWooIcon },
};

const Subscription = styled.div`
	background-image: url(${ props => props.image });
	opacity: ${ props => props.isActive ? 1.0 : 0.2 };
	width: 50px;
	height: 50px;
	float: left;
	margin: 5px;
`;

Subscription.propTypes = {
	image: React.PropTypes.string.isRequired,
	isActive: React.PropTypes.bool.isRequired,
};

/**
 * Renders a subscriptions component.
 *
 * @param {Object} props The props to use.
 * @returns {XML} The rendered Subscriptions component.
 */
export default function Subscriptions( props ) {
	return (
		<div>
			{
				Object.keys( YoastProducts ).map( function( productName ) {
					return (
						<Subscription
							key={productName}
							image={ YoastProducts[ productName ].image }
							isActive={ props.activeSubscriptions.includes( productName ) }
						/>
					);
				} )
			}
		</div>
	);
}

Subscriptions.propTypes = {
	activeSubscriptions: React.PropTypes.arrayOf( React.PropTypes.string ),
};
