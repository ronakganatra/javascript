import React from "react";
import { FormattedMessage } from "react-intl";

/**
 * Returns the rendered Account Page component.
 *
 * @returns {ReactElement} The rendered account page.
 */
export default function NewTabMessage() {
	return (
		<span className="screen-reader-text">
			<FormattedMessage id="link.new-window" defaultMessage="(opens in a new browser's tab)" />
		</span>
	);
}
