import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
  return <h1>Hello, React!</h1>;
}

if (document.getElementById('example')) {
  ReactDOM.render(<Example />, document.getElementById('example'));
}
