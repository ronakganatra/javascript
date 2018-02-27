import PropTypes from "prop-types";
import React from "react";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import { Paper, WhitePage } from "../PaperStyles";
import { LargeButton, makeButtonFullWidth } from "../Button";
import { SubHeading } from "../Headings";
import styled from "styled-components";
import defaults from "../../config/defaults.json";
import Select from "react-select";

let messages = defineMessages( {
	configurationAvailable: {
		id: "requestConfiguration.configurationAvailable",
		defaultMessage: "You have purchased {configurationAvailable} configuration { singlePlural }, which you can apply to one of your websites.",
	},
	configurationHowTo: {
		id: "requestConfiguration.configurationHowTo",
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

	.Select-control {
		height: 48px;
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
							} }
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
