import React from 'react';
import LandingPage from '../../src/components/LandingPage';
import constructionImage from "../../src/images/construction.svg";
import { createComponentWithIntl } from "../../utils";
import { FormattedMessage } from "react-intl";


test('the landing page component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<LandingPage url="http://yoast.com"
					 urlText="yoast.com"
					 imageSource={ constructionImage }
					 paragraphs={ [ <FormattedMessage id="landing-page.test" defaultMessage="I am a landing page" /> ] }
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
