import React from 'react';
import renderer from 'react-test-renderer';
import YoastSelect from '../../src/components/general/YoastSelect';

const options = [
	{ value: "No plugin", label: "No plugin" },
	{ value: "HeadSpace2", label: "HeadSpace2" },
	{ value: "All-in-One SEO", label: "All-in-One SEO" },
	{ value: "JetPack SEO", label: "JetPack SEO" },
	{ value: "WooThemes SEO framework", label: "WooThemes SEO framework" },
];

test('The YoastSelect component matches the snapshot', () => {
	const component = renderer.create( <YoastSelect options={ options }/> );

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test ( 'The YoastSelect with placeholder matches the snapshot', () => {
	const component = renderer.create( <YoastSelect options={ options } placeholder="No plugin selected"/> );

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test ( 'The YoastSelect with placeholder and value matches the snapshot', () => {
	const component = renderer.create( <YoastSelect value="HeadSpace2" options={ options } placeholder="No plugin selected"/> );

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
