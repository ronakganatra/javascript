import React from 'react';
import YoastSelect from '../../src/components/YoastSelect';

test('The YoastSelect component matches the snapshot', () => {
	const component = <YoastSelect/>;

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test ( 'An opened YoastSelect which matches the snapshot', () => {
	const component = <YoastSelect openOnClick={ true } placeholder="No plugin selected"/>

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});



