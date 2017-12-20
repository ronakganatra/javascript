import React from "react";
import PropTypes from "prop-types";


class Modal extends React.Component {
	render(){
		return null;
	}
}

Modal.propTypes = {
	displayName: PropTypes.string,
	statics: PropTypes.Object,
};

Modal.defaultProps = {
	displayName: 'MockedModal',
	statics: {
		setAppElement: jest.fn(),
	},
};

module.exports = Modal;
