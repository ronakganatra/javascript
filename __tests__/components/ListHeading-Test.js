import React from 'react';
import renderer from 'react-test-renderer';

import { ListHeading } from '../../src/components/ListHeading';

test( 'the ListHeading matches the snapshot', () => {
	const component = renderer.create(
		<ListHeading>This is a heading</ListHeading>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
});
