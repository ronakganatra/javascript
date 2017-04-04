import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

export const ListToggleContainer = styled.div`
	margin-top: 20px;
`;

export const ListToggleHeader = styled.button`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 10px 40px;
	border: none;
	background-color: white;
	cursor: pointer;

	h2 {
		font-weight: 500;
		font-size: 1.5em;
	}
`;

export const ListToggleBody = styled.ul`
	padding: 0;
	margin: 0;
	
	li:nth-child(odd) {
		background-color: ${colors.$color_background_light};
	}
`;

export const ListToggler = styled.div`
	height: 50px;
	width: 50px;
`;

const IconArrowUp = ( props ) => (
	<svg width={ props.width } height={ props.height } viewBox="0 0 24 24" fill={ colors.$color_grey_dark }>
		<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
	</svg>
);

IconArrowUp.propTypes = {
	width: React.PropTypes.number,
	height: React.PropTypes.number,
};

IconArrowUp.defaultProps = {
	width: 40,
	height: 40,
};

const IconArrowDown = ( props ) => (
	<svg width={ props.width } height={ props.height } viewBox="0 0 24 24" fill={ colors.$color_grey_dark }>
		<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
	</svg>
);

IconArrowDown.propTypes = {
	width: React.PropTypes.number,
	height: React.PropTypes.number,
};

IconArrowDown.defaultProps = {
	width: 40,
	height: 40,
};

export default class ListToggle extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			isOpen: this.props.isOpen,
		};

		this.toggleOpen = this.toggleOpen.bind( this );
	}

	isOpen() {
		return this.state.isOpen;
	}

	toggleOpen() {
		this.setState( {
			isOpen: ! this.state.isOpen,
		} );
	}

	getArrow() {
		return this.isOpen() ? <IconArrowUp/> : <IconArrowDown/>;
	}

	getList() {
		let body;

		if ( this.isOpen() ) {
			body = <ListToggleBody>{ this.props.items }</ListToggleBody>;
		}

		return body;
	}

	render() {
		return (
			<ListToggleContainer>
				<ListToggleHeader onClick={ this.toggleOpen }>
					<h2>{ this.props.title }</h2>
					{ this.getArrow() }
				</ListToggleHeader>
				{ this.getList() }
			</ListToggleContainer>
		);
	}
}

ListToggle.propTypes = {
	title: React.PropTypes.string.isRequired,
	items: React.PropTypes.any,
	isOpen: React.PropTypes.bool,
};

ListToggle.defaultProps = {
	isOpen: false,
};
