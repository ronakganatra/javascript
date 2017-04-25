import React from 'react';
import { createComponentWithIntl } from "../../utils";

import AddSiteModal from '../../src/components/AddSiteModal';

jest.mock( "react-modal", () => {
	function Modal(props) {
		return <div id="Modal" {...props}>{props.children}</div>
	}

	Modal.setAppElement = jest.fn();

	return Modal;
} );

test('The AddSiteModal component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<AddSiteModal onClose={ () => {
			console.log( "clicked on Cancel" );
		} } onLink={ () => {
			console.log( "clicked on Link" );
		} } isOpen={ true }
			onChange={ () => {} }
			errorFound={ false }
			query=""
		/>

	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the addSiteModal handling an onClose event', () => {
	const component = createComponentWithIntl(
		<AddSiteModal onClose={ () => {
			console.log( "clicked on Cancel" );
		} } onLink={ () => {
			console.log( "clicked on Link" );
		} } isOpen={ true }
			onChange={ () => {} }
			errorFound={ false }
			query=""
		/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();

	// manually trigger the callback.
	tree.children[0].props.onRequestClose();

	// re-rendering
	tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test('the addSiteModal handling an onLink event', () => {
	const component = createComponentWithIntl(
		<AddSiteModal onClose={ () => {
			console.log( "clicked on Cancel" );
		} } onLink={ () => {
			console.log( "clicked on Link" );
		} } isOpen={ true }
			onChange={ () => {} }
			errorFound={ false }
			query=""
		/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();

	// manually trigger the callback.
	tree.children[0].children[0].children[3].children[1].props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
