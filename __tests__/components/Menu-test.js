import React from 'react';
import renderer from 'react-test-renderer';

import { MainMenu, Subscriptions, Courses, Account, Sites } from '../../src/components/Menu';

test('the menu matches the snapshot', () => {
    const component = renderer.create(
        <MainMenu/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

//
// test('the button with button type given matches the snapshot', () => {
//     const component = renderer.create(
//         <Button type="button">ButtonValue</Button>
//     );
//
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });
//
// test('the button handling an onclick event', () => {
//     const component = renderer.create(
//         <Button onClick={ () => {
//             return 'clicked';
//         } }>ButtonValue</Button>
//     );
//
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//
//     // manually trigger the callback
//     tree.props.onClick();
//
//     // re-rendering
//     tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });
