import NoResults from "../../src/components/NoResults";
import image from "../../src/images/noSites.svg";
import { createComponentWithIntl } from "../../utils";
import { FormattedMessage } from "react-intl";
import React from "react";


let paragraphs = [ <FormattedMessage id="downloads-page.no-downloads.welcome" defaultMessage="Welcome to the downloads page" />,
	<FormattedMessage id="downloads-page.no-downloads.explanation" defaultMessage="It looks like you haven’t bought any products with downloadable files yet." />,
	<FormattedMessage id="downloads-page.no-downloads.press-button" defaultMessage="Press the button below to visit yoast.com and look at our products."/> ];

test('the NoResults component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<NoResults paragraphs={ paragraphs } onClick={ () => {} } imageSource={ image } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
