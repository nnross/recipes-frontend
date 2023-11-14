import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import React from 'react';
import Home from './pages/home';
import Search from './pages/search';
import Recipe from './pages/recipe';
import Today from './pages/today';
import Personal from './pages/personal';
import Settings from './pages/settings';
import Layout from './components/Layout';

/**
  Basic structure of the application with routes.
  */
const App = () => (
  <Router>
    <Routes>
      <Route element={(
        <Layout />
      )}
      >
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/recipe/:recipeId" element={<Recipe />} />
        <Route exact path="/today" element={<Today />} />
        <Route exact path="/personal" element={<Personal />} />
        <Route exact path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

export default App;
