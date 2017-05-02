import React from 'react';
import { createComponentWithIntl } from "../../utils";
import Downloads from '../../src/components/Downloads';
import SeoIcon from "../../src/icons/Yoast/Yoast_SEO_Icon_Small.svg";

test('The Downloads component matches the snapshot', () => {
	let downloads = [
		{
			product: "Yoast SEO",
			version: "version 4.7",
			iconSource: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
				{ label: "for Drupal",
					onButtonClick: () => {} },
			],
		}, {
			product: "Local SEO",
			version: "version 4.7",
			iconSource: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
			],
		}, {
			product: "Video SEO",
			version: "version 4.7",
			iconSource: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
				{ label: "for Drupal",
					onButtonClick: () => {} },
				{ label: "for Typo3",
					onButtonClick: () => {} },
			],
		}, {
			product: "News SEO",
			version: "version 4.7",
			iconSource: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
				{ label: "for Drupal",
					onButtonClick: () => {} },
				{ label: "for Typo3",
					onButtonClick: () => {} },
			],
		}, {
			product: "Yoast SEO for WooCommerce",
			version: "version 4.7",
			iconSource: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					onButtonClick: () => {} },
			],
		},
	];


	const component = createComponentWithIntl(
		<Downloads downloads={ downloads }/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
