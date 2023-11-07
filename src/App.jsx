import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/home'
import Search from './pages/search'
import Recipe from './pages/recipe'
import Today from './pages/today'
import Personal from './pages/personal'
import Settings from './pages/settings'


/**
  Basic structure of the application with routes.
  */
const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home /> }/>
      <Route exact path="/search" element={<Search />} />
      <Route exact path="/recipe/:recipeId" element={<Recipe />} />
      <Route exact path="/today" element={<Today />} />
      <Route exact path="/personal" element={<Personal />} />
      <Route exact path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

export default App;
