import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render () {
    return (<i className="fa fa-paw fa-5x" aria-hidden="true"></i>);
  }
}

ReactDOM.render(<App/>, document.getElementById('site-icon'));
