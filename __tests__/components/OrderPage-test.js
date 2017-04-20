import React from 'react';
import { createComponentWithIntl } from "../../utils";
import OrderPage from '../../src/components/OrderPage';
import { MemoryRouter } from "react-router-dom";

test('The Orders component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<OrderPage
				orders= { [
					{
						productId: "1",
						date: "17-01-2010",
						orderNumber: "MOOIE 123 TEST",
						items: "TEST ITEM",
						total: "$centjes",
						status: "Failed",
					}, {
						productId: "2",
						date: "17-01-2012",
						orderNumber: "MOOIE 456 TEST",
						items: "TEST ITEM",
						total: "Ycentjes",
						status: "Failed",
					}, {
						productId: "3",
						date: "17-01-2017",
						orderNumber: "MOOIE 789 TEST",
						items: "TEST ITEM",
						total: "€centjes",
						status: "Failed",
					} ] }
				onClickInvoice={ () => {} }
				searchProps = { {
					id: "orderSearchBar",
					description: "I am an order search bar",
					descriptionId: "I am an order search bar id",
					onChange: () => {
					},
				} }
			/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
