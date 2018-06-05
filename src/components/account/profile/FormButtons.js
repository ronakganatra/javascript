import React from "react";
import styled from "styled-components";
import { LargeButton, LargeSecondaryButton } from "../../Button";
import { FormattedMessage, defineMessages } from "react-intl";

const messages = defineMessages( {
	discardChanges: {
		id: "discard.changes",
		defaultMessage: "Discard changes",
	},
	savePassword: {
		id: "password.save",
		defaultMessage: "Save password",
	},
} );

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
 * Returns the rendered Opens in a New Tab Message component.
 *
 * Note about recommended usage: use it as a value to pass to a react-intl
 * FormattedMessage placeholder or in any other way that the final result will
 * make this text inline with the text is added to.
 *
 * @param {ReactElement} savingMessage The feedback after pressed the save button.
 *
 * @returns {ReactElement} The rendered NewTabMessage component.
 */
export default function getFormButtons( savingMessage ) {
	let message = savingMessage;
	return (
		<ButtonArea>
			<SaveButton type="submit">
				<FormattedMessage id={messages.savePassword.id} defaultMessage={messages.savePassword.defaultMessage}/>
			</SaveButton>
			<DiscardButton type="reset">
				<FormattedMessage id={messages.discardChanges.id} defaultMessage={messages.discardChanges.defaultMessage}/>
			</DiscardButton>
			{ message }
		</ButtonArea>
	);
}
