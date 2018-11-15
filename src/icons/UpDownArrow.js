import { SVGIcon } from "../components/SVGIcon";
import React from "react";

export const upArrow = <SVGIcon><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></SVGIcon>;
export const downArrow = <SVGIcon><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" /></SVGIcon>;

export default function UpDownArrow( props )  {
	return props.isOpen ? upArrow : downArrow;
}
