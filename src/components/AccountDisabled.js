import React from "react";
import pageNotFoundImage from "../images/PageNotFound.svg";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import { speak } from "@wordpress/a11y";
import styled from "styled-components";
import logo from "../images/logoColor.svg";
import { Heading } from "./Headings";

const LogoImage = styled.img`
	width: ${ props => props.size };
	display: block;
	margin: 30px auto 25px;
`;

const PageContainer = styled.div`
	margin-top: 10vh;
	text-align: center;
`;

const AccountDisabledImage = styled.img`
	width: 384px;
	max-width: 100%;
	height: auto;
	margin-top: 2em;
`;

const messages = defineMessages( {
	accountDisabled: {
		id: "account.disabled.shortMessage",
		defaultMessage: "Account disabled",
	},
	supportTeam: {
		id: "account.disabled.supportTeam",
		defaultMessage: "support team",
	},
} );

/**
 * A function that returns the Account disabled component.
 *
 * @returns {ReactElement} The component that contains the Account disabled page.
 */
class AccountDisabled extends React.Component {
	componentDidMount() {
		// Announce navigation to assistive technologies.
		const message = this.props.intl.formatMessage( messages.accountDisabled );
		speak( message );
	}

	render() {
		const paragraphs = [
			<FormattedMessage
				id="account.disabled.possibleAction" defaultMessage={ "If you would like to re-enable your account, please contact our { support }." }
				values={ { support: <a href="mailto:support@yoast.com">support team</a> } }
			/>,
			<FormattedMessage
				id="account.disabled.visitYoast" defaultMessage={ "Visit { yoast }." }
				values={ { yoast: <a href="https://yoast.com">Yoast.com</a> } }
			/>,
		];
		return (


			<PageContainer>
				<LogoImage src={ logo } size="200px" alt="MyYoast" />
				<Heading><FormattedMessage id="account.disabled.header" defaultMessage={ "Account disabled" } /></Heading>
				{ paragraphs.map( function( paragraph ) {
					return <p key={ paragraph.props.id }>{ paragraph }</p>;
				} ) }
				<AccountDisabledImage src={ pageNotFoundImage } alt="" />
			</PageContainer>
		);
	}
}

export default injectIntl( AccountDisabled );

AccountDisabled.propTypes = {
	intl: intlShape.isRequired,
};
