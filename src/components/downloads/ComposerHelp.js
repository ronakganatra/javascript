import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { LargeButton, makeButtonFullWidth } from "../Button.js";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import { ModalHeading } from "../Headings";

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
	margin: 16px;
`;

const ResponsiveLargeButton = makeButtonFullWidth( LargeButton );

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
					defaultMessage="How to install {product} using composer"
					values={ {
						product: props.productName,
					} }
				/>
			</ModalHeading>
			<HelpText>
				<FormattedMessage
					id="composer-help.text"
					defaultMessage="Here you can enter all the copy that is needed for a pleasant composer token install experience."
				/>
			</HelpText>
			<Buttons>
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
	intl: intlShape.isRequired,
};

ComposerHelp.defaultProps = {
	productName: "this product",
};

export default injectIntl( ComposerHelp );
