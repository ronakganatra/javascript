import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../Button";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import { ModalHeading } from "../Headings";
import defaults from "../../config/defaults.json";

const GlNumberMapping = {
	82103: "wordpress-seo-local",
	82106: "wordpress-seo-local-woocommerce",
	82101: "wordpress-seo-premium",
	82102: "wpseo-video",
	82105: "wpseo-woocommerce",
	82104: "yoast-news-seo",
};

const ComposerHelpModal = styled.div`
	max-width: 640px;
	margin: auto;
`;

const HelpText = styled.div`
	margin-top: 16px;
`;

const Buttons = styled.div`
	text-align: right;
	flex: 200px 1 0;
	padding: 16px 0;

	button {
		margin-left: 12px;
	}

	@media screen and (max-width: ${ defaults.css.breakpoint.mobile }px) {
		button {
			margin-left: 0;
			margin-bottom: 8px;
		}
	}
`;

const CodeBlock = styled.pre`
	background-color: #efefef;
	padding: 4px 8px;
	max-width: 100%;
	overflow-x: scroll;
`;

const ShellCodeBlock = styled( CodeBlock )`
	&:before {
		content: "$ "
	}
`;

const CreateButton = makeButtonFullWidth( LargeButton );
const ResponsiveLargeButton = makeButtonFullWidth( LargeSecondaryButton );

/**
 * Renders the ComposerHelp component.
 *
 * @param {Object} props The props to use.
 * @param {Function} props.onClose The function to execute when the got it button is clicked.
 *
 * @returns {ReactElement} A react component rendering the composer help modal.
 */
function ComposerHelp( props ) {
	return (
		<ComposerHelpModal role="document">
			<ModalHeading>
				<FormattedMessage
					id="composer-help.header"
					defaultMessage="How to install the {product} using composer"
					values={ {
						product: props.productName,
					} }
				/>
			</ModalHeading>
			<HelpText>
				<FormattedMessage
					id="composer-help.introduction"
					defaultMessage="Composer is a tool used by many developers to install and update plugins.
					Through My Yoast you can use Composer to get easy access to your premium plugins.
					Follow the instructions below to get started!"
				/>
			</HelpText>
			{ props.composerToken
				? <HelpText>
					<FormattedMessage
						id="composer-help.register-token"
						defaultMessage="You can register your token with composer by running the command below:"
					/>
					<ShellCodeBlock>composer config -g http-basic.my.yoast.com token { props.composerToken.id }</ShellCodeBlock>
					<FormattedMessage
						id="composer-help.register-token"
						defaultMessage="You can then add our secure repository by adding the following line to your composer.json:"
					/>
					<CodeBlock>"repositories": [ { "{" } "type": "composer", "url": "https://my.yoast.com/packages/" } ]</CodeBlock>
					<FormattedMessage
						id="composer-help.register-token"
						defaultMessage="Now you can install the {product} by running:"
						values={ {
							product: props.productName,
						} }
					/>
					<ShellCodeBlock>composer install yoast/{ GlNumberMapping[ props.productGlNumber ] }</ShellCodeBlock>
				</HelpText>
				: <HelpText>
					<FormattedMessage
						id="composer-help.create-token"
						defaultMessage="Before you can install the {product} using composer you will need to create a
						token to access our secure repository. You can do this on the Account page in the Profile section
						or by clicking the button below."
						values={ {
							product: props.productName,
						} }
					/>
				</HelpText>
			}
			<Buttons>
				{ ! props.composerToken &&
				<CreateButton
					type="submit"
					aria-label="create token"
					onClick={ props.createComposerToken }
				>
					<FormattedMessage id="profile.create-sites.create" defaultMessage="create token"/>
				</CreateButton>
				}
				<ResponsiveLargeButton type="button" onClick={ props.onClose } >
					<FormattedMessage id="gettingStarted.gotIt" defaultMessage="Got it" />
				</ResponsiveLargeButton>
			</Buttons>
		</ComposerHelpModal>
	);
}

ComposerHelp.propTypes = {
	onClose: PropTypes.func.isRequired,
	productName: PropTypes.string,
	productGlNumber: PropTypes.string,
	composerToken: PropTypes.object,
	createComposerToken: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
};

ComposerHelp.defaultProps = {
	productName: "this product",
};

export default injectIntl( ComposerHelp );
