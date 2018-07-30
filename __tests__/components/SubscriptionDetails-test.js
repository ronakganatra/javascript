import React from 'react';
import { createComponentWithIntl } from "../../utils";
import { MemoryRouter } from "react-router-dom";
import SubscriptionDetails from '../../src/components/SubscriptionDetails';

jest.mock( "../../src/functions/api", () => {
	return {
		getInvoiceUrl: () => { return "http://somelink" },
	};
} );

test('the subscription detail component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<SubscriptionDetails
				startDate={ new Date( "June 1, 2017" ) }
				hasNextBilling={ true }
				hasEndDate={ false }
				endDate={ new Date() }
				nextBilling={ new Date( "June 1, 2018" ) }
				onCancelClick={ () => {} }
				canCancel={ true }
				orders={ [
					{
						id: "1",
						date: new Date( "July 21, 2016" ),
						currency: "USD",
						total: 100
					},
					{
						id: "2",
						date: new Date( "July 22, 2016" ),
						currency: "USD",
						total: 20000
					}
				] }
				current={ 6 }
				max={ 10 }
			/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

});

test('the subscription detail component has no next billing', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<SubscriptionDetails
				startDate={ new Date( "June 1, 2017" ) }
				hasNextBilling={ false }
				nextBilling={ new Date() }
				hasEndDate={ false }
				endDate={ new Date() }
				onCancelClick={ () => {} }
				canCancel={ false }
				orders={ [
					{
						id: "1",
						date: new Date( "July 21, 2016" ),
						currency: "USD",
						total: 100
					},
					{
						id: "2",
						date: new Date( "July 22, 2016" ),
						currency: "USD",
						total: 20000
					}
				] }
				current={ 6 }
				max={ 10 }
			/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
