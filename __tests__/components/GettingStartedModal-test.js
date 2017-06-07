import React from 'react';
import renderer from 'react-test-renderer';
import { createComponentWithIntl } from "../../utils";
import GettingStartedModal from '../../src/components/GettingStartedModal';

test('the closed Getting Started Modal matches the snapshot', () => {
	const component = createComponentWithIntl(
		<GettingStartedModal className="className" isOpen={ false } onClose={ () => {} } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the opened Getting Started Modal matches the snapshot', () => {
	const component = createComponentWithIntl(
		<GettingStartedModal className="className" isOpen={ true } onClose={ () => {} } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
