import React from 'react';
import { createComponentWithIntl } from "../../utils";
import Products from '../../src/components/Products';
import SeoIcon from "../../src/icons/Yoast/Yoast_SEO_Icon_Small.svg";

test( 'The Products component matches the snapshot', () => {
	let products = [
		{
			glNumber: "111",
			id: "1",
			name: "Yoast SEO",
			currentVersion: "4.7",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
				{ label: "for Drupal",
					onButtonClick: () => {} },
			],
		}, {
			glNumber: "222",
			id: "2",
			name: "Local SEO",
			currentVersion: "4.7",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
			],
		}, {
			glNumber: "333",
			id: "3",
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
			glNumber: "444",
			id: "4",
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
		}, {
			glNumber: "555",
			id: "5",
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
		<Products products={ products } heading="Products" byLine={ <span> - Buy here!</span> }/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
});
