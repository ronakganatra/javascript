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
				onDeleteProfile={ () => {} }
				onPasswordReset={ () => {} }
				onNewsletterSubscribe={ () => {} }
				onNewsletterUnsubscribe={ () => {} }
				onCreateTokenModalOpen={ () => {} }
				onCreateTokenModalClose={ () => {} }
				composerTokens={ [] }
			/>
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
				onDeleteProfile={ () => {} }
				onPasswordReset={ () => {} }
				onNewsletterSubscribe={ () => {} }
				onNewsletterUnsubscribe={ () => {} }
				isSaving={true}
				composerTokens={ [] }
			/>
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
				onDeleteProfile={ () => {} }
				onPasswordReset={ () => {} }
				onNewsletterSubscribe={ () => {} }
				onNewsletterUnsubscribe={ () => {} }
				saveEmailError={ {} }
				composerTokens={ [] }
			/>
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
				onDeleteProfile={ () => {} }
				onPasswordReset={ () => {} }
				onNewsletterSubscribe={ () => {} }
				onNewsletterUnsubscribe={ () => {} }
				isSendingPasswordReset={ true }
				composerTokens={ [] }
			/>
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
				onDeleteProfile={ () => {} }
				onPasswordReset={ () => {} }
				onNewsletterSubscribe={ () => {} }
				onNewsletterUnsubscribe={ () => {} }
				hasSendPasswordReset={ true }
				composerTokens={ [] }
			/>
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
				onDeleteProfile={ () => {} }
				onPasswordReset={ () => {} }
				onNewsletterSubscribe={ () => {} }
				onNewsletterUnsubscribe={ () => {} }
				passwordResetError={ { error: "I'm an error" } }
				composerTokens={ [] }
			/>
		);

		let tree = component.toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test('while deleting the account', () => {
		const component = createComponentWithIntl(
			<ProfilePage
				email="email@email.email"
				isDeleting={ true }
				onUpdateEmail={ () => {} }
				onSaveProfile={ () => {} }
				onDeleteProfile={ () => {} }
				onPasswordReset={ () => {} }
				onNewsletterSubscribe={ () => {} }
				onNewsletterUnsubscribe={ () => {} }
				passwordResetError={ null }
				composerTokens={ [] }
			/>
		);

		let tree = component.toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test('If there are active composer tokens', () => {
		const component = createComponentWithIntl(
			<ProfilePage
				email="email@email.email"
				isDeleting={ false }
				onUpdateEmail={ () => {} }
				onSaveProfile={ () => {} }
				onDeleteProfile={ () => {} }
				onPasswordReset={ () => {} }
				onNewsletterSubscribe={ () => {} }
				onNewsletterUnsubscribe={ () => {} }
				passwordResetError={ null }
				composerTokens={ [ {
					enabled: true,
					id: "1",
					name: "abc",
				} ] }
			/>
		);

		let tree = component.toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test('If there are deleted composer tokens', () => {
		const component = createComponentWithIntl(
			<ProfilePage
				email="email@email.email"
				isDeleting={ false }
				onUpdateEmail={ () => {} }
				onSaveProfile={ () => {} }
				onDeleteProfile={ () => {} }
				onPasswordReset={ () => {} }
				onNewsletterSubscribe={ () => {} }
				onNewsletterUnsubscribe={ () => {} }
				passwordResetError={ null }
				composerTokens={ [ {
					enabled: false,
					id: "1",
					name: "abc",
				} ] }
			/>
		);

		let tree = component.toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test('When subscribed to the newsletter', () => {
		const component = createComponentWithIntl(
			<ProfilePage
				email="email@email.email"
				isDeleting={ false }
				onUpdateEmail={ () => {} }
				onSaveProfile={ () => {} }
				onDeleteProfile={ () => {} }
				onPasswordReset={ () => {} }
				onNewsletterSubscribe={ () => {} }
				onNewsletterUnsubscribe={ () => {} }
				passwordResetError={ null }
				composerTokens={ [] }
				newsletterSubscribed="subscribed"
			/>
		);

		let tree = component.toJSON();
		expect( tree ).toMatchSnapshot();
	} );
} );
