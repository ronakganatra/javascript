import React from "react";
import { FormattedMessage } from "react-intl";

/**
 * Returns the rendered Opens in a New Tab Message component.
 *
 * @returns {ReactElement} The rendered NewTabMessage component.
 */
export default function NewTabMessage() {
	return (
		<span>{ " " }<span className="screen-reader-text">
			<FormattedMessage id="link.new-window" defaultMessage="(Opens in a new browser tab)" />
		</span></span>
	);
}
