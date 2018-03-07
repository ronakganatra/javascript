import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../Button.js";
import styled from "styled-components";
import { ModalHeading } from "../Headings";
import { Stepper } from "material-ui/Stepper";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { FlatButton, RaisedButton, Step, StepButton, StepContent, StepLabel } from "material-ui";
import { BottomRightButtons } from "../PaperStyles";

const ConfigurationRequestModal = styled.div`
	width: 640px;
	min-width: 90%;
	margin: auto;
	font-weight: 300;
	font-size: 1em;
`;

const WideLargeButton = makeButtonFullWidth( LargeButton );
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );

class ConfigurationRequest extends React.Component {
	/**
	 * Initializes the class with the specified props.
	 *
	 * @param {Object} props The props to be passed to the class that was extended from.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			stepIndex: 0,
		};
	}

	handleNext() {
		const { stepIndex } = this.state;
		this.setState( {
			stepIndex: stepIndex + 1,
		} );
	}

	handlePrev() {
		const { stepIndex } = this.state;
		if ( stepIndex > 0 ) {
			this.setState( { stepIndex: stepIndex - 1 } );
		}
	}

	renderStepActions( step ) {
		const { stepIndex } = this.state;

		return (
			<div style={ { margin: "12px 0" } }>
				{ step > 0 && (
					<FlatButton
						label="Back"
						disabled={ stepIndex === 0 }
						disableTouchRipple={ true }
						disableFocusRipple={ true }
						onClick={ this.handlePrev.bind( this ) }
						style={ { marginRight: 12 } }
					/>
				) }
				<RaisedButton
					label={ stepIndex === 3 ? "Finish" : "Next" }
					disableTouchRipple={ true }
					disableFocusRipple={ true }
					primary={ true }
					onClick={ this.handleNext.bind( this ) }
				/>
			</div>
		);
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		const { stepIndex } = this.state;

		return (
			<MuiThemeProvider>
				<ConfigurationRequestModal>
					<ModalHeading>
						<FormattedMessage
							id="configuration.modal.heading"
							defaultMessage="Configuration service ({configStep}/4)"
							values={ { configStep: this.state.stepIndex+1 } }
						/>
					</ModalHeading>
					<Stepper activeStep={ stepIndex } linear={ false } orientation={ "vertical" }>
						<Step>
							<StepButton
								onClick={ () => this.setState( { stepIndex: 0 } ) }
								disableFocusRipple={ true }
								disableTouchRipple={ true }
							>
								<StepLabel>
									<FormattedMessage
										id="configuration.modal.step-one"
										defaultMessage="Administrator login"
									/>
								</StepLabel>
							</StepButton>
							<StepContent>
								<p>
									Try out different ad text to see what brings in the most customers,
									and learn how to enhance your ads using features like ad extensions.
									If you run into any problems with your ads, find out how to tell if
									they're running and how to resolve approval issues.
								</p>
								{ this.renderStepActions( 0 ) }
							</StepContent>
						</Step>
						<Step>
							<StepButton onClick={ () => this.setState( { stepIndex: 1 } ) }>
								<StepLabel>
									<FormattedMessage
										id="configuration.modal.step-two"
										defaultMessage="Backup"
									/>
								</StepLabel>
							</StepButton>
							<StepContent>
								<p>
									Try out different ad text to see what brings in the most customers,
									and learn how to enhance your ads using features like ad extensions.
									If you run into any problems with your ads, find out how to tell if
									they're running and how to resolve approval issues.
								</p>
								{ this.renderStepActions( 1 ) }
							</StepContent>
						</Step>
						<Step>
							<StepButton onClick={ () => this.setState( { stepIndex: 2 } ) }>
								<StepLabel>
									<FormattedMessage
										id="configuration.modal.step-three"
										defaultMessage="Import data from another SEO plugin"
									/>
								</StepLabel>
							</StepButton>
							<StepContent>
								<p>
									Try out different ad text to see what brings in the most customers,
									and learn how to enhance your ads using features like ad extensions.
									If you run into any problems with your ads, find out how to tell if
									they're running and how to resolve approval issues.
								</p>
								{ this.renderStepActions( 2 ) }
							</StepContent>
						</Step>
						<Step>
							<StepButton onClick={ () => this.setState( { stepIndex: 3 } ) }>
								<StepLabel>
									<FormattedMessage
										id="configuration.modal.step-four"
										defaultMessage="Google Search Console"
									/>
								</StepLabel>
							</StepButton>
							<StepContent>
								<p>
									Try out different ad text to see what brings in the most customers,
									and learn how to enhance your ads using features like ad extensions.
									If you run into any problems with your ads, find out how to tell if
									they're running and how to resolve approval issues.
								</p>
								{ this.renderStepActions( 3 ) }
							</StepContent>
						</Step>
					</Stepper>
					<BottomRightButtons>
						<WideSecondaryButton onClick={ this.props.onClose } >
							Secondary Butt
						</WideSecondaryButton>
						<WideLargeButton onClick={ () => console.log( "primary click" ) }>
							Primary butt
						</WideLargeButton>
					</BottomRightButtons>
				</ConfigurationRequestModal>
			</MuiThemeProvider>
		);
	}
}

ConfigurationRequest.propTypes = {
	onClose: PropTypes.func,
};

export default injectIntl( ConfigurationRequest );
