import React from 'react';
import { createComponentWithIntl } from "../../utils";
import { MemoryRouter } from "react-router-dom";
import Order from '../../src/components/Order';

test('The Order component matches the snapshot', () => {

	let order =
		{
			productId: "2",
			date: "17-01-2012",
			orderNumber: "MOOIE 456 TEST",
			items: "TEST ITEM",
			total: "Ycentjes",
			status: "Failed",
		};

	const component = createComponentWithIntl(
		<MemoryRouter>
			<Order id="a"
				   order={ order }
				   onClickInvoice={ ()=>{} }
			/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
