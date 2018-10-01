import React, { Fragment } from "react";
import { FormattedMessage, injectIntl, defineMessages } from "react-intl";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors";
import ForumsImage from "../../images/supportForums.svg";
import KbImage from "../../images/supportKb.svg";


const Header = styled.h2`
	padding: 0;
	margin: 16px 0;
	color: ${ colors.$color_pink_dark };
	font-weight: 50;
	font-size: 1.5em;
	text-decoration: none;
`;

const SupportContainer = styled.div`
	margin: 0;
	flex-grow: 1;
	display: flex;
`;

const Block = styled.div`
	display: inline-block;
`;

const TextBlock = styled( Block )`
	margin-left: 8px;
	vertical-align: top;
`;

const Image = styled.img`
	width: 64px;
	height: 64px;
	display: block;
`;

const Description = styled.p`
	margin: 0;
	white-space: normal;
	max-width: 100%;
`;

const messages = defineMessages( {
	supportKb: {
		id: "support.kb",
		defaultMessage: "The Yoast Knowlegde base is always a good place to start if you have a problem or a question. " +
		"You can check the list of articles, or easily search the Knowledge base to find the answers you're looking for.",
	},
	supportForums: {
		id: "support.forums",
		defaultMessage: "On support forums at wordpress.org you can post about your issues, " +
		"and others will help you out. For example:",
	},
} );


/**
 * A function that returns the UpsellCard component.
 *
 * @param {Object} props The props required for the UpsellCard component.
 *
 * @returns {ReactElement} The UpsellCard component.
 */
const SupportCard = () => {
	return (
		<Fragment>
			<Header>
				<FormattedMessage id={ "support.card" } defaultMessage={ "Support" } />
			</Header>
			<p><FormattedMessage
				id={ "support.card.paragraph" }
				defaultMessage={ "If you have a question, if you need help, or just want to contact us, " +
				"there are several ways to get in touch." } /></p>

			<SupportContainer>
				<TextBlock>
					<a href={ "https://kb.yoast.com/" } target="blank" >{ "Knowlegde base >>" }</a>
					<Description>
						<FormattedMessage { ...messages.supportKb }
						/>
					</Description>
				</TextBlock>
				<Block>
					<Image src={ KbImage } />
				</Block>
				<TextBlock>
					<a href={ "https://kb.yoast.com/" } target="blank" >{ "Knowlegde base >>" }</a>
					<Description>
						<FormattedMessage { ...messages.supportForums }
						/>
					</Description>
				</TextBlock>
				<Block>
					<Image src={ ForumsImage } />
				</Block>
			</SupportContainer>
		</Fragment>
	);
};


export default injectIntl( SupportCard );
