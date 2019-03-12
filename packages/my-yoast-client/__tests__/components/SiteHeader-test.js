import React from 'react';
import { createComponentWithIntl } from "../../utils";
import SiteHeader from '../../src/components/SiteHeader';
import { MemoryRouter } from "react-router-dom";

test('the site header matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<SiteHeader name="placehold.it" url="http://placehold.it/" imageUrl="http://placehold.it/1480x380" adminButton={ true } />
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
