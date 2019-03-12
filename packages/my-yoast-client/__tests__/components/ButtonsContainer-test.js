import React from 'react';
import ButtonsContainer from "../../src/components/general/ButtonsContainer";
import renderer from 'react-test-renderer';

test('The ButtonsContainer component matches the snapshot', () => {
	const component = renderer.create(
		<ButtonsContainer>
			<a>link</a>
			<button>button</button>
		</ButtonsContainer>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
