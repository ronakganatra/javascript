import React, { Fragment } from "react";
import { FormattedMessage, injectIntl, defineMessages } from "react-intl";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors";
import ForumsImage from "../../images/supportForums.svg";
import KbImage from "../../images/supportKb.svg";
import Link from "../Link.js";


const Header = styled.h2`
	padding: 0;
	margin-top: 16px;
	margin-bottom: 0;
	color: ${ colors.$color_pink_dark };
	font-weight: 50;
	font-size: 1.5em;
	text-decoration: none;
`;

const SupportContainer = styled.div`
	margin: 0;
	flex-grow: 1;
`;

const TextImageContainer = styled.div`
	display: flex;
	align-items: top;

	p {
		margin-top: 0;
	}
`;

const BoldLink = styled( Link )`
	font-weight: bold;
`;

const Image = styled.img`
	max-width: 30%;
	display: inline;
	margin-left: 8px;
`;

const messages = defineMessages( {
	supportKb: {
		id: "support.kb",
		defaultMessage: "The Yoast Knowlegde Base is always a good place to start if you have a problem or a question. " +
		"You can check the list of articles, or easily search the knowledge base to find the answers you're looking for.",
	},
	supportForums: {
		id: "support.forums",
		defaultMessage: "On the support forums at wordpress.org you can post about your issues, " +
		"and others will help you out.",
	},
	supportForumsDetail: {
		id: "support.forumsDetail",
		defaultMessage: "To let others help you, please include as much detail in your description as possible.",
	},
} );


/**
 * A function that returns the SupportCard component.
 *
 * @param {Object} props The props required for the SupportCard component.
 *
 * @returns {ReactElement} The SupportCard component.
 */
const SupportCard = () => {
	return (
		<Fragment>
			<Header>
				<FormattedMessage
					id={ "support.card" }
					defaultMessage={ "Support" }
				/>
			</Header>
			<p>
				<FormattedMessage
					id={ "support.card.paragraph" }
					defaultMessage={ "If you have a question, if you need help, or if you just want to contact us, " +
					"there are several ways to get in touch." }
				/>
			</p>
			<SupportContainer>
				<BoldLink to={ "https://kb.yoast.com/" } linkTarget={ "_blank" }>
					<FormattedMessage
						id={ "support-card-kb-link" }
						defaultMessage={ "Knowlegde base { arrows }" }
						values={ {
							arrows: "»",
						} }
					/>
				</BoldLink>
				<TextImageContainer>
					<p>
						<FormattedMessage { ...messages.supportKb } />
					</p>
					<Image src={ KbImage } />
				</TextImageContainer>
				<BoldLink to={ "https://kb.yoast.com/kb/support/#free" } linkTarget={ "_blank" }>
					<FormattedMessage
						id={ "support-card-support-forums-link" }
						defaultMessage={ "Free support forums { arrows }" }
						values={ {
							arrows: "»",
						} }
					/>
				</BoldLink>
				<TextImageContainer>
					<div>
						<p>
							<FormattedMessage { ...messages.supportForums } />
						</p>
						<p>
							<FormattedMessage { ...messages.supportForumsDetail } />
						</p>
					</div>
					<Image src={ ForumsImage } />
				</TextImageContainer>
			</SupportContainer>
		</Fragment>
	);
};


export default injectIntl( SupportCard );
