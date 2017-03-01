import React from "react";
import styled from "styled-components";
import logo from "../img/My_Yoast_logo.svg";

export const Logo = styled.div`
    padding-top:'10px';
    background-image: url( ${logo});
    background-position: center;
    background-size: 70%;
    left:0px; top: 0xp;
    width: 100%;
    height: 20%;
    background-repeat: no-repeat;
`;

export default Logo;