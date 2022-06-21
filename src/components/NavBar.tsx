import {
    NavLink,
} from "react-router-dom";

import {
  ButtonGroup,
  Container
} from 'react-bootstrap';

import { navbar } from '@/configuration/navbar';

export default function NavBar() {

    const checkStyle = ({ isActive } : any) => (isActive ? 
        {
            display: 'block',
            color:  '#ffffff',
            backgroundColor: '#007bff',
            padding: '10px',
            borderRadius: '5px',
        } : {
            display: 'block',
            color:  '#007bff',
            borderColor: '#007bff',
            padding: '10px',
            borderRadius: '5px',
        }
    )

    return (
        <Container className="mt-5">
            <ButtonGroup>
                {
                    navbar.map((item, index) => (
                        <NavLink
                            key={index}
                            style={checkStyle}
                            to={item.path}>
                            {item.title}
                        </NavLink>
                    ))
                }
            </ButtonGroup>
        </Container>
    )
}
