import React from "react";

export default class MockedModal extends React.Component {

	static setAppElement() {
		return jest.fn();
	}

	render() {
		return null;
	}
}