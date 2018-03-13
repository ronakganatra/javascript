/* eslint-disable */
import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

const StepperIcon = styled.span`
	display: inline-block;
	height: 30px;
	width: 30px;
	color: ${ colors.$color_white };
	font-size: 14px;
	border-radius: 50%;
	padding: 5px;
	margin-right: 10px;
	text-align: center;
	line-height: 20px;
`;

const ActiveStepperIcon = styled( StepperIcon )`
	background-color: ${ colors.$color_pink_dark };
`;

const InactiveStepperIcon = styled( StepperIcon )`
	background-color: ${ colors.$color_grey_disabled };
`;

const StepperLabel = styled.a`
	display: block;
	height: 30px;
	color: ${ colors.$color_black };
	font-size: 18px;
	line-height: 30px;
	cursor: pointer;
	margin: 5px 0;
`;

const StepperContent = styled.div`
	padding: 5px 0 5px 25px;
	margin-left: 15px;
	border-left: 1px solid ${ colors.$color_grey_disabled }
`;

class Step extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			completed: false,
		};

		this.completeStep = this.completeStep.bind( this );
		this.resetStep = this.resetStep.bind( this );
	}

	completeStep() {
		this.setState( {
			completed: true,
		} );

		this.props.goToNextStep();
	}

	resetStep() {
		this.setState( {
			completed: false,
		} );
	}

	getIcon() {
		if ( this.state.completed ) {
			return <ActiveStepperIcon>✓</ActiveStepperIcon>;
		}

		if ( this.props.active ) {
			return <ActiveStepperIcon>{ this.props.index }</ActiveStepperIcon>;
		}

		return <InactiveStepperIcon>{ this.props.index }</InactiveStepperIcon>;
	}

	render() {
		const {
			goToStep,
			goToNextStep,
			goToPreviousStep,
			active,
			index,
			total,
			label,
			component,
		} = this.props;

		let child = React.cloneElement( component, {
			goToNextStep,
			goToPreviousStep,
			completeStep: this.completeStep,
			resetStep: this.resetStep,
			stepIndex: index,
			stepTotal: total,
		} );

		return (
			<div>
				<StepperLabel onClick={ () => goToStep( index ) }>
					{ this.getIcon() }
					{ label }
				</StepperLabel>
				<StepperContent>
					{ active && child }
				</StepperContent>
			</div>
		);
	}
}

class Stepper extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			activeStep: 0,
		};

		this.goToStep = this.goToStep.bind( this );
		this.goToNextStep = this.goToNextStep.bind( this );
		this.goToPreviousStep = this.goToPreviousStep.bind( this );
	}

	goToStep( num ) {
		if ( num >= 0 && num < this.props.steps.length  ) {
			this.setState( {
				activeStep: num,
			} );
		}
	}

	goToNextStep() {
		const { activeStep } = this.state;

		if ( activeStep < this.props.steps.length - 1 ) {
			this.setState( {
				activeStep: activeStep + 1,
			} );
			return;
		}

		this.props.onCompletedStepper();
	}

	goToPreviousStep() {
		const { activeStep } = this.state;

		if ( activeStep > 0 ) {
			this.setState( {
				activeStep: activeStep - 1,
			} );
		}
	}

	render() {
		return (
			<div>
				{ this.props.steps.map(
					( step, index ) =>
						<Step
							key={ index }
							{ ...step }
							index={ index }
							total={ this.props.steps.length }
							active={ this.state.activeStep === index }
							goToStep={ this.goToStep }
							goToNextStep={ this.goToNextStep }
							goToPreviousStep={ this.goToPreviousStep }
						/>
				) }
			</div>
		);
	}
}

export default Stepper;
