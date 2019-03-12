import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createComponentWithIntl } from "../../utils";
import { MemoryRouter } from "react-router-dom";
import Order from "../../src/components/Order";

const mockStore = configureStore( [] );

let baseOrder = {
	id: "1",
	date: "01/01/2012",
	invoiceNumber: "MOOIE 456 TEST",
	items: [
		{
			id: "line-item-id1",
			productName: "Name of the product",
			quantity: 1,
		},
		{
			id: "line-item-id2",
			productName: "Another product",
			quantity: 2,
		},
	],
	totalAmount: 10000,
	currency: "USD",
	status: "completed",
};

let storeState = {
	entities: {
		orders: {
			byId: {
				"1": baseOrder,
			},
			allIds: [ "1" ],
		},
		refunds: {
			byId: {},
			allIds: [],
		}
	},
	ui: {
		invoiceModal: {
			invoicesModalIsOpen: false,
			invoicesModalOrderId: "",
			error: null,
		},
	},
};

test( "A standard order", () => {
	const component = createComponentWithIntl(
		<Provider store={ mockStore( storeState ) }>
			<MemoryRouter>
				<Order
					id="a"
					invoiceLink="http://somelink"
					{ ...baseOrder }
				/>
			</MemoryRouter>
		</Provider>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "An Order with a disabled invoice button", () => {
	let order = Object.assign( {}, baseOrder, { status: "pending" } );

	const component = createComponentWithIntl(
		<Provider store={ mockStore( storeState ) }>
			<MemoryRouter>
				<Order
					id="a"
					invoiceLink="http://somelink"
					{ ...order }
				/>
			</MemoryRouter>
		</Provider>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
