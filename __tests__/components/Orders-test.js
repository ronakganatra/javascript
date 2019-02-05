import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createComponentWithIntl } from "../../utils";
import Orders from "../../src/components/Orders";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore( [] );

jest.mock( "../../src/functions/api", () => {
	return {
		getInvoiceUrl: () => { return "http://somelink" },
	};
} );

test( "The Orders component matches the snapshot", () => {
	let orders = [
		{
			id: "1",
			date: "05/20/2012",
			invoiceNumber: "MOOIE 123 TEST",
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
			totalAmount: 10010,
			currency: "EUR",
			status: "completed",
		},
	];

	let storeState = {
		entities: {
			orders: {
				byId: {
					"1": orders[ 0 ],
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


	const component = createComponentWithIntl(
		<Provider store={ mockStore( storeState ) }>
			<MemoryRouter>
				<Orders
					orders={ orders }
					getInvoiceURI={ () => { return "http://invoice-url" } }
				/>
			</MemoryRouter>
		</Provider>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
