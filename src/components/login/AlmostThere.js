import React from "react";
import { injectIntl, intlShape, defineMessages } from "react-intl";

// Components.
import LoginMessage from "./LoginMessage";

const messages = defineMessages( {
	message: {
		id: "AlmostThere.message",
		defaultMessage: "We just sent you an email, so check your inbox! " +
		"Click the link inside the email to activate your account. After that you can access MyYoast.",
	},
	header: {
		id: "AlmostThere.header",
		defaultMessage: "Almost there!",
	},
} );

/**
 * Shows an "Almost there" login message.
 */
class AlmostThere extends React.Component {
	render() {
		return <LoginMessage { ...messages } />;
	}
}

export default injectIntl( AlmostThere );

AlmostThere.propTypes = {
	intl: intlShape.isRequired,
};

AlmostThere.defaultProps = {};
