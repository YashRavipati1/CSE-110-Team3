import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled(Link)`
    appearance: none;
    background-color: #2ea44f;
    border: 1px solid rgba(27, 31, 35, .15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    font-size: 16px; /* Increased font size */
    font-weight: 600;
    line-height: 24px; /* Adjusted line height */
    padding: 8px 20px; /* Increased padding */
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
`


export type NavButtonProps = {
    text: string;
    route: string;
}

export const NavButton = (props: NavButtonProps) => {
    return (
        <Button to={props.route}>
            {props.text}
        </Button>
    )
}
