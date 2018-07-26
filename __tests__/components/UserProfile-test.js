import React from 'react';
import renderer from 'react-test-renderer';
import UserProfile from '../../src/components/UserProfile';
import { createComponentWithIntl } from "../../utils";

test('the user profile matches the snapshot', () => {
	const component = createComponentWithIntl(
		<UserProfile onLogoutClick={() => {}} displayEmail="This is an email" displayImage={ { src: "Image", size: "60px" } } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the user profile logout button handling an onclick event', () => {
	const component = createComponentWithIntl(
		<UserProfile onLogoutClick={(  ) => {}} displayEmail="This is an email" displayImage={ { src: "Image", size: "60px" } } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the onClick event on the logout button.
	tree.children[1].children[1].props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
