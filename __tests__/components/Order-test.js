import React from "react";
import { createComponentWithIntl } from "../../utils";
import { MemoryRouter } from "react-router-dom";
import Order from "../../src/components/Order";

let baseOrder = {
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
	status: "completed",
};

test( "A standard order", () => {
	let order = baseOrder;

	const component = createComponentWithIntl(
		<MemoryRouter>
			<Order
				id="a"
				invoiceLink="http://somelink"
				{ ...order }
			/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "An Order with a disabled invoice button", () => {
	let order = Object.assign( {}, baseOrder, { status: "pending" } );

	const component = createComponentWithIntl(
		<MemoryRouter>
			<Order
				id="a"
				invoiceLink="http://somelink"
				{ ...order }
			/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
