import React from 'react';
import { createComponentWithIntl } from "../../utils";

import SubscriptionDetails from '../../src/components/SubscriptionDetails';

test('the subscription detail component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SubscriptionDetails startDate={ new Date( "June 1, 2017" ) } nextBilling={ new Date( "June 1, 2018" ) }
							 invoices={ [ { invoiceId: 1, invoiceDate: new Date( "July 21, 2016" ),
								 invoiceCurrency: "$", invoiceAmount: 100 }, { invoiceId: 2,
								 invoiceDate: new Date( "July 22, 2016" ),
								 invoiceCurrency: "$", invoiceAmount: 20000 } ] }
							 current={ 6 } max={ 10 } onAddSite={ ()=>{} } onShop={ () => {} } onCancel={ ()=>{} }
							 onInvoiceDownload={ () => {} } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
