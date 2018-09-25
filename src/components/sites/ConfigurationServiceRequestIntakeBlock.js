import PropTypes from "prop-types";
import React from "react";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import { Paper, WhitePage } from "../PaperStyles";
import { LargeButton, makeButtonFullWidth } from "../Button";
import CollapsibleHeader from "../CollapsibleHeader";
import styled from "styled-components";

const messages = defineMessages( {
	configurationHeading: {
		id: "requestConfigurationIntake.configurationHeading",
		defaultMessage: "Request configuration service",
	},
	configurationAvailable: {
		id: "requestConfigurationIntake.configurationAvailable",
		defaultMessage: "You have purchased {configurationAvailable} available configuration " +
		"{configurationAvailable, plural, =0 {services. If you are interested in having your plugin configured by our experts, visit our store!}" +
		" one {service, which you can apply to one of your websites.} other {services, which you can apply to your websites.}}",
	},
	configurationHowTo: {
		id: "requestConfigurationIntake.configurationHowTo",
		defaultMessage: "Let us help you configure the plugins for your website. Click on the button below to open the intake form.",
	},
	requestButton: {
		id: "requestConfigurationIntake.modalButton",
		defaultMessage: "Request configuration service for this site",
	},
} );

const ResponsiveButton = styled( makeButtonFullWidth( LargeButton ) )`
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
	 *
	 * @param {Object} props All of the props passed to this component.
	 *
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
		const siteId = this.props.siteId;
		this.props.openConfigurationServiceRequestModal( siteId );
	}

	render() {
		const configAvailable = this.props.amountAvailable;
		return (
			<Paper>
				<CollapsibleHeader
					title={ this.props.intl.formatMessage( messages.configurationHeading ) }
					isOpen={ true }
				>
					<WhitePage>
						<div>
							<p>
								<FormattedMessage
									id={ messages.configurationAvailable.id }
									defaultMessage={ messages.configurationAvailable.defaultMessage }
									values={ {
										configurationAvailable: configAvailable,
									} }
								/>
							</p>
							<p>
								<FormattedMessage
									id={ messages.configurationHowTo.id }
									defaultMessage={ messages.configurationHowTo.defaultMessage }
								/>
							</p>
						</div>
						<ResponsiveButton
							enabledStyle={ true }
							onClick={ this.handleSubmit }
						>
							{ this.props.intl.formatMessage( messages.requestButton ) }
						</ResponsiveButton>
					</WhitePage>
				</CollapsibleHeader>
			</Paper>
		);
	}
}

ConfigurationServiceRequestIntakeBlock.propTypes = {
	openConfigurationServiceRequestModal: PropTypes.func,
	amountAvailable: PropTypes.number.isRequired,
	intl: intlShape.isRequired,
	siteId: PropTypes.string.isRequired,
};

export default injectIntl( ConfigurationServiceRequestIntakeBlock );
