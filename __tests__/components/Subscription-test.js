import React from 'react';
import { createComponentWithIntl } from "../../utils";
import { MemoryRouter } from "react-router-dom";
import Subscription from '../../src/components/Subscription';

test( 'The Subscription component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<Subscription id="a"
			              name="SEO Premium for WordPress"
			              iconSource="https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png"
			              used={ 14 } limit={ 20 }
			              status={ "active" }
			              isGrouped={ false }
			              hasNextPayment={ true }
			              hasSites={ true }
			              nextPayment={ new Date( "April 4, 2017" ) }
			              endDate={ new Date() }
			              billingAmount={ 12512 }
			              billingCurrency="USD"
			              onManage={ () => {
				              console.log( "clicked on manage button" );
			              } }
			/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );


test( 'The Subscription component matches the snapshot for a grouped product without sites', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<Subscription id="a"
			              name="All courses"
			              iconSource="https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png"
			              used={ 14 }
			              limit={ 20 }
			              status={ "active" }
			              isGrouped={ true }
			              hasNextPayment={ true }
			              hasSites={ false }
			              nextPayment={ new Date( "April 4, 2017" ) }
			              endDate={ new Date() }
			              billingAmount={ 12512 }
			              billingCurrency="USD"
			              onManage={ () => {
				              console.log( "clicked on manage button" );
			              } }
			/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
