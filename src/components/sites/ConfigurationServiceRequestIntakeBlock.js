import PropTypes from "prop-types";
import React from "react";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import { Paper, WhitePage } from "../PaperStyles";
import { LargeButton, makeButtonFullWidth } from "../Button";
import { SubHeading } from "../Headings";
import styled from "styled-components";

let messages = defineMessages( {
	configurationAvailable: {
		id: "requestConfiguration.configurationAvailable",
		defaultMessage: "You have purchased {configurationAvailable} available configuration " +
		"{configurationAvailable, plural, =0 {services. If you are interested in having your plugin configured by our experts, visit our store!}" +
		" one {service, which you can apply to one of your websites.} other {services, which you can apply to your websites.}}",
	},
	configurationHowTo: {
		id: "requestConfiguration.configurationHowTo",
		defaultMessage: "Let us help you to configure the plugins for your website. Click on the button below to open the intake form.",
	},
	requestButton: {
		id: "requestConfiguration.modalButton",
		defaultMessage: "Request configuration service for this site",
	},
} );

let ResponsiveButton = styled( makeButtonFullWidth( LargeButton ) )`
	white-space: nowrap;
	min-width: initial;
`;

/**
 * Returns the rendered ConfigurationServiceRequestBlock component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered ConfigurationServiceRequestBlock component.
 */
class ConfigurationServiceRequestIntakeBlock extends React.Component {
	/**
	 * Sets the ConfigurationServiceRequestBlock component.
	 * @param {Object} props All of the props passed to this component.
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.handleSubmit = this.handleSubmit.bind( this );
	}

	/**
	 * Handles submitting the form, passing the selectedOption to the callback.
	 *
	 * @returns {void}
	 */
	handleSubmit() {
		let siteId = this.props.siteId;
		this.props.openConfigurationServiceRequestModal( siteId );
	}

	render() {
		console.log( "test props intakeblock:", this.props );
		let configAvailable = this.props.amountAvailable;
		return (
			<Paper>
				<WhitePage>
					<SubHeading>Configuration service intake form</SubHeading>
					<p>
						<FormattedMessage
							id={ messages.configurationAvailable.id }
							defaultMessage={ messages.configurationAvailable.defaultMessage }
							values={ {
								configurationAvailable: configAvailable,
							} }
						/>
						<br />
						<FormattedMessage
							id={ messages.configurationHowTo.id }
							defaultMessage={ messages.configurationHowTo.defaultMessage }
						/>
					</p>
						<ResponsiveButton
							enabledStyle={ true }
							onClick={ this.handleSubmit }
						>
							{ this.props.intl.formatMessage( messages.requestButton ) }
						</ResponsiveButton>
				</WhitePage>
			</Paper>
		);
	}
}

export default injectIntl( ConfigurationServiceRequestIntakeBlock );

ConfigurationServiceRequestIntakeBlock.propTypes = {
	openConfigurationServiceRequestModal: PropTypes.func,
	amountAvailable: PropTypes.number.isRequired,
	intl: intlShape.isRequired,
	siteId: PropTypes.string.isRequired,
};
