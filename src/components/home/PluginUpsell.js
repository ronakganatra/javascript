import LocalIcon from "../../icons/Yoast/Local_SEO_Icon_Small.svg";
import VideoIcon from "../../icons/Yoast/Video_SEO_Icon_Small.svg";
import WooIcon from "../../icons/Yoast/Woo_Icon_Small.svg";
import NewsIcon from "../../icons/Yoast/News_Icon_Small.svg";
import UpsellCardContent from "./UpsellCardContent";
import React from "react";

const pluginUpsellId = "plugin.upsell";
const pluginUpsellProps = [
	{
		icon: LocalIcon,
		description: {
			id: "local.description",
			defaultMessage: "Be found in Google Maps and local results.",
		},
		link: {
			name: "Local SEO",
			url: "https://yoast.com/wordpress/plugins/local-seo/",
		},
	},
	{
		icon: VideoIcon,
		description: {
			id: "video.description",
			defaultMessage: "Be found in Google Video search and enhance your video sharing on social media.",
		},
		link: {
			name: "Video SEO",
			url: "https://yoast.com/wordpress/plugins/video-seo/",
		},
	},
	{
		icon: WooIcon,
		description: {
			id: "woocommerce.description",
			defaultMessage: "Optimize your shop's SEO and sell more products!",
		},
		link: {
			name: "WooCommerce SEO",
			url: "https://yoast.com/wordpress/plugins/yoast-woocommerce-seo/",
		},
	},
	{
		icon: NewsIcon,
		description: {
			id: "news.description",
			defaultMessage: "Optimize your site for Google News",
		},
		link: {
			name: "News SEO",
			url: "https://yoast.com/wordpress/plugins/news-seo/",
		},
	},
];

const PluginUpsell = () => {
	return(
		<UpsellCardContent
			id={ pluginUpsellId }
			header={ {
				id: "header",
				defaultMessage: "Extend Yoast SEO",
			} }
			listPropsArray={ pluginUpsellProps }
		/>
	);
};

export default PluginUpsell;
