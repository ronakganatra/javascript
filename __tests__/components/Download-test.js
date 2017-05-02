import React from 'react';
import { createComponentWithIntl } from "../../utils";
import Download from '../../src/components/Download';
import SeoIcon from "../../src/icons/Yoast/Yoast_SEO_Icon_Small.svg";

test('The Download component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Download product="Yoast SEO" version="version 4.7" iconSource={ SeoIcon }
				  buttons={ [ { label: "for Wordpress", onButtonClick: () => {} }, { label: "for Drupal", onButtonClick: () => {} } ] }/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
