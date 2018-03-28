import React from 'react';
import { createComponentWithIntl } from "../../utils";
import MyYoastModal from "../../src/components/MyYoastModal";
import ConfigurationRequestForm from "../../src/components/sites/configuration-request/ConfigurationRequestForm";
import { defineMessages } from "react-intl";

jest.mock( "react-modal", () => {
	function Modal(props) {
		return <div id="Modal" {...props}>{props.children}</div>
	}

	Modal.setAppElement = jest.fn();

	return Modal;
} );

let messages= defineMessages( {
	modalAriaLabel: {
		id: "message.id",
		defaultMessage: "message.defaultMessage",
	}
} );

test('The MyYoastModal for the ConfigurationRequestForm component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MyYoastModal
			onClose={ () => { console.log( "clicked on close" ); } }
			isOpen={ true }
			modalAriaLabel={ messages.modalAriaLabel }
		>
			<ConfigurationRequestForm
				onClose={ () => { console.log( "clicked on Cancel" ); } }
				onBack={ () => { console.log( "clicked on Back" ); } }
				goToStep={ () => { console.log( "clicked on a step header" ); } }
			/>
		</MyYoastModal>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

