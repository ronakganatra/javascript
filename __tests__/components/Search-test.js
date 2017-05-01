import React from 'react';
import { createComponentWithIntl } from "../../utils";

import Search from '../../src/components/Search';

test('the search component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Search
			id="search"
			searchLabel="Search"
			description="The search results will be updated as you type."
			descriptionId="search-description"
			onChange={ () => {} }
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the search component handling an on change', () => {
	const component = createComponentWithIntl(
		<Search
			id="search"
			searchLabel="Search"
			description="The search results will be updated as you type."
			descriptionId="search-description"
			onChange={ () => { return 'Query changed' } }
		/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();

	// manually trigger the callback.
	tree.children[1].props.onChange( { target: { value: 'new value' } } );

	// re-rendering
	tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
