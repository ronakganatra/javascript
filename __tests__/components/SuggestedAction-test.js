import SuggestedAction from "../../src/components/SuggestedAction";
import { GoToButtonLink, AddSiteIconButton } from "../../src/components/Button";
import image from "../../src/images/noSites.svg";
import { createComponentWithIntl } from "../../utils";
import { FormattedMessage } from "react-intl";
import React from "react";
import { MemoryRouter } from "react-router-dom";

let paragraphs = [ <FormattedMessage id="downloads-page.no-downloads.welcome" defaultMessage="Welcome to the downloads overview." />,
	<FormattedMessage id="downloads-page.no-downloads.explanation" defaultMessage="It looks like you haven’t bought any products with downloadable files yet." />,
	<FormattedMessage id="downloads-page.no-downloads.press-button" defaultMessage="Press the button below to visit yoast.com and look at our products."/> ];

test( 'the SuggestedAction component matches the snapshot in the case of no sites' , () => {
	const component = createComponentWithIntl(
		<SuggestedAction paragraphs={ paragraphs } imageSource={ image }>
			<AddSiteIconButton onClick={ () => {} } />
		</SuggestedAction>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test( 'the SuggestedAction component matches the snapshot in the case of no subscriptions' , () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<SuggestedAction paragraphs={ paragraphs } url="" imageSource={ image }>
				<GoToButtonLink />
			</SuggestedAction>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test( 'the SuggestedAction component matches the snapshot in the case of no orders' , () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<SuggestedAction paragraphs={ paragraphs } url="" imageSource={ image }>
				<GoToButtonLink />
			</SuggestedAction>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
