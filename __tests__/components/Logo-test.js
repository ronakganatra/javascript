import React from 'react';
import renderer from 'react-test-renderer';
import { Logo } from '../../src/components/Logo';

test('the logo matches the snapshot', () => {
    const component = renderer.create(
        <Logo size="300px" alt="My logo alt" />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});