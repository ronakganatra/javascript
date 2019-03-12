
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';
import { BackButtonLink } from '../../src/components/Button';

test('the round back button matches the snapshot', () => {
	const component = renderer.create(
		<Router>
			<BackButtonLink to="/" >ButtonValue</BackButtonLink>
		</Router>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the round back button with button type given matches the snapshot', () => {
	const component = renderer.create(
		<Router>
			<BackButtonLink to="/" type="button">ButtonValue</BackButtonLink>
		</Router>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
