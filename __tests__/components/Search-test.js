
import React from 'react';
import renderer from 'react-test-renderer';

import Search from '../../src/components/Search';

test('the search component matches the snapshot', () => {
	const component = renderer.create(
		<Search
			id="search"
			placeholder="Search"
			description="The search results will be updated as you type."
			descriptionId="searchDescription"
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
