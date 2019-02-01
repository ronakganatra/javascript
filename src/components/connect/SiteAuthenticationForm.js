/* External dependencies */
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";
import colors from "yoast-components/style-guide/colors.json";

/* Internal dependencies */
import defaults from "../../config/defaults.json";
import { ModalHeading } from "../Headings";
import { LargeButton } from "../Button";

const messages = defineMessages( {
	siteAuthenticationFormHeader: {
		id: "SiteAuthenticationform.header.text",
		defaultMessage: "Authorization",
	},
	siteAuthenticationFormAuthorizationRequest: {
		id: "SiteAuthenticationform.authorizationRequest",
		defaultMessage: "Authorize {source} to:",
	},
	siteAuthenticationFormAuthorizeButtonText: {
		id: "SiteAuthenticationform.Authorizebutton.text",
		defaultMessage: "Authorize",
	},
	siteAuthenticationFormCancelButtonText: {
		id: "SiteAuthenticationform.Cancelbutton.text",
		defaultMessage: "Cancel",
	},
	siteAuthenticationFormConnectText: {
		id: "SiteAuthenticationform.connectText",
		defaultMessage: "Authorizing will start the process of connecting your website to your MyYoast account.",
	},
} );

const AuthenticationFormContainer = styled.div`
`;

const AuthorizationList = styled.ul`
`;

const AuthorizationRow = styled.li`
	padding-bottom: 12px;
`;

const LightHr = styled.hr`
	color: ${ colors.$color_grey_medium_dark };
	margin-left: -40px;
`;

const BoldSpan = styled.span`
	font-weight: 700;
`;

const FadedParagraph = styled.p`
	color: ${ colors.$color_grey_medium_dark }
`;

const Connectbutton = styled( LargeButton )`
	font-size: 16px;
	font-weight: 1;
	text-shadow: none;
	
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		min-width: 120px;
	}
`;

const CancelButton = styled( Connectbutton )`
	margin-right: 20px;
	background-color: ${ colors.$color_grey_light };
	color: ${ colors.$color_black };
`;

const AuthorizeButton = styled( Connectbutton )`
	background-color: ${ colors.$color_pink_dark };
	color: ${ colors.$color_white };
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
		<AuthorizationList>
			<LightHr />
			{ authorizations.map(
				( authorization, index ) =>
					<AuthorizationRow key={ `${ index }:row` }>
						<FormattedMessage
							id={ `${ index }:description` }
							defaultMessage={ authorization.description }
						/>
						<LightHr />
					</AuthorizationRow>
			) }
		</AuthorizationList>
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
	const stripUrlRegex = /^(?:https?:\/\/)?(?:www\.)?/i;
	const myYoastText = <BoldSpan>{ "MyYoast" }</BoldSpan>;
	const siteUrl = <BoldSpan> { props.forUrl.replace( stripUrlRegex, "" ) } </BoldSpan>;

	return (
		<AuthenticationFormContainer>
			<ModalHeading>
				<strong><FormattedMessage { ...messages.siteAuthenticationFormHeader } /></strong>
			</ModalHeading>
			<p> <FormattedMessage { ...messages.siteAuthenticationFormAuthorizationRequest } values={ { source: siteUrl } } /> </p>
			{ getAuthorizations( props.siteAuthorizations ) }
			<p> <FormattedMessage { ...messages.siteAuthenticationFormAuthorizationRequest } values={ { source: myYoastText } } /> </p>

			{ getAuthorizations( props.myYoastAuthorizations ) }
			<FadedParagraph> <FormattedMessage { ...messages.siteAuthenticationFormConnectText } /> </FadedParagraph>
			<CancelButton onClick={ props.onDeny }>
				<FormattedMessage { ...messages.siteAuthenticationFormCancelButtonText } />
			</CancelButton>
			<AuthorizeButton onClick={ props.onAuthorize }>
				<FormattedMessage { ...messages.siteAuthenticationFormAuthorizeButtonText } />
			</AuthorizeButton>
		</AuthenticationFormContainer>
	);
}

SiteAuthenticationForm.propTypes = {
	forUrl: PropTypes.string.isRequired,
	siteAuthorizations: PropTypes.array,
	myYoastAuthorizations: PropTypes.array,
	onAuthorize: PropTypes.func,
	onDeny: PropTypes.func,
};

export default injectIntl( SiteAuthenticationForm );
