import React from "react";
import { createComponentWithIntl } from "../../utils";
import Orders from "../../src/components/Orders";
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

	let searchProps = {
		id: "orderSearchBar",
		description: "I am an order search bar",
		descriptionId: "I am an order search bar id",
		onChange: () => {},
	};

	const component = createComponentWithIntl(
		<MemoryRouter>
			<Orders
				orders={ orders }
				onClickInvoice={ () => {} }
				searchProps={ searchProps }
			/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
