import React from 'react';
import { shallow } from 'enzyme';
import { createComponentWithIntl } from "../../utils";

import Site from '../../src/components/Site';

test('the site component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Site activeSubscriptions={ [ "woo", "video" ] } siteName="yoast.com" siteIcon="" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

