import React from "react";
import ProfilePage from '../../src/components/ProfilePage';
import { createComponentWithIntl } from "../../utils";

describe( 'components/ProfilePage', () => {
	test('the default case', () => {
		const component = createComponentWithIntl(
			<ProfilePage
				email={ "test@test.test" }
				image="dummy.png"
				onUpdateEmail={ () => {} }
				onSaveProfile={ () => {} }
				onPasswordReset={ () => {} }/>
		);

		let tree = component.toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test('saving profile', () => {
		const component = createComponentWithIntl(
			<ProfilePage
				email="email@email.email"
				onUpdateEmail={ () => {} }
				onSaveProfile={ () => {} }
				onPasswordReset={ () => {} }
				isSaving={true} />
		);

		let tree = component.toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test('failure during profile save', () => {
		const component = createComponentWithIntl(
			<ProfilePage
				email="email@email.email"
				onUpdateEmail={ () => {} }
				onSaveProfile={ () => {} }
				onPasswordReset={ () => {} }
				error="An error occurred while saving profile." />
		);

		let tree = component.toJSON();
		expect( tree ).toMatchSnapshot();
	});

	test('sending password reset', () => {
		const component = createComponentWithIntl(
			<ProfilePage
				email="email@email.email"
				onUpdateEmail={ () => {} }
				onSaveProfile={ () => {} }
				onPasswordReset={ () => {} }
				isSendingPasswordReset={true} />
		);

		let tree = component.toJSON();
		expect( tree ).toMatchSnapshot();
	});

	test('has sent password reset', () => {
		const component = createComponentWithIntl(
			<ProfilePage
				email="email@email.email"
				onUpdateEmail={ () => {} }
				onSaveProfile={ () => {} }
				onPasswordReset={ () => {} }
				hasSendPasswordReset={true} />
		);

		let tree = component.toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test('failure during password reset', () => {
		const component = createComponentWithIntl(
			<ProfilePage
				email="email@email.email"
				onUpdateEmail={ () => {} }
				onSaveProfile={ () => {} }
				onPasswordReset={ () => {} }
				passwordResetError={"An error occurred while sending password reset."} />
		);

		let tree = component.toJSON();
		expect( tree ).toMatchSnapshot();
	} );
} );
