import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { Link } from 'react-router-dom';

const items = [
    {item:'Subscriptions'},
    {item:'Sites'},
    {item:'Courses'},
    {item:'Account'}
];

const rando = btoa(Math.random());


const Menu = styled.div`
    width: 300px;
    height: 40px;
    lineHeight: 40px;
    paddingLeft: 10px;  
    textDecoration:none;
    color: white;

`;

const MenuItem = styled.div`
    padding-left: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    color: grey; 
`;

const StyledLink = styled(Link)`
    text-decoration: none; 
    color: white;
    &:visited: red;
    &.active {
    text-decoration: underline red;
    }
    ;
`;

export const MainMenu = () => {
    return (
        <Menu>
            <nav><MenuItem>{items.map((page) => {
                return <div><StyledLink to={page.item} activeClassName="active">{page.item}</StyledLink></div>}
            )}
            </MenuItem>
            </nav>
        </Menu>
    )
};


//
// export const MainMenu = () => {
//     return (
//         <div id="menu">
//             {items.map((page) => {
//                 return <div className="menuItem"><Link to={page.item}>{page.item}</Link></div>}
//             )}
//         </div>
//     )
// };

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
