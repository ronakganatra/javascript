import React from "react";
import { createComponentWithIntl } from "../../utils";
import { MemoryRouter } from "react-router-dom";
import Order from "../../src/components/Order";

test( "The Order component matches the snapshot", () => {
	let order =
		{
			date: new Date( "01/01/2012" ),
			orderNumber: "MOOIE 456 TEST",
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
			total: 10000,
			currency: "USD",
			status: "Failed",
		};

	const component = createComponentWithIntl(
		<MemoryRouter>
			<Order
				id="a"
				onClickInvoice={ () => {} }
				{ ...order }
			/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
