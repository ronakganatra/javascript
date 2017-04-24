import React from 'react';
import SitePage from '../../src/components/SitePage';
import { createComponentWithIntl } from "../../utils";
import SeoIcon from "../../src/icons/Yoast/Yoast_SEO_Icon_Small.svg";
import LocalIcon from "../../src/icons/Yoast/Local_SEO_Icon_Small.svg";
import { MemoryRouter } from "react-router-dom";

test('the site page component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
		<SitePage
				site={ {
					id: "abcd",
					url: "yoast.com",
					creationDate: "2017-04-11T00:00:00.000Z",
					userId: 2,
					header: "http://placehold.it/1480x380",
				} }
				header="http://placehold.it/1480x380"
				subscriptions={ [
					  {
						  id: "bla",
						  productId: "Yoast SEO",
						  startDate: "2017-04-11T00:00:00.000Z",
						  endDate: "2017-04-11T00:00:00.000Z",
						  reoccurring: true,
						  subscriberId: 2,
						  productSlots: {
							  amountAvailable: 10,
							  amountUsed: 5,
							  addMoreSlots: "Add more slots",
						  },
						  productLogo: SeoIcon,
					  },
					  {
						  id: "bla2",
						  productId: "Local SEO",
						  startDate: "2017-04-11T00:00:00.000Z",
						  endDate: "2017-04-11T00:00:00.000Z",
						  reoccurring: true,
						  subscriberId: 2,
						  productSlots: {
							  amountAvailable: 10,
							  amountUsed: 7,
							  addMoreSlots: "Add more slots",
						  },
						  productLogo: LocalIcon,
					  },
				] }
				onAddMoreSlotsClick={ () => {} }
				onMoreInfoClick={ () => {} }
				onSettingsClick={ () => {} }
				onToggleSubscription={ () => {} } />
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
