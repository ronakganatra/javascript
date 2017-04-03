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

const SiteSubscriptionIcons = styled.span`
	background-image: url(${ props => props.image });
	opacity: ${ props => props.isActive ? 1.0 : 0.2 };
	width: 40px;
	height: 40px;
	float: left;
	margin: 0 5px;
`;

SiteSubscriptionIcons.propTypes = {
	image: React.PropTypes.string.isRequired,
	isActive: React.PropTypes.bool.isRequired,
};

/**
 * Renders a subscriptions component.
 *
 * @param {Object} props The props to use.
 * @returns {XML} The rendered Subscriptions component.
 */
export default function SiteSubscriptions( props ) {
	return (
		<div>
			{
				Object.keys( YoastProducts ).map( function( productName ) {
					let isActive = props.activeSubscriptions.includes( productName );
					let product = YoastProducts[ productName ];

					return (
						<SiteSubscriptionIcons
							key={ productName }
							image={ product.image }
							isActive={ isActive }
							aria-label={ isActive ? product.name + " is active" : product.name + " is inactive" }
							role="img"
						/>
					);
				} )
			}
		</div>
	);
}

SiteSubscriptions.propTypes = {
	activeSubscriptions: React.PropTypes.arrayOf( React.PropTypes.string ),
};

SiteSubscriptions.defaultProps = {
	activeSubscriptions: [],
};
