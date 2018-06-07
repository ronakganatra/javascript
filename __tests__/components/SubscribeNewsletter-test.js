import React from 'react';
import { createComponentWithIntl } from "../../utils";
import SubscribeNewsletter from '../../src/components/account/profile/SubscribeNewsletter';

test('The Subscribe Newsletter component (when subscribed) matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SubscribeNewsletter
			onSubscribe={ () => null }
			onUnsubscribe={ () => null }
			subscribed={ "subscribed" }
			loading={ false }
			error={ null }
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('The Subscribe Newsletter component (when unsubscribed) matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SubscribeNewsletter
			onSubscribe={ () => null }
			onUnsubscribe={ () => null }
			subscribed={ "unsubscribed" }
			loading={ false }
			error={ null }
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('The Subscribe Newsletter component (when pending) matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SubscribeNewsletter
			onSubscribe={ () => null }
			onUnsubscribe={ () => null }
			subscribed={ "pending" }
			loading={ false }
			error={ null }
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('The Subscribe Newsletter component (when unknown) matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SubscribeNewsletter
			onSubscribe={ () => null }
			onUnsubscribe={ () => null }
			subscribed={ "unknown" }
			loading={ false }
			error={ null }
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('The Subscribe Newsletter component shows an error when there is one defined.', () => {
	const component = createComponentWithIntl(
		<SubscribeNewsletter
			onSubscribe={ () => null }
			onUnsubscribe={ () => null }
			subscribed={ "unsubscribed" }
			loading={ false }
			error={ "An error occurred" }
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('The Subscribe Newsletter component subscribes the customer when he/she clicks on the button and is unsubscribed.', () => {

	const mockupFunction = jest.fn();

	const component = createComponentWithIntl(
		<SubscribeNewsletter
			onSubscribe={ mockupFunction }
			onUnsubscribe={ () => null }
			subscribed={ "unsubscribed" }
			loading={ false }
			error={ null }
		/>
	);

	let tree = component.toJSON();

	// call onClick function on the component.
	const onClick = tree.children[2].props.onClick;
	onClick();

	expect(mockupFunction).toHaveBeenCalled();
});

test('The Subscribe Newsletter component unsubscribes the customer when he/she clicks on the button and is subscribed.', () => {

	const mockupFunction = jest.fn();

	const component = createComponentWithIntl(
		<SubscribeNewsletter
			onSubscribe={ () => null }
			onUnsubscribe={ mockupFunction }
			subscribed={ "subscribed" }
			loading={ false }
			error={ null }
		/>
	);

	let tree = component.toJSON();

	// call onClick function on the component.
	const onClick = tree.children[2].props.onClick;
	onClick();

	expect(mockupFunction).toHaveBeenCalled();
});

test('The Subscribe Newsletter component button does nothing when the component is loading.', () => {

	const mockupFunction = jest.fn();

	const component = createComponentWithIntl(
		<SubscribeNewsletter
			onSubscribe={ mockupFunction }
			onUnsubscribe={ mockupFunction }
			subscribed={ "subscribed" }
			loading={ true }
			error={ null }
		/>
	);

	let tree = component.toJSON();

	console.error( tree );

	// call onClick function on the component.
	const onClick = tree.children[2].props.onClick;
	onClick();

	expect(mockupFunction).not.toHaveBeenCalled();
});
