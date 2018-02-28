import PropTypes from "prop-types";
import React from "react";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import { Paper, WhitePage } from "../PaperStyles";
import { LargeButton, makeButtonFullWidth } from "../Button";
import { SubHeading } from "../Headings";
import styled from "styled-components";
import defaults from "../../config/defaults.json";
// import colors from "yoast-components/style-guide/colors.json";
import Select from "react-select";

let messages = defineMessages( {
	configurationAvailable: {
		id: "requestConfiguration.configurationAvailable",
		defaultMessage: "You have {configurationAvailable} available configuration { singlePlural }, which you can apply to { singleWebsite }your websites.",
	},
	configurationHowTo: {
		id: "requestConfiguration.configurationHowTo",
		defaultMessage: "Select a website in the drop-down list below, and click on \"request configuration service\" to open the intake form.",
	},
} );

let ResponsiveButton = makeButtonFullWidth( LargeButton );

let SelectArea = styled.span`
	display: flex;
	width: 100%;
	height: 48px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: block;
	}

	>:last-child {
		margin-left: 8px;
		
		@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
			margin-left: 0;
			margin-top: 8px;
		}
	}
`;

let YoastSelect = styled( Select )`
	width: 100%;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
	border: 0;

	&.is-focused:not(.is-open) > .Select-control {
		border: 0;
		box-shadow: none;
		background: #fff;
	}

	.Select-control {
		height: 48px;
		border-radius: 0;
	}
	
	.Select-placeholder {
		line-height: 48px
	}

	&.Select--single > .Select-control .Select-value {
		line-height: 48px;
	}

	.Select-value-label {
		line-height: 48px;
	}

	.Select-input {
		line-height: 48px;
	}
`;

/**
 * Returns the rendered ConfigurationRequestForm component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered ConfigurationRequestForm component.
 */
class ConfigurationRequestForm extends React.Component {
	/**
	 * Sets the ConfigurationRequestForm component.
	 * @param {Object} props All of the props passed to this component.
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			selectedOption: "",
		};
	}

	handleChange( selectedOption ) {
		this.setState( {
			selectedOption,
		} );
		return selectedOption && console.log( `Selected: ${ selectedOption.label }` );
	}

	render() {
		let configAvailable = 1;
		let value = this.state.selectedOption && this.state.selectedOption.value;
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
								singlePlural: configAvailable > 1 ? "services" : "service",
								singleWebsite: configAvailable > 1 ? "" : "one of ",
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
							options={ [
								{ value: "one", label: "One" },
								{ value: "two", label: "Two" },
							] }
						/>
						<ResponsiveButton>Kill meh2</ResponsiveButton>
					</SelectArea>
				</WhitePage>
			</Paper>
		);
	}
}

export default injectIntl( ConfigurationRequestForm );

ConfigurationRequestForm.propTypes = {
	sites: PropTypes.array,
	intl: intlShape.isRequired,
};
