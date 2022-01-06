import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import {
  ButtonGroup,
  Container
} from 'react-bootstrap'

import { routes } from './routes';

function App() {

  return (
    <div className="App">

      <Router>
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

        <Routes>
          {
            routes.map((route, i) => (
              <Route key={i} {...route} />
            ))
          }
        </Routes>
      </Router>
    </div>
  )
}

export default App
