import PropTypes from "prop-types";
import React from "react";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import { Paper, WhitePage } from "../PaperStyles";
import { LargeButton, makeButtonFullWidth } from "../Button";
import YoastSelect from "../general/YoastSelect";
import { SubHeading } from "../Headings";
import styled from "styled-components";
import defaults from "../../config/defaults.json";

let messages = defineMessages( {
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
	requestButton: {
		id: "requestConfiguration.modalButton",
		defaultMessage: "Request configuration service",
	},
} );

let ResponsiveButton = styled( makeButtonFullWidth( LargeButton ) )`
	white-space: nowrap;
	min-width: initial;
`;

let SelectArea = styled.span`
	display: flex;
	width: 100%;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: block;
		height: auto;
	}

	>:last-child {
		margin-left: 8px;
		
		@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
			margin-left: 0;
			margin-top: 8px;
		}
	}
`;

/**
 * Returns the rendered ConfigurationRequestBlock component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered ConfigurationRequestBlock component.
 */
class ConfigurationRequestBlock extends React.Component {
	/**
	 * Sets the ConfigurationRequestBlock component.
	 * @param {Object} props All of the props passed to this component.
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			selectedOption: "",
		};
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

	render() {
		let configAvailable = 1;
		let value = this.state.selectedOption && this.state.selectedOption.value;
		let siteOptions = this.getOptions();
		return (
			<Paper>
				<WhitePage>
					<SubHeading>Configuration Service</SubHeading>
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
					<SelectArea>
						<YoastSelect
							name="form-field-name"
							value={ value }
							onChange={ this.handleChange.bind( this ) }
							options={ siteOptions }
						/>
						<ResponsiveButton
							onClick={ () => {
								this.props.onConfigurationRequestClick( value );
							} }
						>
							{ this.props.intl.formatMessage( messages.requestButton ) }
						</ResponsiveButton>
					</SelectArea>
				</WhitePage>
			</Paper>
		);
	}
}

export default injectIntl( ConfigurationRequestBlock );

ConfigurationRequestBlock.propTypes = {
	onConfigurationRequestClick: PropTypes.func,
	sites: PropTypes.array,
	intl: intlShape.isRequired,
};
