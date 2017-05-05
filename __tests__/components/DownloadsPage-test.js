import React from 'react';
import DownloadsPage from '../../src/components/DownloadsPage';
import { createComponentWithIntl } from "../../utils";
import SeoIcon from "../../src/icons/Yoast/Yoast_SEO_Icon_Small.svg";

test( 'the downloads page component matches the snapshot', () => {
	let plugins = [
		{
			id: "1",
			category: "plugins",
			name: "Yoast SEO",
			currentVersion: "4.7",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
				{ label: "for Drupal",
					onButtonClick: () => {} },
				{ label: "for Typo3",
					onButtonClick: () => {} },
			],
		}, {
			id: "2",
			category: "plugins",
			name: "Local SEO",
			currentVersion: "4.7",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
			],
		}, {
			id: "3",
			category: "plugins",
			name: "Video SEO",
			currentVersion: "4.7",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
				{ label: "for Drupal",
					onButtonClick: () => {} },
				{ label: "for Typo3",
					onButtonClick: () => {} },
			],
		}, {
			id: "4",
			category: "plugins",
			name: "News SEO",
			currentVersion: "4.7",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
				{ label: "for Drupal",
					onButtonClick: () => {} },
				{ label: "for Typo3",
					onButtonClick: () => {} },
			],
		},
	];

	let eBooks = [
		{
			id: "5",
			category: "eBooks",
			name: "Yoast SEO for WooCommerce",
			currentVersion: "4.7",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
			],
		}, {
			id: "6",
			category: "eBooks",
			name: "Yoast SEO for WooCommerce",
			currentVersion: "4.7",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
			],
		}, {
			id: "7",
			category: "eBooks",
			name: "Yoast SEO for WooCommerce",
			currentVersion: "4.7",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
			],
		}, {
			id: "8",
			category: "eBooks",
			name: "Yoast SEO for WooCommerce",
			currentVersion: "4.7",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
			],
		},
	];

	const component = createComponentWithIntl(
		<DownloadsPage onSearchChange={ () => {} } eBooks={ eBooks } plugins={ plugins }/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
