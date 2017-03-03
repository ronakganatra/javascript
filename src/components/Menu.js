import React from "react";
import './Menu.css';
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { ReactRouter, Link } from 'react-router';




export const MainMenu = React.createClass({
    render: function() {

        return (
            <div className="menu">
                    <nav>
                        <div>
                            <div><Link to="/" activeClassName="active">Home</Link></div>
                            <div><Link to="/subscriptions" activeClassName="active">Subscriptions</Link></div>
                            <div className="menuItem"><Link to="/courses" activeClassName="active">Courses</Link></div>
                            <div className="menuItem"><Link to="/sites" activeClassName="active">Sites</Link></div>

                            <div className="menuItem"><Link to="/account" activeClassName="active">Account</Link></div>
                        </div>
                    </nav>
            </div>
        )
    }
})


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
//
// export const items = [
//     {item:'Subscriptions'},
//     {item:'Sites'}
// ];
//
// export const Menu = ({items}) => (
//     <div id="menu">
//         {items.map(page => (
//             <div className="item" key={page.item}><Link to="{page.item}">Link {page.item}</Link></div>
//         ))}
//     </div>
// );




export const MenuNav = styled.nav`
    display: block;
`;

// export const MenuItem = styled.div`
//     background-color: ${colors.$palette_pink_dark};
//     box-sizing: border-box;
//     padding-left: 10px;
//     margin-top: 5px;
//     margin-bottom: 5px;
//     width: ${props=>props.width};
//     height: 40px;
//     line-height: 40px;
//     color: ${colors.$color_grey};
// `;

export const MenuItemSelected = styled.div`
    background-color: ${colors.$color_background_light};
    height: 20px;
    padding-left: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    width: ${props=>props.width};
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    box-shadow: inset 1px 1px 1px 1px darkgrey;
    color: ${colors.$palette_pink_dark};
`;
