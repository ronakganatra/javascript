import PropTypes from "prop-types";
import React from "react";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import { Paper, WhitePage } from "../PaperStyles";
import { LargeButton, makeButtonFullWidth } from "../Button";
import YoastSelect, { SelectArea } from "../general/YoastSelect";
import { SubHeading } from "../Headings";
import styled from "styled-components";
import { StyledLabel } from "../Labels";

const messages = defineMessages( {
	configurationHeading: {
		id: "requestConfiguration.configurationHeading",
		defaultMessage: "Configuration Service",
	},
	configurationAvailable: {
		id: "requestConfiguration.configurationAvailable",
		defaultMessage: "You have {configurationAvailable} available configuration " +
		"{configurationAvailable, plural, =0 {services. If you are interested in having your plugin configured by our experts, visit our store!}" +
		" one {service, which you can apply to one of your websites.} other {services, which you can apply to your websites.}}",
	},
	configurationHowTo: {
		id: "requestConfiguration.configurationHowTo",
		defaultMessage: "Select a website in the drop-down list below, and click on \"request configuration service\" to open the intake form.",
	},
	configurationLabel: {
		id: "requestConfiguration.selectLabel",
		defaultMessage: "Select a website:",
	},
	configurationSelectPlaceholder: {
		id: "requestConfiguration.selectPlaceholder",
		defaultMessage: "Open the list of websites...",
	},
	requestButton: {
		id: "requestConfiguration.modalButton",
		defaultMessage: "Request configuration service",
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
class ConfigurationServiceRequestBlock extends React.Component {
	/**
	 * Sets the ConfigurationServiceRequestBlock component.
	 * @param {Object} props All of the props passed to this component.
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			selectedOption: "",
		};

		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	/**
	 * Handles the change in the YoastSelect element, by setting the selectedOption in the state to the selected option.

	 * @param {Object} selectedOption The option selected in the YoastSelect element.
	 *
	 * @returns {void}
	 */
	handleChange( selectedOption ) {
		this.setState( {
			selectedOption,
		} );
	}

	/**
	 * Handles submitting the form, passing the selectedOption to the callback.
	 *
	 * @returns {void}
	 */
	handleSubmit() {
		if ( this.state.selectedOption ) {
			this.props.openConfigurationServiceRequestModal( this.state.selectedOption.value );
		}
	}

	/**
	 * Sets all the available choices that should appear in the dropdown menu.
	 *
	 * @returns {Array} An array of objects with value and label keys.
	 */
	getOptions() {
		return this.props.sites.map( ( site ) => {
			return {
				value: site.id,
				label: site.siteName,
			};
		} );
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const configAvailable = this.props.amountAvailable;
		const value = this.state.selectedOption && this.state.selectedOption.value;
		const siteOptions = this.getOptions();
		return (
			<Paper>
				<WhitePage>
					<SubHeading>
						<FormattedMessage
							id={ messages.configurationHeading.id }
							defaultMessage={ messages.configurationHeading.defaultMessage }
						/>
					</SubHeading>
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
					<StyledLabel htmlFor="configuration-service-select-website">
						<FormattedMessage
							id={ messages.configurationLabel.id }
							defaultMessage={ messages.configurationLabel.defaultMessage }
						/>
					</StyledLabel>
					<SelectArea>
						<YoastSelect
							name="form-field-name"
							value={ value }
							onChange={ this.handleChange }
							options={ siteOptions }
							id="configuration-service-select-website"
							placeholder={ messages.configurationSelectPlaceholder.defaultMessage }
						/>
						<ResponsiveButton
							enabledStyle={ !! value }
							onClick={ this.handleSubmit }
						>
							{ this.props.intl.formatMessage( messages.requestButton ) }
						</ResponsiveButton>
					</SelectArea>
				</WhitePage>
			</Paper>
		);
	}
}

export default injectIntl( ConfigurationServiceRequestBlock );

ConfigurationServiceRequestBlock.propTypes = {
	openConfigurationServiceRequestModal: PropTypes.func,
	sites: PropTypes.array.isRequired,
	amountAvailable: PropTypes.number.isRequired,
	intl: intlShape.isRequired,
};
