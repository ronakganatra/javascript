import React from "react";
import styled from "styled-components";
import { LargeButton, LargeSecondaryButton } from "../../Button";
import { FormattedMessage, defineMessages } from "react-intl";
import { speak } from "@wordpress/a11y/build/index";
import { capitalizeFirstLetter } from "../../../functions/stringHelpers";

const messages = defineMessages( {
	discardChanges: {
		id: "discard.changes",
		defaultMessage: "Discard changes",
	},
	saving: {
		id: "change.saving",
		defaultMessage: "Saving...",
	},
	saved: {
		id: "change.saved",
		defaultMessage: "{type} saved",
	},
	saveButton: {
		id: "change.save.button",
		defaultMessage: "Save {type}",
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
 * Gets the message related to save actions.
 *
 * @param {boolean} isSaving Whether the form is currently in the progress of saving.
 * @param {boolean} isSaved Whether the form has been saved.
 * @param {string} type The type of form.
 * @param {*} intl To format messages.
 *
 * @returns {string} The message to be shown ("Saving.." or "{type} saved.").
 */
function getMessage( isSaving, isSaved, type, intl ) {
	let message = "";
	if ( isSaving ) {
		message = intl.formatMessage( messages.saving );
	} else if ( isSaved ) {
		message = intl.formatMessage( messages.saved, { type: type } );
	}
	return capitalizeFirstLetter( message );
}

/**
 * Generates a row of buttons to save or discard changes in a form.
 *
 * @param {string} type The type of form, e.g. "password" or "profile".
 * @param {*} intl To format messages.
 * @param {boolean} isSaving Whether the form is currently in the progress of saving.
 * @param {boolean} isSaved Whether the form has been saved.
 * @param {function} discardChanges Callback function to call when the discard button is pressed.
 *
 * @returns {React.Component} The component with the change buttons.
 */
export function getChangeButtons( type, intl, isSaving, isSaved, discardChanges ) {
	let message = getMessage( isSaving, isSaved, type, intl );
	speak( message, "assertive" );

	return (
		<ButtonArea>
			<SaveButton type="submit">
				<FormattedMessage id={ messages.saveButton.id }
				                  defaultMessage={ messages.saveButton.defaultMessage }
				                  values={ { type: type } }
				/>
			</SaveButton>
			<DiscardButton type="reset" onClick={ discardChanges }>
				<FormattedMessage id={messages.discardChanges.id} defaultMessage={messages.discardChanges.defaultMessage}/>
			</DiscardButton>
			<FormMessage inline={ true }>{ message }</FormMessage>
		</ButtonArea>
	);
}

/**
 * Announces actions after pressing form buttons
 *
 * @param {bool} isSaving Whether the form is currently in the progress of saving.
 * @param {bool} isSaved Whether the form has been saved.
 * @param {string} type The type of form.
 * @param {*} intl To format messages.
 *
 * @returns {void}
 */
export function announceActions( isSaving, isSaved, type, intl ) {
	let message = getMessage( isSaving, isSaved, type, intl );
	speak( message, "assertive" );
}
