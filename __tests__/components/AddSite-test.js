import React from 'react';
import renderer from 'react-test-renderer';
import AddSite from '../../src/components/AddSite';

import { Button } from '../../src/components/AddSite.js';

test('The AddSite component matches the snapshot', () => {
	const component = renderer.create(
		<AddSite />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

