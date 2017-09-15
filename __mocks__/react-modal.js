import React from "react";

const Modal = React.createClass({
	displayName: 'MockedModal',
	statics: {
		setAppElement: jest.fn(),
	},
	render: () => {
		return null;
	}
});

module.exports = Modal;
