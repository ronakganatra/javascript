import React from 'react';
import { createComponentWithIntl } from "../../utils";

import Sites from '../../src/components/Sites';

test('the sites component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Sites onClick={ ( sitesId ) => {
			return sitesId;
		} } sites={[
			{ id: "7e54b616-59a7-4389-af3e-c2e0c093b955",
				siteName: "www.yoast.com",
				activeSubscriptions: [ "woo", "video" ],
				siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
			},
			{ id: "7e54b616-59a7-4389-af3e-c2e0c093b954",
				siteName: "www.google.com",
				activeSubscriptions: [ "woo", "video", "local" ],
				siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
			},
			{ id: "7e54b616-59a7-4389-af3e-c2e0c093b956",
				siteName: "www.facebook.com",
				activeSubscriptions: [ "woo", "video", "news" ],
				siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
			},
		] } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
