import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { Link, NavLink } from 'react-router-dom';
import './Menu.css';

const items = [
    {item:'/subscriptions', title:'Subscriptions'},
    {item:'/sites', title:'Sites'},
    {item:'/courses', title:'Courses'},
    {item:'/account', title:'Account'}
];

const Menu = styled.div`
    width: 300px;
`;

const MenuItem = styled.a`
    display: block;
    width: 270px;
    height: 100px;
    padding-left: 30px;
    font-family: 'open sans 300';
    font-size: 22px;
    color: #ccc;
    text-decoration: none;
    a, a:visited {color:red; text-decoration: none;};

`;

export const MainMenu = () => {
    return (
        <Menu>
            <nav>
                {items.map((page) => {
                return <NavLink activeClassName="menuItemActive" to={page.item}><MenuItem>{page.title}</MenuItem></NavLink>}
            )}
            </nav>
        </Menu>
    )
};

export const Home = React.createClass({
    render: function() {
        return (<h1>Welcome to the Home Page</h1>);
    }
});

export const Subscriptions = React.createClass({
    render: function() {
        return (<h1>Your subscriptions</h1>);
    }
});

export const Sites = React.createClass({
    render: function() {
        return (<h1>Your sites</h1>);
    }
});

export const Courses = React.createClass({
    render: function() {
        return (<h1>Your courses</h1>);
    }
});
export const Account = React.createClass({
    render: function() {
        return (<h1>Your account details</h1>);
    }
});
