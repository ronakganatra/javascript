import React from 'react';
import { createComponentWithIntl } from "../../utils";
import Product from '../../src/components/Product';
import SeoIcon from "../../src/icons/Yoast/Yoast_SEO_Icon_Small.svg";

test( 'The Download component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Product key= "1" name="Yoast SEO" currentVersion={ "4.7" } icon={ SeoIcon }
			buttons={ [
				{ label: "for Wordpress", file: "http://example.org/plugin.zip" },
				{ label: "for Drupal", file: "http://example.org/plugin.zip" }
			] }/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
});

test( 'The Download component without a currentVersion matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Product key= "1" name="Yoast SEO" currentVersion={ "" } icon={ SeoIcon }
			buttons={ [
				{ label: "for Wordpress", file: "http://example.org/plugin.zip" },
				{ label: "for Drupal", file: "http://example.org/plugin.zip" }
			] }/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
});
