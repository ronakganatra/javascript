import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { LargeButton, makeButtonFullWidth } from "./Button.js";
import { FormattedMessage, defineMessages, injectIntl, intlShape } from "react-intl";
import NewTabMessage from "../components/NewTabMessage";
import { ModalHeading } from "./Headings";

const messages = defineMessages( {
	knowledgeBase: {
		id: "gettingStarted.text.kb",
		defaultMessage: "Knowledge Base",
	},
	email: {
		id: "gettingStarted.text.email",
		defaultMessage: "send us an email",
	},
	videoTitle: {
		id: "gettingStarted.iframe.title",
		defaultMessage: "MyYoast introductory video",
	},
} );

const GettingStartedModal = styled.div`
	max-width: 640px;
	margin: auto;
`;

const GettingStartedText = styled.p`
	font-size: 16px;
	margin-top: 18px;
`;

const Buttons = styled.div`
	text-align: right;
	flex: 200px 1 0;
	margin-top: 18px;
	margin-bottom: 24px;
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
	border: 0;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const ResponsiveLargeButton = makeButtonFullWidth( LargeButton );

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
		<GettingStartedModal role="document">
			<ModalHeading>
				<FormattedMessage id="gettingStarted.header" defaultMessage="Getting started with MyYoast" />
			</ModalHeading>
			<GettingStartedText>
				<FormattedMessage
					id="gettingStarted.text"
					defaultMessage="Watch the video below to learn about all the benefits of { myYoast }. If you still have questions after that, check out our { KBLink } articles, or { emailLink }."
					values={ {
						myYoast: "MyYoast",
						KBLink: <a target="_blank" href="https://yoa.st/12q">{ props.intl.formatMessage( messages.knowledgeBase ) } <NewTabMessage /></a>,
						emailLink: <a href="mailto:support@yoast.com">{ props.intl.formatMessage( messages.email ) }</a>,
					} }
				/>
			</GettingStartedText>
			<VideoContainer><Video title={ props.intl.formatMessage( messages.videoTitle ) } height="315" width="560" src="https://yoa.st/12w" allowFullScreen={ true } /></VideoContainer>
			<Buttons>
				<ResponsiveLargeButton type="button" onClick={ props.onClose }>
					<FormattedMessage id="gettingStarted.gotIt" defaultMessage="Got it" />
				</ResponsiveLargeButton>
			</Buttons>
		</GettingStartedModal>
	);
}

GettingStarted.propTypes = {
	onClose: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
};

export default injectIntl( GettingStarted );
