import React from "react";
import styled from "styled-components";
import Link from "./Link";
import colors from "yoast-components/style-guide/colors.json";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const messages = defineMessages( {
	description: {
		id: "licenseactivation.description",
		defaultMessage: "With the introduction of My Yoast, you no longer need a license key to activate your Yoast plugins on your website.",
	},
	cta: {
		id: "licenseactivation.CTA",
		defaultMessage: "Click here to learn how to activate a plugin on your website.",
	},
} );

const MessageContainer = styled.div`
	background-color: #F58223;
	box-shadow: 0 2px 10px 1px rgba(0,0,0,0.2);
	padding: 8px 32px;
	margin-bottom: 32px;
	text-align: center;
`;

const MessageLink = styled( Link )`
	color: ${ colors.$color_white };
	text-decoration: none;
	&:hover, &:focus, &:visited {
		color: ${ colors.$color_white };
		text-decoration: underline;
	}
`;

/**
 * License Activation Message
 *
 * To help the customer understand what happened to licenses.
 *
 * @param {object} props Properties of the component.
 * @returns {ReactElement} Subscription component.
 * @constructor
 */
function LicenseActivationMessage( props ) {
	return (
		<MessageContainer>
			<p>
				{props.intl.formatMessage( messages.description )}
				<br/>
				<MessageLink to="https://yoa.st/kb-activate-plugin"
							 linkTarget="_blank">{props.intl.formatMessage( messages.cta )}</MessageLink>
			</p>
		</MessageContainer>
	);
}

LicenseActivationMessage.propTypes = {
	intl: intlShape.isRequired,
};

export default injectIntl( LicenseActivationMessage );
