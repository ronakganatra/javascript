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
			<SubscriptionDetails startDate={ new Date( "June 1, 2017" ) } nextBilling={ new Date( "June 1, 2018" ) }
								 invoices={ [ { invoiceId: 1, invoiceDate: new Date( "July 21, 2016" ),
									 invoiceCurrency: "USD", invoiceAmount: 100 }, { invoiceId: 2,
									 invoiceDate: new Date( "July 22, 2016" ),
									 invoiceCurrency: "USD", invoiceAmount: 20000 } ] }
								 current={ 6 } max={ 10 } onAddSite={ ()=>{} } onShop={ "" } onCancel={ ()=>{} }
								 onInvoiceDownload={ () => {} } />
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
