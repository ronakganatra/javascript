import React from 'react';
import renderer from 'react-test-renderer';

import SkipLink from '../../src/components/SkipLink';

test('the skip link matches the snapshot', () => {
	const component = renderer.create(
		<SkipLink>LinkText</SkipLink>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
