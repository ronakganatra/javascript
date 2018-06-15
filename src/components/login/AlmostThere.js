import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape, defineMessages } from "react-intl";

// Components.
import LoginMessage from "./LoginMessage";

const messages = defineMessages( {
	message: {
		id: "AlmostThere.message",
		defaultMessage: "We just send you an email, so check your inbox! " +
		"Click the link inside the email to activate your account. After that you can access MyYoast.",
	},
	header: {
		id: "AlmosThere.header",
		defaultMessage: "Almost there!",
	},
} );

class AlmostThere extends React.Component {

	render() {
		return <LoginMessage { ...messages } />;
	}
}

export default injectIntl( AlmostThere );

AlmostThere.propTypes = {
	intl: intlShape.isRequired,
	name: PropTypes.string,
};

AlmostThere.defaultProps = {
	name: "World",
};
