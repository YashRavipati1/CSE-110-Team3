import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;
`


export type NavButtonProps = {
    text: string;
    route: string;
}

export const NavButton = (props: NavButtonProps) => {
    return (
        <Button to={props.route}>
            {props.text + "\t +"}
        </Button>
    )
}
