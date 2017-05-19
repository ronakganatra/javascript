import React from "react";
import { createComponentWithIntl } from "../../utils";
import OrderPage from "../../src/components/OrderPage";
import { MemoryRouter } from "react-router-dom";

jest.mock( "../../src/functions/api", () => {
	return {
		getInvoiceUrl: () => { return "http://somelink" },
	};
} );

test( "The Orders component matches the snapshot", () => {
	let orders = [
		{
			id: "1",
			date: new Date( "05/20/2012" ),
			orderNumber: "MOOIE 123 TEST",
			items: [
				{
					id: "line-item-id1",
					productName: "Name of the product",
					productAmount: 1,
				},
				{
					id: "line-item-id2",
					productName: "Another product",
					productAmount: 2,
				},
			],
			total: 10010,
			currency: "EUR",
			status: "completed",
		},
	];

	const component = createComponentWithIntl(
		<MemoryRouter>
			<OrderPage orders={ orders } onSearchChange={ () => {} } />
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
