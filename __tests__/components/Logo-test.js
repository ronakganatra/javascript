import React from 'react';
import renderer from 'react-test-renderer';
import { Logo } from '../../src/components/Logo';
import { MemoryRouter } from "react-router";

test('the logo matches the snapshot', () => {
    const component = renderer.create(
        <MemoryRouter>
            <Logo size="300px" alt="My logo alt" context="header"/>
        </MemoryRouter>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});