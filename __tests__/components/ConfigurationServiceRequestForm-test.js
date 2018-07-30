import React from 'react';
import { createComponentWithIntl } from "../../utils";
import MyYoastModal from "../../src/components/MyYoastModal";
import ConfigurationServiceRequestForm from "../../src/components/sites/configuration-service-requests/ConfigurationServiceRequestForm";
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

test('The MyYoastModal for the ConfigurationServiceRequestForm component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MyYoastModal
			onClose={ () => { console.log( "clicked on close" ); } }
			isOpen={ true }
			modalAriaLabel={ messages.modalAriaLabel }
		>
			<ConfigurationServiceRequestForm
				onClose={ () => { console.log( "clicked on Cancel" ); } }
				onBack={ () => { console.log( "clicked on Back" ); } }
				goToStep={ () => { console.log( "clicked on a step header" ); } }
				configurationServiceRequestModalSiteId={"SomeId"}
			/>
		</MyYoastModal>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

