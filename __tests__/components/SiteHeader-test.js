import React from 'react';
import { createComponentWithIntl } from "../../utils";
import SiteHeader from '../../src/components/SiteHeader';

test('the site header matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SiteHeader name="placehold.it" url="http://placehold.it/" imageUrl="http://placehold.it/1480x380" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
