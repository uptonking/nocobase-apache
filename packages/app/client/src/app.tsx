import React from 'react';
import ReactDOM from 'react-dom';
import RootComp from './pages/index';

const App = () => {
  return (
    // <Router>
    <RootComp />
    // </Router>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
