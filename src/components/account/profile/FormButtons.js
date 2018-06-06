import React from "react";
import styled from "styled-components";
import { LargeButton, LargeSecondaryButton } from "../../Button";
import { FormattedMessage, defineMessages } from "react-intl";
import { speak } from "@wordpress/a11y/build/index";
import _every from "lodash/every";

const messages = defineMessages( {
	discardChanges: {
		id: "discard.changes",
		defaultMessage: "Discard changes",
	},
	savePassword: {
		id: "password.save",
		defaultMessage: "Save password",
	},
	saveProfile: {
		id: "profile.save",
		defaultMessage: "Save profile",
	},
	saving: {
		id: "profile.saving",
		defaultMessage: "Saving...",
	},
	savedProfile: {
		id: "profile.saved",
		defaultMessage: "Profile saved",
	},
	savedPassword: {
		id: "profile.saved",
		defaultMessage: "Password saved",
	},
} );

const FormMessage = styled.span`
	padding: 0 1em 0 1em;
`;

const ButtonArea = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	flex-direction: row-reverse;
	width: 100%;
`;

const SaveButton = styled( LargeButton )`
	margin: 1em 0;
`;

const DiscardButton = styled( LargeSecondaryButton )`
	margin: 1em 0;
	margin-right: 1em;
`;

/**
 * Gets the save and discard button of a form, corresponding to its type.
 *
 * @param {ReactElement} savingMessage The feedback after pressed the save button.
 * @param {string} type The type of form.
 * @param {func} discardChanges The function to discard changes.
 *
 * @returns {ReactElement} The rendered ButtonArea component, including save and discard buttons.
 */
export function getFormButtons( savingMessage, type, discardChanges ) {
	let saveId = messages.savePassword.id;
	let saveDefaultMessage = messages.savePassword.defaultMessage;
	if( type === "profile" ) {
		saveId = messages.saveProfile.id;
		saveDefaultMessage = messages.saveProfile.defaultMessage;
	}

	let message = savingMessage;
	return (
		<ButtonArea>
			<SaveButton type="submit">
				<FormattedMessage id={ saveId } defaultMessage={ saveDefaultMessage }/>
			</SaveButton>
			<DiscardButton type="reset" onClick={ discardChanges }>
				<FormattedMessage id={messages.discardChanges.id} defaultMessage={messages.discardChanges.defaultMessage}/>
			</DiscardButton>
			{ message }
		</ButtonArea>
	);
}

/**
 * Whether a form is currently saving.
 *
 * @param { object } props The props of the form.
 *
 * @returns {boolean} Whether a form is saving.
 */
export function isSaving( props ) {
	return props ? props.isSaving : false;
}

/**
 * Whether a form is saved.
 *
 * @param { object } props The props of the form.
 * @param { object } state The state of the form.
 *
 * @returns {boolean} Whether a form is currently saving.
 */
export function isSaved( props, state ) {
	let ItemsInState = state ? Object.keys( state ) : [];
	return props ? props.isSaved && _every( ItemsInState, key => props[ key ] === state[ key ] ) : null;
}

/**
 * Adds feedback (savingMessage) to the form buttons.
 *
 * @param { object } props The props of the form.
 * @param { object } state The state of the form.
 * @param {string} type The type of form.
 * @param {func} discardChanges The function to discard changes.
 *
 * @returns {func} The function to get form buttons.
 */
export function getChangeButtons( props, state, type, discardChanges ) {
	let savingMessage;
	if ( isSaving( props ) || isSaved( props, state ) ) {
		let message = props.intl.formatMessage( isSaving( props ) ? messages.saving : messages.savedProfile );
		savingMessage = <FormMessage inline={ true }>{ message }</FormMessage>;
		speak( message, "assertive" );
	}
	return getFormButtons( savingMessage, type, discardChanges );
}

/**
 * Announces actions after pressing form buttons
 *
 * @param { object } props The props of the form.
 * @param { object } state The state of the form.
 * @param {string} type The type of form.
 *
 * @returns {void}
 */
export function announceActions( props, state, type ) {
	let message = "";

	if ( isSaving( props )  ) {
		message = props.intl.formatMessage( messages.saving );
	}

	if ( isSaved( props, state ) ) {
		let savedFormType = messages.savedPassword;
		if ( type === "profile" ) {
			savedFormType = messages.savedProfile;
		}
		message = props.intl.formatMessage( savedFormType );
	}

	speak( message, "assertive" );
}
