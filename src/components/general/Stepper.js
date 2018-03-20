import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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

const StepperLabel = styled.button`
	background: transparent;
	border: 0;
	padding: 0;
	display: block;
	height: 30px;
	color: ${ colors.$color_black };
	font-size: 18px;
	line-height: 30px;
	cursor: pointer;
	margin: 5px 0;
	
	&:focus {
		outline: none;
	}
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

	componentWillReceiveProps( nextProps ) {
		if ( this.props.active === false && nextProps.active === true && this.labelRef ) {
			this.labelRef.focus();
		}
	}

	completeStep() {
		this.setState( {
			completed: true,
		} );
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
			return <ActiveStepperIcon>{ this.props.index + 1}</ActiveStepperIcon>;
		}

		return <InactiveStepperIcon>{ this.props.index + 1 }</InactiveStepperIcon>;
	}

	render() {
		const {
			goToStep,
			active,
			index,
			total,
			label,
			step,
			component,
		} = this.props;

		let child = React.cloneElement( component, {
			completeStep: this.completeStep,
			resetStep: this.resetStep,
			stepIndex: index,
			stepTotal: total,
		} );

		return (
			<div>
				<StepperLabel aria-label={ step + ": " + label }
							  type="button"
							  href="#"
							  onClick={ () => goToStep( index ) }
							  aria-current={ active ? step : "" }
							  innerRef={ ( labelRef ) => {
								this.labelRef = labelRef;
							  } }
				>
					{ this.getIcon() }
					{ label }
				</StepperLabel>
				<StepperContent >
					{ active && child }
				</StepperContent>
			</div>
		);
	}
}

Step.propTypes = {
	active: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
	goToStep: PropTypes.func.isRequired,
	total: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
	step: PropTypes.string.isRequired,
	component: PropTypes.element.isRequired,
};

class Stepper extends React.Component {
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
							active={ this.props.activeStep === index }
							goToStep={ this.props.goToStep }
						/>
				) }
			</div>
		);
	}
}

Stepper.propTypes = {
	steps: PropTypes.arrayOf( PropTypes.object ).isRequired,
	activeStep: PropTypes.number.isRequired,
	goToStep: PropTypes.func.isRequired,
};

export default Stepper;
