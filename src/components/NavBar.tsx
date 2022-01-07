import {
    NavLink,
} from "react-router-dom";

import {
  ButtonGroup,
  Container
} from 'react-bootstrap'

function NavBar() {
    return (
        <Container className="mt-5">
            <ButtonGroup>
                <NavLink
                    style={({ isActive }) => (isActive ? {
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
                        )}
                    to="/popup-setting">
                    Popup setting
                </NavLink>

                <NavLink
                    style={({ isActive }) => (isActive ? {
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
                        )}
                    to="/todo-list">
                    Todo list
                </NavLink>
                
            </ButtonGroup>
        </Container>
    )
}

export default NavBar;
