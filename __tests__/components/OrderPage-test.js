import React from "react";
import { createComponentWithIntl } from "../../utils";
import OrderPage from "../../src/components/OrderPage";
import { MemoryRouter } from "react-router-dom";

test( "The Orders component matches the snapshot", () => {
	let orders = [
		{
			productId: "1",
			date: new Date( "05/20/2012" ),
			orderNumber: "MOOIE 123 TEST",
			items: "TEST ITEM",
			total: 10010,
			currency: "EUR",
			status: "Failed",
		},
	];

	let onClickInvoice = () => {
		console.log( "Invoice clicked" );
	};

	let searchProps = {
		id: "orderSearchBar",
		description: "I am an order search bar",
		descriptionId: "I am an order search bar id",
		onChange: () => {},
	};

	const component = createComponentWithIntl(
		<MemoryRouter>
			<OrderPage orders={ orders } onClickInvoice={ onClickInvoice } searchProps={ searchProps } />
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
