import React from 'react';
import { mapStateToProps, mapDispatchToProps, mergeProps } from '../../src/containers/SitesPage'
import { linkSitePopupClose, linkSitePopupOpen, linkSite, linkSiteRequest } from "../../src/actions/sites";
import SitesPageContainer from '../../src/containers/SitesPage';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';



test('the mapStateToProps function', () => {
	let state = {
		entities: {
			sites: {
				byId: { "497490e6-eb8d-4627-be9b-bfd33fc217f1": {
					"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					"url": "http://yoast.com",
					"creationDate": "2017-03-21T08:54:09.415Z",
					"userId": 1
				} },
				allIds: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
			},
		},
		ui: {
			sites: {
				addSitePopupOpen: false,
					linkingSite: false,
					linkingSiteUrl: "http://yoast.com",
					linkSiteFailed: false,
					linkSiteError: "",
			},
		},
	};
	let expected = {
		sites: [ { "id": "497490e6-eb8d-4627-be9b-bfd33fc217f1", "siteName": "http://yoast.com" } ],
		popupOpen: false,
		errorFound: false,
		errorMessage: "",
		linkingSiteUrl: "http://yoast.com",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

} );

test('the mapDispatchToProps function to call linkSitePopupOpen action with onClick', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );

	props.onClick();

	expect( dispatch ).toHaveBeenCalledWith( linkSitePopupOpen() );
} );

test('the mapDispatchToProps function to call linkSitePopupOpen action with addSite', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );

	props.addSite();

	expect( dispatch ).toHaveBeenCalledWith( linkSitePopupOpen() );
} );

test('the mapDispatchToProps function to call linkSitePopupClose action with onClose', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );

	props.onClose();

	expect( dispatch ).toHaveBeenCalledWith( linkSitePopupClose() );
} );

test('the mapDispatchToProps function to call linkSiteRequest action with onChange', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );
	let url = "http://yoast.com";

	props.onChange( url );

	expect( dispatch ).toHaveBeenCalledWith( linkSiteRequest( url ) );
} );
