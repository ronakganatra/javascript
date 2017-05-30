import React from "react";
import styled from "styled-components";
import { LargeButton } from "./Button.js";
import { FormattedMessage, defineMessages, injectIntl, intlShape } from "react-intl";
import NewTabMessage from "../components/NewTabMessage";
import colors from "yoast-components/style-guide/colors.json";

const messages = defineMessages( {
	knowledgeBase: {
		id: "getting-started.text.kb",
		defaultMessage: "Knowledge Base",
	},
	email: {
		id: "getting-started.text.email",
		defaultMessage: "send us an email",
	},
} );

const GettingStartedModal = styled.div`
	max-width: 640px;
	margin: auto;
`;

const GettingStartedHeading = styled.h1`
	font-weight: 300;
	font-size: 20px;
	margin: 0 0 4;
`;

const GettingStartedText = styled.p`
	font-weight: 300;
	font-size: 14px;
	margin-top: 0;
	a {
		color: ${ colors.$color_blue };
	}
`;

const Buttons = styled.div`
	text-align: right;
	flex: 200px 1 0;

	a,
	button {
		margin-left: 12px;
	}

	@media screen and ( max-width: 455px ) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		a,
		button {
			margin-left: 0px;
			margin-top: 12px;
		}
	}
`;

const VideoContainer = styled.div`
    position: relative;
    padding-top: 35px;
    height: 0;
    overflow: hidden;

    // Percentage based on video aspect ratio.
    padding-bottom: 56.25%;
`;

const Video = styled.iframe`
	position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
`;

/**
 * Renders the getting started component.
 *
 * @param {Object} props The props to use.
 * @param {Function} props.onClose The function to execute when the got it button is clicked.
 *
 * @returns {ReactElement} A react component describing the Getting Started modal.
 */
function GettingStarted( props ) {
	return (
		<GettingStartedModal>
			<GettingStartedHeading>
				<FormattedMessage id="getting-started.header" defaultMessage="Getting started with My Yoast" />
			</GettingStartedHeading>
			<VideoContainer><Video height="315" width="560" src="https://www.youtube.com/embed/8sr_p7eIu2A" frameBorder="0" allowFullScreen /></VideoContainer>
			<GettingStartedText>
				<label htmlFor="GettingStartedInputField">
					<FormattedMessage
						id="getting-started.text"
						defaultMessage="If you have more questions, check our our { KBLink } articles, or { emailLink }."
						values={ {
							KBLink: <a target="_blank" href="https://yoa.st/12q">{ props.intl.formatMessage( messages.knowledgeBase ) }<NewTabMessage /></a>,
							emailLink: <a href="mailto:support@yoast.com">{ props.intl.formatMessage( messages.email ) }</a>,
						} }
					/>

				</label>
			</GettingStartedText>
			<Buttons>
				<LargeButton type="button" onClick={ props.onClose } >
					<FormattedMessage id="getting-started.got-it" defaultMessage="Got it" />
				</LargeButton>
			</Buttons>
		</GettingStartedModal>
	);
}

GettingStarted.propTypes = {
	onClose: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
};

export default injectIntl( GettingStarted );
