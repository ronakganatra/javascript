import React from 'react';
import PageNotFound from '../../src/components/PageNotFound';
import { createComponentWithIntl } from "../../utils";

test('the page not found component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<PageNotFound />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
