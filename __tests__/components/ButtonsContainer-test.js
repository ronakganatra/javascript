import React from 'react';
import ButtonsContainer from "../../src/components/ButtonsContainer";

test('The AdministratorLoginStep component matches the snapshot', () => {
	const component = (
		<ButtonsContainer>
			<a>link</a>
			<button>button</button>
		</ButtonsContainer>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
