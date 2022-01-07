import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

import { routes } from './routes';

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

function AppRouter() {
  return useRoutes(routes);
}

export default App
