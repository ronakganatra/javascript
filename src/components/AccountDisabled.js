import React from "react";
import pageNotFoundImage from "../images/PageNotFound.svg";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import a11ySpeak from "a11y-speak";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { Logo } from "./Logo";

const AccountDisabledHeading = styled.h1`
	font-weight: 700;
	font-size: 2.5em;
	margin: 0;
`;

const PageContainer = styled.div`
	margin-top: 10vh;
	text-align: center;

	a {
		color: ${ colors.$color_blue };
	}
`;

const AccountDisabledImage = styled.img`
	width: 384px;
	max-width: 100%;
	height: auto;
	margin-top: 2em;
`;

const messages = defineMessages( {
	accountDisabled: {
		id: "account.disabled.short-message",
		defaultMessage: "Account disabled",
	},
	supportTeam: {
		id: "account.disabled.supportTeam",
		defaultMessage: "support team",
	},
} );

/**
 * A function that returns the Page Not Found component.
 *
 * @returns {ReactElement} The component that contains the Page Not Found page.
 */
class AccountDisabled extends React.Component {
	/**
	 * Sets the CoursesPage object.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();
	}

	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.pageNotFound );
		a11ySpeak( message );
	}

	render() {
		let paragraphs = [
			<FormattedMessage id="account.disabled.possible-action" defaultMessage={ "If you would like to re-enable your account, please contact our { support }." }
							  values={ { support: <a href="mailto:support@yoast.com">support team</a> } } />,
		];
		return (


		<PageContainer>
			<Logo colored={ true } />
			<AccountDisabledHeading><FormattedMessage id="account.disabled.header" defaultMessage={ "Account disabled" } /></AccountDisabledHeading>
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
