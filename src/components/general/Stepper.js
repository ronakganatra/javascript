import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import colors from "yoast-components/style-guide/colors.json";
import defaults from "../../config/defaults.json";
import check from "../../../src/icons/check.svg";

const IconCompleted = styled.img`
	height: 16px;
	display: block;
	margin: 2px auto;
`;

const StepperIcon = styled.span`
	float: left;
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

const StepperButton = styled.button`
	display: block;
	background: transparent;
	border: 0;
	padding: 0;
	height: 30px;
	color: ${ colors.$color_black };
	font-size: 18px;
	line-height: 30px;
	cursor: pointer;
	margin: 5px 0;
	text-align: left;

	&:focus {
		outline: 0;
	}
`;

const StepperLabel = styled.span`
	display: inline-block;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		font-size: 16px;
	}
`;

// We need this to be a styled component so we can reference it from other styled components.
const StepperContainer = styled.div``;

const StepperContent = styled.div`
	padding: 0 0 10px 25px;
	margin-left: 15px;
	border-left: 1px solid ${ colors.$color_grey_disabled };

	${StepperContainer}:last-child & {
		margin: 0 0 10px 15px;
		padding: 0 0 0 25px;
	}

	> div > p:first-child {
		margin-top: 0;
	}
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
			return <ActiveStepperIcon><IconCompleted src={ check } alt="" /></ActiveStepperIcon>;
		}

		if ( this.props.active ) {
			return <ActiveStepperIcon>{ this.props.index + 1 }</ActiveStepperIcon>;
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
			stepAriaLabel,
			component,
		} = this.props;

		let child = React.cloneElement( component, {
			completeStep: this.completeStep,
			resetStep: this.resetStep,
			stepIndex: index,
			stepTotal: total,
		} );

		return (
			<StepperContainer>
				<StepperButton
					aria-label={ stepAriaLabel }
					type="button"
					onClick={ () => goToStep( index ) }
					aria-current={ active ? "step" : "false" }
					innerRef={ ( labelRef ) => {
						this.labelRef = labelRef;
					} }
				>
					{ this.getIcon() }
					<StepperLabel>{ label }</StepperLabel>
				</StepperButton>
				<StepperContent>
					{ active && child }
				</StepperContent>
			</StepperContainer>
		);
	}
}

Step.propTypes = {
	active: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
	goToStep: PropTypes.func.isRequired,
	total: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
	stepAriaLabel: PropTypes.string.isRequired,
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
