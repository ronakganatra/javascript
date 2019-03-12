
import React from 'react';
import renderer from 'react-test-renderer';
import plus from "../../src/icons/plus.svg";
import { LargeIconButton } from '../../src/components/Button';

test('the round add button matches the snapshot', () => {
	const component = renderer.create(
		<LargeIconButton onClick={ () => {} } iconSource={ plus } >ButtonValue</LargeIconButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the round add button with button type given matches the snapshot', () => {
	const component = renderer.create(
		<LargeIconButton onClick={ () => {} } type="button" iconSource={ plus } >ButtonValue</LargeIconButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
