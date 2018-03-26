import React from 'react';
import YoastSelect from '../../src/components/YoastSelect';

test('The YoastSelect component matches the snapshot', () => {
	const component = <YoastSelect/>;

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

// test('an enabled toggle which matches the snapshot', () => {
// 	const component = createComponentWithIntl( <Toggle isEnabled={true} ariaLabel="Option" /> );
//
// 	let tree = component.toJSON();
// 	expect(tree).toMatchSnapshot();
// });


