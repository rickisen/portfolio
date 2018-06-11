import React from 'react';
import { Route, Link } from 'react-router-dom';

import Home from '../home';
import About from '../about';
import style from './style.css';
import AnimatedBackground from './AnimatedBackground';

const App = () => (
  <div style={{ position: 'relative' }}>
    <AnimatedBackground />
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
    </nav>
    <main className="main">
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
);

export default App;
