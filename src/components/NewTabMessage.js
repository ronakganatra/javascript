import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

const NewTabMessageContainer = styled.span`
	// Safari+VoiceOver bug see issue 445, 712, and yoast-components PR 308.
	transform: translateY(1em);
`;

/**
 * Returns the rendered Opens in a New Tab Message component.
 *
 * Note about recommended usage: use it as a value to pass to a react-intl
 * FormattedMessage placeholder or in any other way that the final result will
 * make this text inline with the text is added to.
 *
 * @returns {ReactElement} The rendered NewTabMessage component.
 */
export default function NewTabMessage() {
	return (
		<NewTabMessageContainer className="screen-reader-text">
			<FormattedMessage id="link.new-window" defaultMessage="(Opens in a new browser tab)" />
		</NewTabMessageContainer>
	);
}
