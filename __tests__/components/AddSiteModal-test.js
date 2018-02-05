import React from 'react';
import { createComponentWithIntl } from "../../utils";
import MyYoastModal from "../../src/components/MyYoastModal";
import AddSite from "../../src/components/AddSite";
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

test('The MyYoastModal for the AddSite component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MyYoastModal
			onClose={ () => { console.log( "clicked on Cancel" ); } }
			isOpen={ true }
			modalAriaLabel={ messages.modalAriaLabel }
		>
			<AddSite
				onConnectClick={ () => { console.log( "clicked on Link" ); } }
				onCancelClick={ () => { console.log( "clicked on Cancel" ); } }
				onChange={ () => {} }
				errorFound={ "" }
				error={ null }
				query={ "" }
				linkingSiteUrl={ "" }
			/>
		</MyYoastModal>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
