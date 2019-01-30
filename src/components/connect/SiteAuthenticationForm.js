/* External dependencies */
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";

/* Internal dependencies */
import { ModalHeading } from "../Headings";
import { LargeButton } from "../Button";


const messages = defineMessages( {
	siteAuthenticationFormHeader: {
		id: "SiteAuthenticationform.header.text",
		defaultMessage: "Authorize My Yoast",
	},
	siteAuthenticationFormPermissionRequest: {
		id: "SiteAuthenticationform.body.authorizationRequest",
		defaultMessage: "wants to:",
	},
	siteAuthenticationFormButtonText: {
		id: "SiteAuthenticationform.Authorizebutton.text",
		defaultMessage: "Authorize",
	},
	siteAuthenticationFormDenyButtonText: {
		id: "SiteAuthenticationform.Denybutton.text",
		defaultMessage: "Deny",
	},
} );

const AuthenticationFormContainer = styled.div`
`;

const AuthorizationRow = styled.li`
	padding-bottom: 12px;
`;

const BoldSpan = styled.span`
	font-weight: 700;
`;

/**
 * Create an unordered list based on the passed authorizations the user has to agree to achieve a connection between their url and my yoast.
 *
 * @param {Array} authorizations The authorizations to display.
 *
 * @returns {ReactElement} An unordered list of authorizations.
 */
function getAuthorizations( authorizations ) {
	return (
		<ul>
			{ authorizations.map( authorization => <AuthorizationRow> { authorization.description } </AuthorizationRow> ) }
		</ul>
	);
}

/**
 * The siteAuthenticationForm component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Product component.
 */
function SiteAuthenticationForm( props ) {
	const elaboratingText = " wants to access your website.";
	const agreementText = "Authorizing will start the process of connecting your website to your MyYoast account.";
	const myYoastText = <BoldSpan>{ "MyYoast" }</BoldSpan>;

	return (
		<AuthenticationFormContainer>
			<ModalHeading>
				<FormattedMessage { ...messages.siteAuthenticationFormHeader } />
			</ModalHeading>
			<p> { myYoastText }{ elaboratingText } <br /> <span> { props.forUrl } </span> </p>
			<p> { myYoastText } <FormattedMessage { ...messages.siteAuthenticationFormPermissionRequest } /> </p>
			{ getAuthorizations( props.authorizations ) }

			<LargeButton onClick={ props.onAuthorize }>
				<FormattedMessage { ...messages.siteAuthenticationFormButtonText } />
			</LargeButton>
			<LargeButton onClick={ props.onDeny }>
				<FormattedMessage { ...messages.siteAuthenticationFormDenyButtonText } />
			</LargeButton>

			<p> { agreementText } </p>
		</AuthenticationFormContainer>
	);
}

SiteAuthenticationForm.propTypes = {
	forUrl: PropTypes.string.isRequired,
	authorizations: PropTypes.array,
	onAuthorize: PropTypes.func,
	onDeny: PropTypes.func,
};

export default injectIntl( SiteAuthenticationForm );
