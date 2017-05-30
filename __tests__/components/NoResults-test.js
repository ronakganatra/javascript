import NoResults from "../../src/components/NoResults";
import image from "../../src/images/noSites.svg";
import { createComponentWithIntl } from "../../utils";
import { FormattedMessage } from "react-intl";
import React from "react";


let paragraphs = [ <FormattedMessage id="downloads-page.no-downloads.welcome" defaultMessage="Welcome to the downloads page" />,
	<FormattedMessage id="downloads-page.no-downloads.explanation" defaultMessage="It looks like you haven’t bought any products with downloadable files yet." />,
	<FormattedMessage id="downloads-page.no-downloads.press-button" defaultMessage="Press the button below to visit yoast.com and look at our products."/> ];

test( 'the NoResults component matches the snapshot in the case of no sites' , () => {
	const component = createComponentWithIntl(
		<NoResults paragraphs={ paragraphs } onClick={ () => {} } imageSource={ image } pageContext="noSites" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test( 'the NoResults component matches the snapshot in the case of no subscriptions' , () => {
	const component = createComponentWithIntl(
		<NoResults paragraphs={ paragraphs } onClick={ () => {} } imageSource={ image } pageContext="noSubscriptions" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test( 'the NoResults component matches the snapshot in the case of no orders' , () => {
	const component = createComponentWithIntl(
		<NoResults paragraphs={ paragraphs } onClick={ () => {} } imageSource={ image } pageContext="noOrders" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

