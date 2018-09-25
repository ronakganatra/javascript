import LocalIcon from "../../icons/Yoast/Local_SEO_Icon_Small.svg";
import UpsellCard from "./UpsellCard";
import React from "react";

const academyUpsellId = "academy.upsell";
const academyUpsellProps = [
	{
		icon: LocalIcon,
		description: {
			id: "seoforwordpress.description",
			defaultMessage: "Don't waste time figuring out the best settings yourself.",
		},
		link: {
			name: "Yoast SEO for WordPress",
			url: "https://yoast.com/academy/yoast-seo-wordpress-training/",
		},
	},
	{
		icon: LocalIcon,
		description: {
			id: "copywriting.description",
			defaultMessage: "Write awesome copy that ranks.",
		},
		link: {
			name: "SEO copywriting",
			url: "https://yoast.com/academy/seo-copywriting-training/",
		},
	},
	{
		icon: LocalIcon,
		description: {
			id: "sitestructure.description",
			defaultMessage: "Learn how to improve your site structure to rank higher in Google.",
		},
		link: {
			name: "Site structure",
			url: "https://yoast.com/academy/site-structure-training/",
		},
	},
	{
		icon: LocalIcon,
		description: {
			id: "structureddata.description",
			defaultMessage: "Get your site ready for rich search results that bring in loads of customers.",
		},
		link: {
			name: "Structured data",
			url: "https://yoast.com/academy/structured-data-training/",
		},
	},
];

const AcademyUpsell = () => {
	return(
		<UpsellCard
			id={ academyUpsellId }
			header={ {
				id: "header",
				defaultMessage: "Improve your SEO skills",
			} }
			listPropsArray={ academyUpsellProps }
		/>
	);
};

export default AcademyUpsell;
