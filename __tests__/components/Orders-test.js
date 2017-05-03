import React from "react";
import { createComponentWithIntl } from "../../utils";
import Orders from "../../src/components/Orders";
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
				},
				{
					id: "line-item-id2",
					productName: "Another product",
				},
			],
			total: 10010,
			currency: "EUR",
			status: "completed",
		},
	];


	const component = createComponentWithIntl(
		<MemoryRouter>
			<Orders
				orders={ orders }
			    getInvoiceURI={ () => { return "http://invoice-url" } }
			/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
