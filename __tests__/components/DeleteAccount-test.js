import React from 'react';
import { createComponentWithIntl } from "../../utils";

import DeleteAccount from "../../src/components/account/profile/dangerzone/DeleteAccount";

test('The delete account component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<DeleteAccount
			onDeleteProfile={ () => {} }
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('The delete profile button is labeled "Deleting your account" when deleting is in process', () => {
	const component = createComponentWithIntl(
		<DeleteAccount
			isDeleting={ true }
			onDeleteProfile={ () => {} }
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Clicking on the "Delete profile" button calls the onDeleteProfile callback.', () => {

	let mockedDeleteCallback = jest.fn();

	// Mock event, so that 'preventDefault' can be called.
	const mockEvent = {
		preventDefault: () => null
	};

	const component = createComponentWithIntl(
		<DeleteAccount
			onDeleteProfile={ mockedDeleteCallback }
		/>
	);

	let tree = component.toJSON();

	// Trigger the callback.
	let onSubmit = tree.props.onSubmit;
	onSubmit(mockEvent);

	expect(mockedDeleteCallback).toHaveBeenCalled();
});
